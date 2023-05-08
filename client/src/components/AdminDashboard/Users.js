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
    <div className="">
      <div className="flex flex-col items-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-2 py-2">User ID</th>
              <th className="px-2 py-2">Name Surname</th>
              <th className="px-2 py-2">Email</th>
              <th className="px-2 py-2">Phone Number</th>
              <th className="px-2 py-2">Address</th>
              <th className="px-2 py-2">Active/Passive</th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">berkannfiliz@gmail.com</td>
              <td className="border px-4 py-2">John Doe</td>
              <td className="border px-4 py-2">555-555-5555</td>
              <td className="border px-4 py-2">123 Main St</td>
              <td className="border px-4 py-2">
                <button className={`${active ? "bg-green-500" : "bg-red-500"} hover:${active ? "bg-green-600" : "bg-red-600"} text-white font-bold py-2 px-4 rounded`} onClick={toggleActive}>
                  {active ? "Active" : "Passive"}
                </button>
              </td>
            </tr> */}
            {users &&
              users.map((user) => (
                <tr>
                  <td className="border px-2 py-2">{user._id}</td>
                  <td className="border px-2 py-2">{user.email}</td>
                  <td className="border px-2 py-2">{user.name}</td>
                  <td className="border px-2 py-2">{user.phoneNumber}</td>
                  <td className="border px-4 py-2">{user.address}</td>
                  <button className={`${user.isActive === true ? "bg-green-500" : "bg-red-500"} hover:${user.isActive === true ? "bg-green-600" : "bg-red-600"} text-white font-bold py-2 px-4 rounded`} onClick={toggleActive}>
                    {user.isActive === true ? "Active" : "Passive"}
                  </button>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
