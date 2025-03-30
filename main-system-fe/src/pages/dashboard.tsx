import { NavBar, CameraFeed, LogsFeed } from "@/components/dashboard/_index";

const Dashboard = () => {
  return (
    <main className="flex flex-col justify-start items-start min-w-screen min-h-screen">
      <NavBar />
      <div className="flex justify-start items-start gap-4 bg-background p-4 w-full h-full">
        <CameraFeed />
        <LogsFeed />
      </div>
    </main>
  );
};

export default Dashboard;
