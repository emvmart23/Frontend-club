import { Outlet } from "react-router-dom";
import { Toaster } from "../components/ui/Toaster";
import { TailwindIndicator } from "../components";

export default function AppLayout() {
    return (
    <div className="w-full h-screen flex flex-col ">
      <div
        className=" w-[120rem] h-[100rem] rounded-full bg-primary/30 
        fixed blur-3xl left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-[125rem] "
      />
      <div className="bg-transparent h-[4.5rem] relative border-b-2 z-50 min-w-[590px]">
        <div className="h-full flex items-center justify-end p-6 gap-16 ">
          <div
            className=""
          >
          </div>
        </div>
        <div
          className="duration-200 h-screen fixed top-0 border-r"
        >
          <div className="mx-auto pt-4 pl-6">

          </div>
          <div className="grow">
            Sidebar
          </div>
        </div>
      </div>
      <div
        className="transition-all duration-200 relative ml-10 xl:ml-0 px-20 xl:px-52 2xl:px-48 pt-6 min-w-[550px]"
      >
        <Outlet />
      </div>
      <Toaster />
      <TailwindIndicator />
    </div>
  );
}