#!/bin/bash
ffmpeg -f video4linux2 -input_format mjpeg -video_size 1280x720 -framerate 30 -i /dev/video0 -c:v libx264 -preset ultrafast -an -f rtsp rtsp://localhost:8554/stream
