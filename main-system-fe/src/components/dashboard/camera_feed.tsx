"use client";

import { useRef, useEffect } from "react";
import { AlertCircle } from "lucide-react";
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
  const gridClass = `feed-grid-${Math.min(feeds.length, 8)}`;

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

  useEffect(() => {
    // Use VideoJS if available globally
    // @ts-ignore
    if (window.videojs && videoRef.current) {
      // @ts-ignore
      const player = window.videojs(videoRef.current, {
        autoplay: true,
        controls: true,
        preload: "auto",
        fluid: true,
        sources: [
          {
            src: feed.url,
            type: "application/x-mpegURL",
          },
        ],
      });

      return () => {
        if (player) {
          player.dispose();
        }
      };
    }
  }, [feed.url]);

  return (
    <div className="relative bg-gray-900 rounded-lg aspect-video overflow-hidden">
      <div className="absolute inset-0 flex justify-center items-center">
        <video
          id={`feed-${feed.name}`}
          className="w-full h-full video-js vjs-default-skin vjs-big-play-centered"
          controls
          ref={videoRef}
          poster="/placeholder.svg?height=360&width=640"
          data-setup='{"fluid": true}'
        >
          <source src={feed.url} type="application/x-mpegURL" />
          <p className="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading
            to a web browser that supports HTML5 video
          </p>
        </video>

        <div className="absolute inset-0 flex flex-col pointer-events-none">
          {/* Feed title */}
          <div className="bg-black bg-opacity-50 p-2 pointer-events-auto"></div>
          <p className="font-medium text-sm">{feed.description}</p>
        </div>
      </div>
    </div>
  );
}
