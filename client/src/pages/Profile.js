import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Tab, Tabs, TabPanel } from "react-tabs";
import axios from "axios";
import "react-tabs/style/react-tabs.css";
import { AccountInformation } from "../components/Profile/AccountInformation";
import { TeklifIlan } from "../components/Profile/TeklifIlan";
import { Favorites } from "../components/Profile/Favorites";
import { Ilan } from "../components/Profile/Ilan";

export const ProfilePage = () => {
  const { user } = useAuthContext();
  const [userAccount, setUserAccount] = useState([]);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      console.log("Buraya girdi");
      const response = await axios.get(`api/user/${user._id}`);
      setUserAccount(response.data.message);
      console.log("UserAccount: ", response.data.message);
    };
    fetchUser();
  }, []);

  const handleChange = (index) => {
    setValue(index);
  };
  console.log("User bilgi ", userAccount);

  return (
    <div className="container">
      <div className="flex mt-9 justify-center sm:justify-between items-center border border-gray-300 shadow-md shadow-slate-400 transform transition duration-200 hover:-translate-y-1 hover:shadow-2xl hover:shadow-green-400 p-6">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl">{userAccount.name}</h1>
          <div className="">
            <Tabs selectedIndex={value} onSelect={handleChange} className="text-gray-600 grid grid-cols-1 sm:grid-cols-4 gap-10">
              <Tab className={`${value === 0 ? "bg-green-500 text-white" : "bg-gray-200"} py-2 px-4 rounded-lg cursor-pointer border border-black  mt-auto`}>
                <span>BİLGİLERİM</span>
              </Tab>
              <Tab className={`${value === 1 ? "bg-green-500 text-white" : "bg-gray-200"} py-2 px-4 rounded-lg cursor-pointer mt-auto border border-black`}>
                <span>IHALELERİM</span>
              </Tab>
              <Tab className={`${value === 2 ? "bg-green-500 text-white" : "bg-gray-200"} py-2 px-4 rounded-lg cursor-pointer mt-auto border border-black`}>
                <span>FAVORİLERİM</span>
              </Tab>
              {/* <Tab className={`${value === 3 ? "bg-green-500 text-white" : "bg-gray-200"} py-2 px-4 rounded-lg cursor-pointer mt-auto border border-black`}>
                <span>TEKLİFLİ IHALELER</span>
              </Tab> */}
            </Tabs>
          </div>
        </div>
        <div className="hidden lg:flex flex-col space-y-2 mr-10">
          <h1 className="text-red-600">CONTACT</h1>
          <h1>{userAccount.email}</h1>
          <h1>+90{userAccount.phoneNumber}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 mt-4">
        <TabPanel selected={value === 0} className="col-span-1 lg:col-span-4">
          <AccountInformation userAccount={userAccount} />
        </TabPanel>
        <TabPanel selected={value === 1} className="col-span-1 lg:col-span-4">
          <Ilan />
        </TabPanel>
        <TabPanel selected={value === 2} className="col-span-1 lg:col-span-4">
          <Favorites userAccount={userAccount} />
        </TabPanel>
        <TabPanel selected={value === 3} className="col-span-1 lg:col-span-4">
          <TeklifIlan />
          <p>Buraya Teklif verilen ve süren ilanlar koyulacak.</p>
        </TabPanel>
      </div>
    </div>
  );
};
