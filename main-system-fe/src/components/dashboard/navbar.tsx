import { ZoneSelector } from "./zone_selector";

const NavBar = () => {
  return (
    <nav className="top-0 z-10 sticky flex justify-between items-center bg-background p-4 w-full">
      <div className="flex gap-4 text-3xl icons">
        <span className="">AcsX</span>
        <ZoneSelector />
      </div>
      <div className="flex justify-between items-center gap-4 *:hover:bg-foreground *:px-2 *:py-1 *:w-24 text-foreground *:hover:text-background text-xl *:text-center *:transition-all *:duration-300">
        <a href="/camera" className="others__item">
          Camera
        </a>
        <a href="/logs" className="others__item">
          Logs
        </a>
        <a href="/settings" className="others__item">
          Settings
        </a>
      </div>
    </nav>
  );
};

export default NavBar;
