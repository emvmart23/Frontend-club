import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  setOpen: (value: boolean) => void;
  setIsExpanded: (value: boolean) => void;
  isExpanded?: boolean;
  open: boolean;
  index: number;
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

export default function SidebarItems({ links, isExpanded,setOpen, open, index }: Props) {

  const location = useLocation();
  const isActive = location.pathname === links.path;

  const d = links.childrens?.map(child => child)

  const handleClick = () => {
    setOpen(!open)
  };
  return links.childrens ? (
    <div
      className={`${open ? "h-auto" : "h-[3.8rem]"} ${
        isExpanded ? "visible" : "invisible"
      } lg:visible ml-4 block rounded-md overflow-none px-2 pt-7`}
    >
      <div
        onClick={handleClick}
        className="flex gap-x-3 items-center hover:scale-105"
      >
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
          open ? "h-auto block text-[0.8rem] leading-loose" : "h-[0rem] hidden"
        } font-normal`}
      >
        {links?.childrens.map((child, index) => {
          const isActiveSubMenu = location.pathname === child.path;
          return (
            <NavLink
              key={index}
              className={`flex w-[11.5rem] ml-4 h-[3.8rem] hover:scale-105`}
              to={child.path || ""}
            >
              <div
                className={`${
                  isActiveSubMenu && "bg-foreground dark:text-black text-white"
                } p-2 w-full group-hover:bg-primary group-hover:text-background text-foreground rounded mt-5 flex gap-5`}
              >
                {child.icon && <i>{child.icon}</i>}
                {child.title}
              </div>
            </NavLink>
          );
        })}
      </div>
    </div>
  ) : (
    <NavLink
      className={` ${
        isExpanded ? "visible" : "invisible"
      } lg:visible flex w-[11.5rem] ml-4 h-[3.8rem] hover:scale-105`}
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
