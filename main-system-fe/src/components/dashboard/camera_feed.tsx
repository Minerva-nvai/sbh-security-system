// import data from "@/_config/feed.json";

// const CameraFeed = () => {
//   return (
//     <aside className="flex flex-col flex-3/4 justify-center items-start bg-accent px-1 w-full h-screen overflow-y-auto camera_feed">
//       <div className="place-items-center gap-2 gap-x-2 grid grid-cols-2 px-3 py-4 w-full camera_feed__content">
//         {data.zones[0].feeds.map((f) => {
//           return (
//             <video
//               id={`feed-${f.name}`}
//               className="video-js"
//               autoPlay
//               controls
//               preload="auto"
//               width="640"
//               height="360"
//               data-setup="{}"
//             >
//               <source src={f.url} type="application/x-mpegURL" />
//               Your browser does not support the video tag.
//             </video>
//           );
//         })}
//       </div>
//     </aside>
//   );
// };

// export default CameraFeed;

// ---------------------------------------------------------------------------------------
"use client";

import { useRef } from "react";
import { Play, Maximize, AlertCircle } from "lucide-react";
import type { Feed } from "./_index";

interface CameraFeedsProps {
  feeds: Feed[];
}

export function CameraFeeds({ feeds }: CameraFeedsProps) {
  if (feeds.length === 0) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-4 text-gray-500" size={48} />
          <p className="text-gray-500">
            No camera feeds available for this zone
          </p>
        </div>
      </div>
    );
  }

  // Determine grid layout based on number of feeds
  let gridClass = "grid-cols-1";

  if (feeds.length === 2) {
    gridClass = "grid-cols-1 md:grid-cols-2";
  } else if (feeds.length === 3) {
    gridClass = "grid-cols-1 md:grid-cols-3";
  } else if (feeds.length === 4) {
    gridClass = "grid-cols-1 md:grid-cols-2";
  } else if (feeds.length <= 6) {
    gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  } else {
    gridClass = "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
  }

  return (
    <div className={`grid ${gridClass} gap-4`}>
      {feeds.map((feed) => (
        <CameraFeed key={feed.name} feed={feed} />
      ))}
    </div>
  );
}

interface CameraFeedProps {
  feed: Feed;
}

function CameraFeed({ feed }: CameraFeedProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  // In a real application, you would use a library like hls.js or video.js
  // to handle RTSP streams. For this demo, we'll just show a placeholder.

  return (
    <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=360&width=640"
          muted
        />

        <div className="absolute inset-0 flex flex-col">
          {/* Feed title */}
          <div className="bg-black bg-opacity-50 p-2">
            <p className="font-medium text-sm">{feed.description}</p>
          </div>

          <div className="flex flex-1 justify-center items-center">
            <button
              className="bg-black bg-opacity-50 hover:bg-opacity-70 p-3 rounded-full transition-all"
              aria-label="Play video"
            >
              <Play size={24} />
            </button>
          </div>

          {/* Controls */}
          <div className="flex justify-end bg-black bg-opacity-50 p-2">
            <button
              className="hover:bg-gray-700 p-1 rounded"
              aria-label="Fullscreen"
            >
              <Maximize size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
