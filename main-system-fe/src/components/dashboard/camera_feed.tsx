import { ZoneSelector } from "./zone_selector";

const CameraFeed = () => {
  return (
    <aside className="flex-2/3">
      <div className="zone_bar">
        <ZoneSelector />
      </div>
      <div>
        CameraFeed
        <video
          id="my-video"
          className="video-js"
          autoPlay
          controls
          preload="auto"
          width="640"
          height="360"
          data-setup="{}"
        >
          <source
            src="http://localhost:8080/hls/stream.m3u8"
            type="application/x-mpegURL"
          />
          Your browser does not support the video tag.
        </video>
      </div>
    </aside>
  );
};

export default CameraFeed;
