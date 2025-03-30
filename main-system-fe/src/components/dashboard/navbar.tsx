// import { ZoneSelector } from "./zone_selector";
// import data from "@/_config/feed.json";
// import { Button } from "../ui/button";

// const NavBar = ({
//   isOpen,
//   setIsOpen,
// }: {
//   isOpen: boolean;
//   setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
// }) => {
//   return (
//     <nav
//       className={`flex flex-col justify-start items-start gap-4 bg-background p-4 w-max min-h-screen ${
//         isOpen ? "visible" : "hidden"
//       }`}
//     >
//       <div className="flex flex-col gap-4 text-3xl icons">
//         <span className="">AcsX</span>
//         <span className="text-lg">{data.org_name}</span>
//         <ZoneSelector />
//       </div>
//       <div className="flex flex-col justify-start items-start gap-4 *:hover:bg-foreground *:px-2 *:py-1 w-full *:w-full text-foreground *:hover:text-background text-xl *:transition-all *:duration-100 *:ease-out">
//         <a href="/camera" className="others__item">
//           Camera
//         </a>
//         <a href="/logs" className="others__item">
//           Logs
//         </a>
//         <a href="/settings" className="others__item">
//           Settings
//         </a>
//       </div>
//       <Button className="mt-auto w-full" onClick={() => setIsOpen(false)}>
//         Close
//       </Button>
//     </nav>
//   );
// };

// export default NavBar;

// ----------------------------------------------------------------------------------------

import { useState } from "react";
import { Camera, FileText, Settings, ChevronRight } from "lucide-react";
import type { DashboardData } from "./_index";
import { ZoneSelector } from "./zone_selector";

interface SidebarProps {
  data: DashboardData | null;
  selectedZone: string;
  onZoneChange: (zone: string) => void;
  isOpen: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({
  data,
  selectedZone,
  onZoneChange,
  isOpen,
  toggleSidebar,
}: SidebarProps) {
  const [activeItem, setActiveItem] = useState<string>("camera");

  const navItems = [
    { id: "camera", label: "Camera", icon: Camera },
    { id: "logs", label: "Logs", icon: FileText },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div
      className={`fixed md:relative z-10 h-full bg-gray-900 transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-0 md:w-16"
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-center p-4 border-gray-800 border-b">
          <div className={`flex items-center ${!isOpen && "md:hidden"}`}>
            <span className="font-bold text-xl">AcsX</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="hover:bg-gray-800 p-1 rounded-md"
          >
            {!isOpen ? (
              <ChevronRight size={20} />
            ) : (
              <ChevronRight size={20} className="rotate-180" />
            )}
          </button>
        </div>

        <div
          className={`p-4 border-b border-gray-800 ${!isOpen && "md:hidden"}`}
        >
          <p className="text-gray-400 text-sm">Organization</p>
          <p className="font-medium">{data?.org_name || "Loading..."}</p>
        </div>

        <div className={`p-4 ${!isOpen && "md:hidden"}`}>
          <ZoneSelector
            zones={data?.zones || []}
            selectedZone={selectedZone}
            onZoneChange={onZoneChange}
          />
        </div>

        <nav className="flex-1 overflow-y-auto">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveItem(item.id)}
                  className={`flex items-center w-full p-4 hover:bg-gray-800 transition-colors ${
                    activeItem === item.id ? "bg-gray-800" : ""
                  }`}
                >
                  <item.icon size={20} />
                  <span className={`ml-4 ${!isOpen && "md:hidden"}`}>
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-gray-800 border-t">
          <button
            onClick={toggleSidebar}
            className={`w-full py-2 px-4 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors ${
              !isOpen && "md:hidden"
            }`}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
