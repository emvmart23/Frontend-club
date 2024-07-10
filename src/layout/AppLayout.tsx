import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";
import { TailwindIndicator } from "../components";
import Sidebar from "@/components/Navbar/Sidebar";
import UserDropDown from "@/components/UserDropDown";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import useBreakpointer from "@/hooks/useBreackpointer";

export default function AppLayout() {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);
  const [open, setOpen] = useState(false)
  const width = useBreakpointer();

  const btnUpdateMenuVisibility = () => {
    setIsExpanded(!isExpanded);
    setOpen(false);
  };

  useEffect(() => {
    if (width > 1024) {
      setIsExpanded(false);
    }
  }, [width]);

  return (
    <div className="w-full h-screen flex flex-col z-50">
      <div className="bg-background sticky top-0 border-b-2 z-50">
        <div className="flex justify-between lg:justify-end items-center h-[4.6rem] px-8 md:px-20 min-w-[320px]">
          <Button
            variant={"outline"}
            onClick={btnUpdateMenuVisibility}
            className="lg:hidden z-50"
          >
            <Menu />
          </Button>
          <div className="flex justify-between items-center gap-2 md:gap-4">
            <span className="font-semibold text-[0.9rem] md:text-[1rem]">Bienvenido {user?.name}</span>
            <UserDropDown />
          </div>
        </div>
        <div
          className={`${
            isExpanded ? "w-[15rem]" : "w-[0rem]"
          } lg:w-[15rem] origin-left transition-all duration-75 bg-background h-screen fixed top-0 border-r z-50`}
        >
          <Button
            onClick={btnUpdateMenuVisibility}
            className={`${
              isExpanded ? "block" : "hidden"
            } lg:hidden absolute top-4 right-4 p-2 w-8 h-8 flex justify-center`}
            variant={"outline"}
          >
            <X />
          </Button>
          <div className="mt-12">
            <Sidebar isExpanded={isExpanded} setIsExpanded={setIsExpanded} open={open} setOpen={setOpen}/>
          </div>
        </div>
      </div>
      <div className="transition-all duration-200 mx-auto w-[80%] md:w-full lg:w-[77%] lg:ml-[14rem] md:pl-20 max-w-320 pt-10">
        <Outlet />
      </div>
      <Toaster />
      <TailwindIndicator />
    </div>
  );
}
