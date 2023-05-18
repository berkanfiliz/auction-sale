import React, { useEffect, useState } from "react";
import axios from "axios";

export const Users = () => {
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get("/api/users");
        setUsers(user.data.message);
        console.log("Userım ", user.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  const toggleActive = () => {
    if (active) {
      if (window.confirm("Do you want to make it passive?")) {
        setActive(false);
      }
    } else {
      if (window.confirm("Do you want to make it active?")) {
        setActive(true);
      }
    }
  };

  return (
    <div className="container mx-auto">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-2 py-2 text-sm md:text-base">User ID</th>
              <th className="px-2 py-2 text-sm md:text-base">Name Surname</th>
              <th className="px-2 py-2 text-sm md:text-base">Email</th>
              <th className="px-2 py-2 text-sm md:text-base">Phone Number</th>
              <th className="px-2 py-2 text-sm md:text-base">Address</th>
              <th className="px-2 py-2 text-sm md:text-base">Active/Passive</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user) => (
                <tr key={user._id}>
                  <td className="border px-2 py-2 text-sm md:text-base">{user._id}</td>
                  <td className="border px-2 py-2 text-sm md:text-base">{user.email}</td>
                  <td className="border px-2 py-2 text-sm md:text-base">{user.name}</td>
                  <td className="border px-2 py-2 text-sm md:text-base">{user.phoneNumber}</td>
                  <td className="border px-2 py-2 text-sm md:text-base">{user.address}</td>
                  <td className="border px-2 py-2">
                    <button className={`${user.isActive === true ? "bg-green-500" : "bg-red-500"} hover:${user.isActive === true ? "bg-green-600" : "bg-red-600"} text-white font-bold py-2 px-4 rounded`} onClick={toggleActive}>
                      {user.isActive === true ? "Active" : "Passive"}
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
