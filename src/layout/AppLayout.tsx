import { NavLink, Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";
import { TailwindIndicator } from "../components";
import Sidebar from "@/components/Navbar/Sidebar";
import UserDropDown from "@/components/UserDropDown";
import { useAuth } from "@/hooks/useAuth";


export default function AppLayout() {
  const {user} = useAuth()
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="bg-transparent relative border-b-2 z-50">
      <div className="flex justify-end items-center h-[4.6rem] px-20">
        <div className="flex justify-center items-center gap-4">
          <span className='font-semibold'>Bienvenido {user?.name}</span>
          <UserDropDown />
        </div>
      </div>
        <div
          className=" w-[14rem] duration-200 h-screen fixed top-0 border-r z-50 hidden md:block"
        >
          <div className="mx-auto w-full h-[5rem] pt-4 pl-6">
            <NavLink to="/">
                Logo Club
            </NavLink>
          </div>
          <div className="grow">
            <Sidebar/>
          </div>
        </div>
      </div>
      <div
        className="transition-all duration-200 mx-auto w-[80%] md:w-[70%] md:ml-[15rem] md:pl-24 max-w-320 pt-10"
      >
        <Outlet />
      </div>
      <Toaster />
      <TailwindIndicator />
    </div>
  );
}