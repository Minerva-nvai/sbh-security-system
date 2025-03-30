
import asyncio
import websockets
import json
import cv2
import numpy as np
import tensorflow as tf
import time
import threading
import logging
from queue import Queue
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger("FireDetectionServer")
connected_clients = set()
frame_queue = Queue(maxsize=10)  
detection_results = Queue(maxsize=10)  
process_every_n_frames = 30 
confidence_threshold = 0.7

def load_model(model_path):
    try:
        logger.info(f"Loading model from {model_path}")
        model = tf.keras.models.load_model(model_path)
        logger.info("Model loaded successfully")
        return model
    except Exception as e:
        logger.error(f"Error loading model: {e}")
        raise


def preprocess_frame(frame):
    resized = cv2.resize(frame, (224, 224)) 
    normalized = resized / 255.0
    preprocessed = np.expand_dims(normalized, axis=0)
    return preprocessed

def rtsp_frame_capture(rtsp_url):
    logger.info(f"Starting RTSP capture from {rtsp_url}")
    cap = cv2.VideoCapture(rtsp_url)
    
    if not cap.isOpened():
        logger.error(f"Failed to open RTSP stream: {rtsp_url}")
        return
    
    frame_count = 0
    
    while True:
        try:
            ret, frame = cap.read()
            
            if not ret:
                logger.warning("Failed to read frame, reconnecting...")
                cap.release()
                time.sleep(2)
                cap = cv2.VideoCapture(rtsp_url)
                continue
            
            frame_count += 1
            if frame_count % process_every_n_frames == 0:
                if not frame_queue.full():
                    frame_queue.put(frame)
                else:
                    logger.warning("Frame queue full, skipping frame")
            
        except Exception as e:
            logger.error(f"Error capturing frame: {e}")
            time.sleep(1)
    
    cap.release()

def prediction_worker(model):
    logger.info("Starting prediction worker")
    while True:
        try:
            if not frame_queue.empty():
                frame = frame_queue.get()
                preprocessed = preprocess_frame(frame)
                prediction = model.predict(preprocessed, verbose=0)
                fire_confidence = float(prediction[0][0])     
                logger.debug(f"Fire confidence: {fire_confidence}")
                if fire_confidence >= confidence_threshold:
                    logger.info(f"Fire detected with confidence: {fire_confidence}")
                    detection_results.put({
                        "event": "detected_fire",
                        "confidence": fire_confidence,
                        "timestamp": time.time()
                    })
            else:
                time.sleep(0.1)
                
        except Exception as e:
            logger.error(f"Error in prediction worker: {e}")
            time.sleep(1)

async def websocket_handler(websocket):
    logger.info(f"New client connected: {websocket.remote_address}")
    connected_clients.add(websocket)   
    try:
        async for message in websocket:
            pass
    except websockets.exceptions.ConnectionClosed:
        logger.info(f"Client disconnected: {websocket.remote_address}")
    finally:
        connected_clients.remove(websocket)

async def broadcast_detections():
    logger.info("Starting detection broadcast service")
    while True:
        try:
            if not detection_results.empty() and connected_clients:
                result = detection_results.get()
                message = json.dumps(result)
                tasks = []
                for client in connected_clients:
                    tasks.append(asyncio.create_task(client.send(message)))
                if tasks:
                    await asyncio.gather(*tasks, return_exceptions=True)
            await asyncio.sleep(0.1)
            
        except Exception as e:
            logger.error(f"Error broadcasting detection: {e}")
            await asyncio.sleep(1)


async def main(rtsp_url, model_path, websocket_host='0.0.0.0', websocket_port=8765):
    model = load_model(model_path)
    rtsp_thread = threading.Thread(target=rtsp_frame_capture, args=(rtsp_url,), daemon=True)
    rtsp_thread.start()
    prediction_thread = threading.Thread(target=prediction_worker, args=(model,), daemon=True)
    prediction_thread.start()
    logger.info(f"Starting WebSocket server on {websocket_host}:{websocket_port}")
    server = await websockets.serve(websocket_handler, websocket_host, websocket_port)
    broadcast_task = asyncio.create_task(broadcast_detections())
    await server.wait_closed()

if __name__ == "__main__":

    RTSP_URL = "rtsp://192.168.1.100:554/stream"  
    MODEL_PATH = 'fire_detection_mobilenet .h5' 
    WEBSOCKET_HOST = "0.0.0.0"
    WEBSOCKET_PORT = 8765
    try:
        asyncio.run(main(RTSP_URL, MODEL_PATH, WEBSOCKET_HOST, WEBSOCKET_PORT))
    except KeyboardInterrupt:
        logger.info("Server stopped by user")
    except Exception as e:
        logger.error(f"Server error: {e}")