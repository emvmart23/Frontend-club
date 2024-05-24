import { NavLink, useLocation } from "react-router-dom";

interface Props {
  icon: React.ReactNode;
  title: string;
  path: string;
  submenu?: {
    icon: React.ReactNode;
    title: string;
    path: string;
  }[];
  state: boolean;
  setState: (value: boolean) => void;
}

export default function NavLinks({
  icon,
  title,
  path,
  submenu,
  state,
  setState,
}: Props) {
  const location = useLocation();
  const isActive = location.pathname === path;

  const handleClick = () => {
    if (submenu) {
      setState(!state);
    }
  };

  return (
    <>
      <NavLink
        onBlur={() => setState(false)}
        onClick={handleClick}
        to={path}
        className="group flex relative w-[12rem] ml-4 h-[3.8rem] mx-auto z-40"
      >
        <div
          className={`${
            isActive && "bg-foreground dark:text-black text-white"
          } p-2 w-full group-hover:bg-primary group-hover:text-background text-foreground rounded transition-all duration-75 origin-left mt-5 flex gap-5`}
        >
          <span>{icon}</span>
          <span className="origin-left">{title}</span>
        </div>
      </NavLink>
      {submenu && state && (
        <div className="w-[10rem] h-[10rem] bg-foreground/35 absolute left-[10rem]">
          <ul className="flex flex-col gap-4">
            {submenu.map((submenu, index) => (
              <NavLink
                key={index}
                to={submenu.path}
                className="group flex relative w-[12rem] ml-4 h-full mx-auto z-50"
              >
                <div
                  className={`${
                    isActive && "bg-foreground dark:text-black text-white"
                  } p-2 w-full group-hover:bg-primary group-hover:text-background text-foreground rounded transition-all duration-75 origin-left mt-5 flex gap-5`}
                >
                  <span>{submenu.icon}</span>
                  <span className="origin-left">{submenu.title}</span>
                </div>
              </NavLink>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
