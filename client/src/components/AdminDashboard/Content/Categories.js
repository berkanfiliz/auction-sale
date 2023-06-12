import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import Dropzone from "react-dropzone";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { toast, ToastContainer } from "react-toastify";

const useStyles = makeStyles({
  tableHeader: {
    backgroundColor: "#000",
    color: "#fff",
  },
});

export const Categories = () => {
  const classes = useStyles();

  const [category, setCategory] = useState([]);

  const [fetchCategories, setFetchCategories] = useState([]);
  const [open, setOpen] = useState(false);
  const [image, setImage] = useState("");
  const [hata, setHata] = useState(false);
  const [uploadimage, setUploadimage] = useState(null);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    const getCategories = async () => {
      try {
        const categories = await axios.get("/api/category");
        setFetchCategories(categories.data.category);
      } catch (error) {
        console.log(error);
      }
    };
    getCategories();
  }, []);
  const handleDrop = (acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(acceptedFiles[0]);
    setUploadimage(acceptedFiles[0]);
  };
  const handleClick = (e) => {
    e.preventDefault();
    if (!category) {
      return;
    }
    if (!uploadimage) {
      setHata(true);
      return;
    }
    const addCategory = {
      category: category,
      images: uploadimage,
    };
    const createCategory = async () => {
      try {
        const sendCategory = await axios.post("/api/category", addCategory, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setFetchCategories([...fetchCategories, sendCategory.data.category]);
        setOpen(false);
        toast.success("Kategori başarıyla oluşturuldu.");
        setCategory("");
        setImage("");
        setUploadimage(null);
      } catch (error) {
        console.log(error);
      }
    };
    createCategory();
  };
  const deleteFunction = async (id) => {
    try {
      const deleteCategory = await axios.delete(`/api/category/${id}`);
      setFetchCategories(fetchCategories.filter((category) => category._id !== id));
      toast.success("Kategori başarıyla silindi.");
    } catch (error) {
      toast.error("Silme işlemi başarısız oldu.");
    }
  };
  return (
    <div className="container flex flex-col">
      <button
        onClick={() => {
          setOpen(true);
        }}
        className="bg-red-400 p-3 hover:bg-red-600"
      >
        CREATE CATEGORY
      </button>
      <TableContainer component={Paper} style={{ overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeader}>Kategori ID</TableCell>
              <TableCell className={classes.tableHeader}>Kategori İsim</TableCell>
              <TableCell className={classes.tableHeader}>Kategori İmage</TableCell>
              <TableCell className={classes.tableHeader}>Delete Kategori</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fetchCategories &&
              fetchCategories.map((kategori) => (
                <TableRow key={`${kategori._id}`}>
                  <TableCell>{kategori._id}</TableCell>
                  <TableCell>{kategori.category}</TableCell>
                  <TableCell>{kategori.image_urls && <img className="object-cover w-14 h-14" src={`http://localhost:4000/` + kategori.image_urls[0]} />}</TableCell>
                  <TableCell>
                    <button
                      className="p-2 bg-red-500 mx-auto"
                      onClick={() => {
                        deleteFunction(kategori._id);
                      }}
                    >
                      Delete
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-center items-center space-y-8">
            <div className="flex flex-col justify-center items-center space-y-5">
              <p>Kategori ismi</p>
              <input
                value={category}
                className="text-black p-2 mx-2 border border-black rounded-md"
                type="input"
                onChange={(e) => {
                  setCategory(e.target.value);
                }}
              />
            </div>
            <Dropzone onDrop={handleDrop} accept="image/*">
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()} className="h-[250px] w-[80%] border border-black rounded-sm bg-white">
                  <input {...getInputProps()} />
                  {image ? (
                    <img src={image} alt="selected" style={{ height: "100%", width: "100%" }} />
                  ) : (
                    <div className="text-center mt-10 flex flex-col space-y-4">
                      <i className="fa-solid fa-upload text-[100px]"></i>
                      <p>CHOOSE YOUR IMAGE</p>
                    </div>
                  )}
                </div>
              )}
            </Dropzone>
            {hata && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
                <span className="block sm:inline">RESİM GİRMESİ ZORUNLUDUR</span>
              </div>
            )}
            <button onClick={handleClick} className="bg-green-500 p-3 mt-5">
              Kaydet
            </button>
          </div>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  );
};
