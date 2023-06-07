import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";

// Tailwind CSS ile özel stil sınıflarını tanımlayalım
const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: "#000",
    color: "#fff",
  },
});

export const MyTable = () => {
  const classes = useStyles();

  return (
    <TableContainer component={Paper} style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>Başlık 1</TableCell>
            <TableCell className={classes.tableHeader}>Başlık 2</TableCell>
            <TableCell className={classes.tableHeader}>Başlık 3</TableCell>
            <TableCell className={classes.tableHeader}>Başlık 1</TableCell>
            <TableCell className={classes.tableHeader}>Başlık 2</TableCell>
            <TableCell className={classes.tableHeader}>Başlık 3</TableCell>
            <TableCell className={classes.tableHeader}>Başlık 1</TableCell>
            <TableCell className={classes.tableHeader}>Başlık 2</TableCell>
            <TableCell className={classes.tableHeader}>Başlık 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Veri 1</TableCell>
            <TableCell>Veri 2</TableCell>
            <TableCell>Veri 3</TableCell>
            <TableCell>Veri 1</TableCell>
            <TableCell>Veri 2</TableCell>
            <TableCell>Veri 3</TableCell>
            <TableCell>Veri 1</TableCell>
            <TableCell>Veri 2</TableCell>
            <TableCell>Veri 3</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};
