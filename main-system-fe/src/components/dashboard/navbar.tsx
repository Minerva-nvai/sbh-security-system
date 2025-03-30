const NavBar = () => {
  return (
    <nav className="flex justify-between items-center bg-foreground p-4 w-full text-background">
      <div className="text-3xl icons">AcsX</div>
      <div className="flex justify-between items-center gap-4 *:hover:bg-background *:px-2 *:py-1 *:w-24 *:hover:text-foreground text-xl *:text-center *:transition-all *:duration-300">
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
