// const LogsFeed = () => {
//   return (
//     <aside className="flex flex-col flex-1/4 justify-start items-start gap-4 bg-[#1d1d1d] px-1 w-full min-h-screen overflow-y-auto log_feed zone_bar">
//       {/* <h2 className="top-0 z-9 sticky px-3 py-4 w-full font-bold text-white text-2xl">
//         Live logs
//       </h2> */}
//       <div className="flex flex-col-reverse gap-2 px-3 py-4 w-full log_feed__content">
//         <p className="bg-red-400 px-2 py-1 text-white">
//           <span className="font-bold text-xl">Severe:</span> Fire detected in{" "}
//           <span>east-wing-gate-1a</span> 12:00 PM
//         </p>
//         <p className="bg-green-400 px-2 py-1 text-black">
//           <span className="font-bold text-xl">Warning:</span> Fire detected in{" "}
//           <span>east-wing-gate-1a</span> 12:00 PM
//         </p>
//       </div>
//     </aside>
//   );
// };

// export default LogsFeed;

// ----------------------------------------------------------------------------------------

import { useEffect, useRef } from "react";
import { ChevronLeft, AlertTriangle, AlertCircle, Info } from "lucide-react";
import type { LogEntry } from "./_index";

interface LogsSidebarProps {
  logs: LogEntry[];
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function LogsSidebar({ logs, isOpen, toggleSidebar }: LogsSidebarProps) {
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new logs come in
  useEffect(() => {
    if (isOpen) {
      logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [logs, isOpen]);

  return (
    <div
      className={`fixed right-0 md:relative z-10 h-full bg-gray-900 transition-all duration-300 ease-in-out ${
        isOpen ? "w-80" : "w-0 md:w-16"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-gray-800 border-b">
          <div className={`flex items-center ${!isOpen && "md:hidden"}`}>
            <span className="font-bold text-xl">Live Logs</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="hover:bg-gray-800 p-1 rounded-md"
          >
            {!isOpen ? (
              <ChevronLeft size={20} />
            ) : (
              <ChevronLeft size={20} className="rotate-180" />
            )}
          </button>
        </div>

        <div className={`flex-1 overflow-y-auto ${!isOpen && "md:hidden"}`}>
          {logs.length === 0 ? (
            <div className="flex justify-center items-center h-full">
              <p className="text-gray-500">No logs available</p>
            </div>
          ) : (
            <div className="space-y-2 p-2">
              {logs.map((log, index) => (
                <LogItem key={index} log={log} />
              ))}
              <div ref={logsEndRef} />
            </div>
          )}
        </div>

        {!isOpen && (
          <div className="hidden md:flex md:flex-col md:items-center md:space-y-4 md:p-4">
            <div className="relative">
              <div className="-top-1 -right-1 absolute bg-red-500 rounded-full w-3 h-3"></div>
              <AlertTriangle size={20} />
            </div>
            <AlertCircle size={20} />
            <Info size={20} />
          </div>
        )}
      </div>
    </div>
  );
}

interface LogItemProps {
  log: LogEntry;
}

function LogItem({ log }: LogItemProps) {
  let bgColor = "bg-gray-800";

  if (log.level === "warning") {
    bgColor = "bg-yellow-900";
  } else if (log.level === "severe") {
    bgColor = "bg-red-900";
  }

  return (
    <div className={`p-3 rounded-md ${bgColor}`}>
      <div className="flex items-start">
        <div className="mt-0.5 mr-3">
          {log.level === "warning" ? (
            <AlertTriangle size={16} />
          ) : (
            <AlertCircle size={16} />
          )}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <p className="font-medium">
              {log.level.charAt(0).toUpperCase() + log.level.slice(1)}
            </p>
            <span className="text-gray-400 text-xs">{log.timestamp}</span>
          </div>
          <p className="mt-1 text-sm">{log.message}</p>
        </div>
      </div>
    </div>
  );
}
