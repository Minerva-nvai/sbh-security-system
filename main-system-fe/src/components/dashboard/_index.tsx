// import CameraFeed from "./camera_feed";
// import LogsFeed from "./logs";
// import NavBar from "./navbar";

// export { CameraFeed, LogsFeed, NavBar };

//--------------------------------------------------------------------

import { useState, useEffect } from "react";
import { Sidebar } from "./navbar";
import { CameraFeeds } from "./camera_feed";
import { LogsSidebar } from "./logs";
import { useWebSocket } from "@/lib/utils";

export interface Feed {
  name: string;
  description: string;
  url: string;
}

export interface Zone {
  name: string;
  value: string;
  description: string;
  location: string;
  feeds: Feed[];
}

export interface DashboardData {
  org_name: string;
  zones: Zone[];
}

export interface LogEntry {
  level: "info" | "warning" | "severe";
  message: string;
  timestamp: string;
  feed: string;
}

export function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedZone, setSelectedZone] = useState<string>("");
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(true);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(true);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        const response = await fetch("/api/dashboard-data");
        const data = await response.json();
        setData(data);
        if (data.zones.length > 0) {
          setSelectedZone(data.zones[0].value);
        }
      } catch (_err) {
        // Fallback to hardcoded data for demo
        const hardcodedData = {
          org_name: "XYZ College",
          zones: [
            {
              name: "East Wing",
              value: "east-wing",
              description: "East Wing",
              location: "East Wing",
              feeds: [
                {
                  name: "east-wing-gate-1a",
                  description: "East Wing Gate 1A",
                  url: "rtsp://127.0.0.1:8554/stream",
                },
                {
                  name: "east-wing-gate-1b",
                  description: "East Wing Gate 1B",
                  url: "rtsp://127.0.0.1:8554/stream",
                },
                {
                  name: "east-wing-ground-1a",
                  description: "East Wing Ground 1A",
                  url: "rtsp://127.0.0.1:8554/stream",
                },
                {
                  name: "east-wing-hallway-1a",
                  description: "East Wing Hallway 1A",
                  url: "rtsp://127.0.0.1:8554/stream",
                },
              ],
            },
            {
              name: "West Wing",
              value: "west-wing",
              description: "West Wing",
              location: "West Wing",
              feeds: [
                {
                  name: "west-wing-ground-1a",
                  description: "West Wing Ground 1A",
                  url: "rtsp://127.0.0.1:8554/stream",
                },
                {
                  name: "west-wing-ground-1b",
                  description: "West Wing Ground 1B",
                  url: "rtsp://127.0.0.1:8554/stream",
                },
              ],
            },
          ],
        };
        setData(hardcodedData);
        if (hardcodedData.zones.length > 0) {
          setSelectedZone(hardcodedData.zones[0].value);
        }
      }
    };

    fetchData();
  }, []);

  // Connect to WebSocket for live logs
  const { lastMessage } = useWebSocket("ws://localhost:8080/logs");

  useEffect(() => {
    if (lastMessage) {
      try {
        const logEntry = JSON.parse(lastMessage.data) as LogEntry;
        setLogs((prev) => [logEntry, ...prev].slice(0, 100)); // Keep last 100 logs
      } catch (error) {
        console.error("Failed to parse WebSocket message:", error);
      }
    }
  }, [lastMessage]);

  // Mock logs for demo
  useEffect(() => {
    const mockLogs = [
      {
        level: "warning",
        message: "Fire detected in east-wing-gate-1a",
        timestamp: "12:00 PM",
        feed: "east-wing-gate-1a",
      },
      {
        level: "severe",
        message: "Fire detected in east-wing-gate-1a",
        timestamp: "12:00 PM",
        feed: "east-wing-gate-1a",
      },
    ] as LogEntry[];

    setLogs(mockLogs);

    // Simulate incoming logs
    const interval = setInterval(() => {
      const levels = ["info", "warning", "severe"] as const;
      const feeds =
        data?.zones.flatMap((zone) => zone.feeds.map((feed) => feed.name)) ||
        [];

      if (feeds.length > 0) {
        const newLog: LogEntry = {
          level: levels[Math.floor(Math.random() * levels.length)],
          message: `Activity detected in ${
            feeds[Math.floor(Math.random() * feeds.length)]
          }`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          feed: feeds[Math.floor(Math.random() * feeds.length)],
        };

        setLogs((prev) => [newLog, ...prev].slice(0, 100));
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const toggleLeftSidebar = () => setLeftSidebarOpen((prev) => !prev);
  const toggleRightSidebar = () => setRightSidebarOpen((prev) => !prev);

  const currentZone = data?.zones.find((zone) => zone.value === selectedZone);
  const feeds = currentZone?.feeds || [];

  return (
    <div className="flex bg-black h-screen overflow-hidden text-white">
      {/* Left Sidebar */}
      <Sidebar
        data={data}
        selectedZone={selectedZone}
        onZoneChange={setSelectedZone}
        isOpen={leftSidebarOpen}
        toggleSidebar={toggleLeftSidebar}
      />

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto">
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={toggleLeftSidebar}
            className="md:hidden bg-gray-800 hover:bg-gray-700 p-2 rounded-md"
          >
            {leftSidebarOpen ? "←" : "→"}
          </button>
          <h1 className="font-bold text-xl">
            {currentZone?.name || "Loading..."}
          </h1>
          <button
            onClick={toggleRightSidebar}
            className="md:hidden bg-gray-800 hover:bg-gray-700 p-2 rounded-md"
          >
            {rightSidebarOpen ? "→" : "←"}
          </button>
        </div>

        <CameraFeeds feeds={feeds} />
      </main>

      {/* Right Sidebar */}
      <LogsSidebar
        logs={logs}
        isOpen={rightSidebarOpen}
        toggleSidebar={toggleRightSidebar}
      />
    </div>
  );
}
