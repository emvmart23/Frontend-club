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
  const width = useBreakpointer();

  const btnUpdateMenuVisibility = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    if (width < 768) {
      setIsExpanded(false);
    }
  }, [width]);

  return (
    <div className="w-full h-screen flex flex-col z-50">
      <div className="bg-background sticky top-0 border-b-2 z-50">
        <div className="flex justify-between md:justify-end items-center h-[4.6rem] px-8 md:px-20">
          <Button
            variant={"outline"}
            onClick={btnUpdateMenuVisibility}
            className="md:hidden z-50"
          >
            <Menu />
          </Button>
          <div className="flex justify-between items-center gap-4">
            <span className="font-semibold">Bienvenido {user?.name}</span>
            <UserDropDown />
          </div>
        </div>
        <div
          className={`${
            isExpanded ? "w-[15rem]" : "w-[0rem]"
          } md:w-[15rem] duration-100 bg-background transition-all h-screen fixed top-0 border-r z-50`}
        >
          <Button
            onClick={btnUpdateMenuVisibility}
            className={`${
              isExpanded ? "blocx" : "hidden"
            } md:hidden absolute top-4 right-4 p-2 w-8 h-8`}
            variant={"outline"}
          >
            <X />
          </Button>
          <div className="block mt-20">
            <Sidebar isExpanded={isExpanded} />
          </div>
        </div>
      </div>
      <div className="transition-all duration-200 mx-auto w-[80%] md:w-[70%] md:ml-[15rem] md:pl-24 max-w-320 pt-10">
        <Outlet />
      </div>
      <Toaster />
      <TailwindIndicator />
    </div>
  );
}
