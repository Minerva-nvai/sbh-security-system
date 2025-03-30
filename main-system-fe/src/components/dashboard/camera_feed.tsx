import data from "@/_config/feed.json";

const CameraFeed = () => {
  return (
    <aside className="flex flex-col flex-3/4 justify-start items-start bg-accent px-1 w-full min-h-screen overflow-y-auto camera_feed">
      <div className="place-items-center gap-4 grid grid-cols-2 px-3 py-4 w-full camera_feed__content">
        {data.zones[0].feeds.map((f) => {
          return (
            <video
              id={`feed-${f.name}`}
              className="video-js"
              autoPlay
              controls
              preload="auto"
              width="640"
              height="360"
              data-setup="{}"
            >
              <source src={f.url} type="application/x-mpegURL" />
              Your browser does not support the video tag.
            </video>
          );
        })}
      </div>
    </aside>
  );
};

export default CameraFeed;
