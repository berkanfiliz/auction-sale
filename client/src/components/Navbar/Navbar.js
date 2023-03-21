import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useLogout } from "../../hooks/useLogout";

export const Navbar = () => {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const { logout } = useLogout();
  const [dropdownContent, setDropdownContent] = useState(null);

  useEffect(() => {
    if (user) {
      // Kullanıcının giriş yaptığı durumda gösterilecek dropdown
      setDropdownContent(
        <div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
              <div
                onClick={() => {
                  navigate("/profile");
                }}
                className="flex space-x-4 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                <i className="fa-solid fa-right-to-bracket ml-5"></i>
                <p>Profile</p>
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  logout();
                }}
                className="flex space-x-4 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                <i className="fa-regular fa-registered ml-5"></i>
                <p>Logout</p>
              </div>
            </li>
          </ul>
        </div>
      );
    } else {
      // Kullanıcının giriş yapmadığı durumda gösterilecek dropdown
      setDropdownContent(
        <div id="dropdownDotsHorizontal" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownMenuIconHorizontalButton">
            <li>
              <div
                onClick={() => {
                  navigate("/login");
                }}
                className="flex space-x-4 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                <i className="fa-solid fa-right-to-bracket ml-5"></i>
                <p>Login</p>
              </div>
            </li>
            <li>
              <div
                onClick={() => {
                  navigate("/register");
                }}
                className="flex space-x-4 items-center px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              >
                <i className="fa-regular fa-registered ml-5"></i>
                <p>Register</p>
              </div>
            </li>
          </ul>
          {/* <div className="py-2">
      <a href="#" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">
        Separated link
      </a>
    </div> */}
        </div>
      );
    }
  }, [user]);

  return (
    <div className="h-20 bg-white flex items-center shadow-md shadow-slate-400 sticky top-0 z-10">
      <div className="container flex justify-between items-center ">
        <div>
          <div className="cursor-pointer text-green-600 border-2 px-3 py-2 rounded-full" onClick={() => navigate("/")}>
            İhale Project
          </div>
        </div>
        <div className="relative">
          <input className="w-36 sm:w-40 md:w-72 border-2 rounded-full p-2 relative focus:border-green-400" type="text" placeholder="Search" />
          <div>
            <i className="absolute right-3 top-1 bg-green-400 fa-solid fa-magnifying-glass border rounded-full p-2 "></i>
          </div>
        </div>
        {/* //DROPDOWN */}
        <div className="border-2 rounded-full px-3 py-2">
          <button id="dropdownMenuIconHorizontalButton" data-dropdown-toggle="dropdownDotsHorizontal" className="inline-flex items-center p-2 text-sm font-medium text-center text-gray-900 bg-white rounded-lg " type="button">
            <i className="fa fa-bars"></i>
          </button>
          <i className="hidden md:inline-flex md:visible fa-solid fa-user"></i>
          {dropdownContent}
        </div>
      </div>
    </div>
  );
};
