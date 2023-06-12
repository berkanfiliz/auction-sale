import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import Dropzone from "react-dropzone";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: "#000",
    color: "#fff",
  },
});

export const ActiveTable = () => {
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

  const changeActiveFunction = async (id, isActive) => {
    confirmAlert({
      title: "Emin misiniz?",
      message: "Durumu değiştirmek istediğinizden emin misiniz?",
      buttons: [
        {
          label: "Evet",
          onClick: () => {
            toggleActive(id, isActive);
          },
        },
        {
          label: "Hayır",
          onClick: () => {},
        },
      ],
    });
  };

  const toggleActive = async (id, durum) => {
    try {
      const changeActive = await axios.patch(`/api/ihale/${id}`, { durum: !durum });
      setFetchIhale(fetchIhale.map((ihale) => (ihale._id === id ? { ...ihale, durum: !durum } : ihale)));
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
              .filter((ihale) => ihale.durum === true) // Sadece active (durumu true) ihaleleri filtrele
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
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                      onClick={() => {
                        changeActiveFunction(ihale._id, ihale.durum);
                      }}
                    >
                      Active
                    </button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
