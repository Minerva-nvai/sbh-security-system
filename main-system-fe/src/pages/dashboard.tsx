import { NavBar, CameraFeed, LogsFeed } from "@/components/dashboard/_index";

const Dashboard = () => {
  return (
    <main className="flex flex-col justify-start items-start min-w-full min-h-screen">
      <NavBar />
      <div className="flex justify-start items-start w-full">
        <CameraFeed />
        <LogsFeed />
      </div>
    </main>
  );
};

export default Dashboard;
