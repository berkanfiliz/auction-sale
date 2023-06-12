import React, { useEffect, useState } from "react";
import axios from "axios";
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

export const Users = () => {
  const classes = useStyles();
  const [active, setActive] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await axios.get("/api/users");
        setUsers(user.data.message);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

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

  const toggleActive = async (id, isActive) => {
    try {
      const changeActive = await axios.patch(`/api/user/${id}`, { isActive: !isActive });
      setUsers(users.map((user) => (user._id === id ? { ...user, isActive: !isActive } : user)));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableContainer component={Paper} style={{ overflowX: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell className={classes.tableHeader}>User ID</TableCell>
            <TableCell className={classes.tableHeader}>Name Surname</TableCell>
            <TableCell className={classes.tableHeader}>Email</TableCell>
            <TableCell className={classes.tableHeader}>Phone Number</TableCell>
            <TableCell className={classes.tableHeader}>Adress</TableCell>
            <TableCell className={classes.tableHeader}>Active/Passive</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user._id}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>
                <button
                  className={`${user.isActive === true ? "bg-green-500" : "bg-red-500"} hover:${user.isActive === true ? "bg-green-600" : "bg-red-600"} text-white font-bold py-2 px-4 rounded`}
                  onClick={() => {
                    changeActiveFunction(user._id, user.isActive);
                  }}
                >
                  {user.isActive === true ? "Active" : "Passive"}{" "}
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
