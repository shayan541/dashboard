import { Outlet } from "react-router-dom";

import Header from "./Header";
import SideBar from "./SideBar";

const Layout = () => (
  <div className="max-w-[1440px] mx-auto min-h-screen flex flex-col dark:bg-darkBg dark:text-darkText">
    <Header />
    <main className="sm:flex px-4 flex-1 ">
      <SideBar />
      <div className="flex-1 flex justify-center mt-8">
        <Outlet />
      </div>
    </main>
  </div>
);

export default Layout;
