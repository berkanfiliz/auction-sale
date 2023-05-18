import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { RiSettings4Line } from "react-icons/ri";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder } from "react-icons/fi";
import { Users } from "./Users";
import { DashboardHome } from "./DashboardHome";
import { Categories } from "./Categories";

export const SideBar = () => {
  const handleClick = (e, menu) => {
    e.preventDefault();
    setClick(menu.name);
    console.log(`Tıklanan: ${menu.name}`);
  };
  const menus = [
    { name: "Dashboard", icon: MdOutlineDashboard },
    { name: "Users", icon: AiOutlineUser },
    { name: "Categories", icon: FiMessageSquare },
    { name: "Aktif ihaleler", icon: TbReportAnalytics },
    { name: "Pasif ihaleler", icon: FiFolder },
    // { name: "Go to homepage", icon: FiShoppingCart },
    { name: "Settings", icon: RiSettings4Line },
  ];
  const [open, setOpen] = useState(true);
  const [click, setClick] = useState("dashboard");
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (isSmallScreen) {
      setOpen(false);
    }
  }, [isSmallScreen]);
  return (
    <section className="flex gap-6">
      <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-4 relative">
          {menus?.map((menu, i) => (
            <div key={i} onClick={(e) => handleClick(e, menu)} className={` ${menu?.margin && "mt-5"} group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md`}>
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${i + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${!open && "opacity-0 translate-x-28 overflow-hidden"}`}
              >
                {menu?.name}
              </h2>
              <h2 className={`${open && "hidden"} absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}>{menu?.name}</h2>
            </div>
          ))}
        </div>
      </div>
      <div className="container mt-8 text-xl text-gray-900 font-semibold relative">
        <div>{click === "Dashboard" && <DashboardHome />}</div>
        <div>{click === "Users" && <Users />}</div>
        {/* <div>{click === "Go to homepage" && navigate("/")}</div> */}
        <div>{click === "Categories" && <Categories />}</div>
      </div>
    </section>
  );
};
