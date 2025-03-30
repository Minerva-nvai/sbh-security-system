// import * as React from "react";
// import { Check, ChevronsUpDown } from "lucide-react";

// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import {
//   Command,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";

// import data from "@/_config/feed.json";

// const zones = data.zones.map((z) => {
//   return {
//     name: z.name,
//     value: z.value,
//   };
// });

// export function ZoneSelector() {
//   const [open, setOpen] = React.useState(false);
//   const [value, setValue] = React.useState("");

//   return (
//     <Popover open={open} onOpenChange={setOpen}>
//       <PopoverTrigger asChild>
//         <Button
//           variant="outline"
//           role="combobox"
//           aria-expanded={open}
//           className="justify-between w-[200px]"
//         >
//           {value
//             ? zones.find((zone) => zone.value === value)?.name
//             : "Select zone..."}
//           <ChevronsUpDown className="opacity-50 ml-2 w-4 h-4 shrink-0" />
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="p-0 w-[200px]">
//         <Command>
//           <CommandInput placeholder="Search zones..." />
//           <CommandList>
//             <CommandEmpty>No zones found!</CommandEmpty>
//             <CommandGroup>
//               {zones.map((zone) => (
//                 <CommandItem
//                   key={zone.value}
//                   value={zone.value}
//                   onSelect={(currentValue) => {
//                     setValue(currentValue === value ? "" : currentValue);
//                     setOpen(false);
//                   }}
//                 >
//                   <Check
//                     className={cn(
//                       "mr-2 h-4 w-4",
//                       value === zone.value ? "opacity-100" : "opacity-0"
//                     )}
//                   />
//                   {zone.name}
//                 </CommandItem>
//               ))}
//             </CommandGroup>
//           </CommandList>
//         </Command>
//       </PopoverContent>
//     </Popover>
//   );
// }

//-----------------------------------------------------------------------------------------

"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Zone } from "./_index";

interface ZoneSelectorProps {
  zones: Zone[];
  selectedZone: string;
  onZoneChange: (zone: string) => void;
}

export function ZoneSelector({
  zones,
  selectedZone,
  onZoneChange,
}: ZoneSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedZoneData = zones.find((zone) => zone.value === selectedZone);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex justify-between items-center bg-gray-800 p-2 rounded-md w-full"
      >
        <span>{selectedZoneData?.name || "Select zone..."}</span>
        <ChevronDown
          size={16}
          className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {isOpen && (
        <div className="z-10 absolute bg-gray-800 shadow-lg mt-1 rounded-md w-full">
          <ul>
            {zones.map((zone) => (
              <li key={zone.value}>
                <button
                  onClick={() => {
                    onZoneChange(zone.value);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left p-2 hover:bg-gray-700 ${
                    selectedZone === zone.value ? "bg-gray-700" : ""
                  }`}
                >
                  {zone.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
