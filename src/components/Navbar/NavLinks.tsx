import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  isExpanded?: boolean;
  links: {
    icon: React.ReactNode;
    title: string;
    path?: string;
    childrens?: {
      icon: React.ReactNode;
      title: string;
      path?: string;
    }[];
  };
}

export default function SidebarItems({ links, isExpanded }: Props) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = location.pathname === links.path;

  const handleClick = () => {
    setOpen(!open);
  };

  return links.childrens ? (
    <div
     className={`${open ? "h-auto" : "h-[3.8rem]"} ${
    isExpanded ? "visible" : "invisible"
  } lg:visible ml-4 block rounded-md overflow-none px-2 pt-7`}
    >
      <div onClick={handleClick} className="flex gap-x-4 items-center">
        <span className="flex justify-start gap-5">
          {links.icon && <i>{links.icon}</i>}
          <span>{links.title}</span>
        </span>
        <ArrowRight
          className={`h-4 w-4 ${
            open && "rotate-90"
          } transition-all duration-300`}
        />
      </div>
      <div
        className={`${
          open ? "h-auto block" : "h-[0rem] hidden"
        } transition-all duration-300`}
      >
        {links?.childrens.map((child, index) => (
          <SidebarItems key={index} links={child} />
        ))}
      </div>
    </div>
  ) : (
    <NavLink
      className={`${
        isExpanded ? "visible" : "invisible"
      } lg:visible flex w-[11.5rem] ml-4 h-[3.8rem]`}
      to={links.path || ""}
    >
      <div
        className={`${
          isActive && "bg-foreground dark:text-black text-white"
        } p-2 w-full group-hover:bg-primary group-hover:text-background text-foreground rounded transition-all duration-75 origin-left mt-5 flex gap-5`}
      >
        {links.icon && <i>{links.icon}</i>}
        {links.title}
      </div>
    </NavLink>
  );
}
