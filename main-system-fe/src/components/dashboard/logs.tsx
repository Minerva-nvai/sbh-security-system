const LogsFeed = () => {
  return (
    <aside className="flex flex-col flex-1/4 justify-start items-start gap-4 bg-[#1d1d1d] px-1 w-full min-h-screen overflow-y-auto log_feed zone_bar">
      {/* <h2 className="top-0 z-9 sticky px-3 py-4 w-full font-bold text-white text-2xl">
        Live logs
      </h2> */}
      <div className="flex flex-col-reverse gap-2 px-3 py-4 w-full log_feed__content">
        <p className="bg-red-400 px-2 py-1 text-white">
          <span className="font-bold text-xl">Severe:</span> Fire detected in{" "}
          <span>east-wing-gate-1a</span> 12:00 PM
        </p>
        <p className="bg-green-400 px-2 py-1 text-black">
          <span className="font-bold text-xl">Warning:</span> Fire detected in{" "}
          <span>east-wing-gate-1a</span> 12:00 PM
        </p>
      </div>
    </aside>
  );
};

export default LogsFeed;
