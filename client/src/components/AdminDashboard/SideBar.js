import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineDashboard } from "react-icons/md";
import { TbReportAnalytics } from "react-icons/tb";
import { AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import { FiMessageSquare, FiFolder } from "react-icons/fi";
import { Users } from "./Content/Users";
import { DashboardHome } from "./Content/DashboardHome";
import { Categories } from "./Content/Categories";
import { ActiveTable } from "./Content/ActiveTable";
import { PassiveTable } from "./Content/PassiveTable";
import { useNavigate } from "react-router-dom";

export const SideBar = () => {
  const navigate = useNavigate();
  const handleClick = (e, menu) => {
    e.preventDefault();
    if (menu.name === "Dashboard") setContent(<DashboardHome />);
    if (menu.name === "Users") setContent(<Users />);
    if (menu.name === "Categories") setContent(<Categories />);
    if (menu.name === "Aktif ihaleler") setContent(<ActiveTable />);
    if (menu.name === "Pasif ihaleler") setContent(<PassiveTable />);
    if (menu.name === "Go to homepage") {
      navigate("/");
      window.location.reload();
    }
    console.log(`Tıklanan: ${menu.name}`);
  };
  const menus = [
    { name: "Dashboard", icon: MdOutlineDashboard },
    { name: "Users", icon: AiOutlineUser },
    { name: "Categories", icon: FiMessageSquare },
    { name: "Aktif ihaleler", icon: TbReportAnalytics },
    { name: "Pasif ihaleler", icon: FiFolder },
    { name: "Go to homepage", icon: FiFolder },
  ];
  const [open, setOpen] = useState(true);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [content, setContent] = useState(<DashboardHome />);

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
    <section className="flex">
      <div className={`bg-[#0e0e0e] min-h-screen ${open ? "w-72" : "w-16"} duration-500 text-gray-100 px-4`}>
        <div className="py-3 flex justify-end">
          <HiMenuAlt3 size={26} className="cursor-pointer" onClick={() => setOpen(!open)} />
        </div>
        <div className="mt-4 flex flex-col gap-8 relative">
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
      <div className="container mt-8 text-xl text-gray-900 font-semibold">
        <div>{content}</div>
      </div>
    </section>
  );
};
