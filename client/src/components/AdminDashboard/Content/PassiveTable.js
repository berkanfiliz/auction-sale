import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import Dropzone from "react-dropzone";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: "#000",
    color: "#fff",
  },
});

export const PassiveTable = () => {
  const classes = useStyles();
  const [fetchIhale, setFetchIhale] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const ihale = await axios.get("/api/ihale");
        setFetchIhale(ihale.data.ihale);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);

  const deleteFunction = async (id) => {
    try {
      const deleteIhale = await axios.delete(`/api/ihale/${id}`);
      setFetchIhale(fetchIhale.filter((ihale) => ihale._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper} style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>İhale ID</TableCell>
            <TableCell className={classes.tableHeader}>Oluşturan ID</TableCell>
            <TableCell className={classes.tableHeader}>Bitis Tarihi</TableCell>
            <TableCell className={classes.tableHeader}>Baslik</TableCell>
            <TableCell className={classes.tableHeader}>Baslangic Fiyat</TableCell>
            <TableCell className={classes.tableHeader}>Artış Miktarı</TableCell>
            <TableCell className={classes.tableHeader}>Satis Yüzdesi</TableCell>
            <TableCell className={classes.tableHeader}>Kategori</TableCell>
            <TableCell className={classes.tableHeader}>Active/Passive</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {fetchIhale &&
            fetchIhale
              .filter((ihale) => ihale.durum === false) // Sadece passive (durumu false) ihaleleri filtrele
              .map((ihale) => (
                <TableRow key={`${ihale._id}`}>
                  <TableCell>{ihale._id}</TableCell>
                  <TableCell>{ihale.olusturan_id}</TableCell>
                  <TableCell>{ihale.bitis_tarih}</TableCell>
                  <TableCell>{ihale.baslik}</TableCell>
                  <TableCell>{ihale.baslangic_fiyat}</TableCell>
                  <TableCell>{ihale.artis_miktari}</TableCell>
                  <TableCell>{ihale.minimum_satis_yuzde}</TableCell>
                  <TableCell>{ihale.kategori}</TableCell>
                  <TableCell>
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Passive</button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
