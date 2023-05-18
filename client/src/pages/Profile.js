import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Tab, Tabs, TabPanel } from "react-tabs";
import axios from "axios";
import "react-tabs/style/react-tabs.css";

export const ProfilePage = () => {
  const { user } = useAuthContext();

  useEffect(() => {
    const ihaleGetir = async () => {
      console.log("Buraya girdi");
      const ihale = await axios.get(`api/ihale/${user._id}`);
      console.log("İhalem = ", ihale);
    };
    ihaleGetir();
  }, []);

  const [value, setValue] = useState(0);

  const handleChange = (index) => {
    setValue(index);
  };

  console.log(user._id);

  return (
    <div className="container">
      <div className="flex mt-9 justify-between items-center border border-gray-300 bg-gray-50 shadow-md p-5 rounded-lg">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl">Berkan Filiz</h1>
          <div className="bg-slate-200">
            <Tabs selectedIndex={value} onSelect={handleChange}>
              <Tab>BİLGİLERİM</Tab>
              <Tab>İLANLARIM</Tab>
              <Tab>FAVORİLERİM</Tab>
              <Tab>TEKLİF VERİLEN İLANLAR</Tab>
            </Tabs>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mr-10">
          <h1 className="text-red-600">CONTACT</h1>
          <h1>berkan@gmail.com</h1>
          <h1>0543xxxxxxx</h1>
        </div>
      </div>

      <TabPanel selected={value === 0}>
        <h2>BİLGİLERİM</h2>
        <p>Buraya kullanıcıların bilgileri koyulup bunlar düzenlenecek.</p>
      </TabPanel>
      <TabPanel selected={value === 1}>
        <h2>İLANLARIM</h2>
        <p>Buraya oluşturulan ihaleler koyulacak.</p>
      </TabPanel>
      <TabPanel selected={value === 2}>
        <h2>FAVORILERIM</h2>
        <p>Buraya favorilere eklenen ihaleler koyulacak.</p>
      </TabPanel>
      <TabPanel selected={value === 3}>
        <h2>TEKLİF VERİLEN İLANLAR</h2>
        <p>Buraya Teklif verilen ve süren ilanlar koyulacak.</p>
      </TabPanel>
    </div>
  );
};
