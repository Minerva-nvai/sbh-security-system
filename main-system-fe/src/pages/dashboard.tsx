// import { NavBar, CameraFeed, LogsFeed } from "@/components/dashboard/_index";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";

// const Dashboard = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   return (
//     <main className="relative flex justify-start items-start min-w-full min-h-screen">
//       <NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
//       {!isOpen && (
//         <Button
//           variant="outline"
//           className="top-4 left-10 absolute w-max"
//           onClick={() => setIsOpen(true)}
//         >
//           Open sidebar
//         </Button>
//       )}
//       <div className="flex justify-start items-start w-full">
//         <CameraFeed />
//         <LogsFeed />
//       </div>
//     </main>
//   );
// };

// export default Dashboard;

// -----------------------------------------------------------------------------------------

import { Dashboard } from "@/components/dashboard/_index";

export default function DashboardPage() {
  return <Dashboard />;
}
