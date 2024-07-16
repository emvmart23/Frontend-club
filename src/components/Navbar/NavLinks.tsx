import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

interface Props {
  setIsExpanded: (value: boolean) => void;
  isExpanded?: boolean;
  links?: {
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
//  
export default function SidebarItems({ links, isExpanded }: Props) {
  const [open, setOpen] = useState(false)
  const location = useLocation();
  const isActive = location.pathname === links?.path;

  const handleClick = () => {
    setOpen(!open)
  };

  return links?.childrens ? (
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
          <span className="text-[0.9rem]">{links.title}</span>
        </span>
        <ArrowRight
          size={15}
          className={`${
            open && "rotate-90"
          } transition-all `}
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
              className={`flex w-[11.4rem] ml-4 h-[3.4rem] hover:scale-105`}
              to={child.path || ""}
            >
              <div
                className={`${
                  isActiveSubMenu && "bg-foreground dark:text-black text-white"
                } p-2 w-full text-[0.7rem] group-hover:bg-primary group-hover:text-background text-foreground text-start rounded mt-5 flex items-center gap-5`}
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
      } lg:visible flex w-[11.4rem] ml-4 h-[3.8rem] hover:scale-105`}
      to={links?.path || ""}
    >
      <div
        className={`${
          isActive && "bg-foreground dark:text-black text-white"
        } p-2 w-full group-hover:bg-primary group-hover:text-background text-foreground text-sm rounded transition-all duration-75 origin-left mt-4 flex items-center gap-5`}
      >
        {links?.icon && <i>{links.icon}</i>}
        {links?.title}
      </div>
    </NavLink>
  );
}
