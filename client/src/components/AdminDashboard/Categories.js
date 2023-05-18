import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal } from "@mui/material";
import Dropzone from "react-dropzone";

export const Categories = () => {
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
        const category = await axios.get("/api/category");
        setFetchCategories(category.data.category);
        console.log("Categories ", category.data.category);
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
  };

  return (
    <div className="container mt-20">
      <div className="flex flex-col items-center">
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-2 py-2">Kategori ID</th>
              <th className="px-2 py-2">Kategori İsim</th>
              <th className="px-4 py-2">Kategori İmage</th>
              <th className="px-2 py-2">Update Kategori</th>
              <th className="px-2 py-2">Delete Kategori</th>
            </tr>
          </thead>
          <tbody>
            {fetchCategories &&
              fetchCategories.map((kategori) => (
                <tr>
                  <td className="border px-2 py-2">{kategori._id}</td>
                  <td className="border px-2 py-2">{kategori.category}</td>
                  <td className="border px-4 py-2">Kategori image</td>
                  <td className="border px-2 py-2">
                    <button className="p-2 bg-green-400">Update</button>
                  </td>
                  <td className="border px-4 py-2">
                    <button className="p-2 bg-red-500 mx-auto">Delete</button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <button onClick={() => setOpen(true)} className="bg-red-400 p-3 hover:bg-red-600 absolute top-0 left-24">
        CREATE CATEGORY
      </button>
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
    </div>
  );
};
