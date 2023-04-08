import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Tabs, Tab, Box } from "@material-ui/core";
import axios from "axios";

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

  function TabPanel(props) {
    const { children, value, index } = props;
    return (
      <div role="tabpanel" hidden={value !== index}>
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(user._id);

  return (
    <div className="container">
      <div className="flex mt-9 justify-between items-center border border-gray-300 bg-gray-50 shadow-md p-5 rounded-lg">
        <div className="flex flex-col space-y-4">
          <h1 className="text-3xl">Berkan Filiz</h1>
          <div className="bg-slate-200">
            <Tabs value={value} onChange={handleChange}>
              <Tab label="İLANLARIM" />
              <Tab label="FAVORİLERİM" />
              <Tab label="TEKLİF VERİLEN İLANLAR" />
            </Tabs>
          </div>
        </div>
        <div className="flex flex-col space-y-2 mr-10">
          <h1 className="text-red-600">CONTACT</h1>
          <h1>berkan@gmail.com</h1>
          <h1>0543xxxxxxx</h1>
        </div>
      </div>

      <TabPanel value={value} index={0}>
        <h2>İLANLARIM</h2>
        <p>Buraya oluşturulan ihaleler koyulacak.</p>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <h2>FAVORILERIM</h2>
        <p>Buraya favorilere eklenen ihaleler koyulacak.</p>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <h2>TEKLİF VERİLEN İLANLAR</h2>
        <p>Buraya Teklif verilen ve süren ilanlar koyulacak.</p>
      </TabPanel>
    </div>
  );
};
