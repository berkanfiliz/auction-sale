import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import resimsiz from "../../assets/resimsiz.jpeg";

const customStyles = {
  content: {
    top: "58%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "50%",
    height: "80%",
    transform: "translate(-50%, -50%)",
  },
};

export const AccountInformation = ({ userAccount }) => {
  const [user, setUser] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState([]);
  const [userInformation, setUserInformation] = useState({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });
  const [error, setError] = useState({
    nameError: false,
    emailError: false,
    addressError: false,
    phoneNumberError: false,
  });

  useEffect(() => {
    setUser(userAccount);
    console.log("Account", userAccount);
    setImageUrl(userAccount.image_urls);
  }, [userAccount]);

  const handleOpenModal = () => {
    setModalIsOpen(true);
    setUserInformation({
      name: user.name,
      email: user.email,
      address: user.address,
      phoneNumber: user.phoneNumber,
    });
  };

  const handleCloseModal = () => {
    setError({
      nameError: false,
      emailError: false,
      addressError: false,
      phoneNumberError: false,
    });
    setModalIsOpen(false);
  };

  const handleSaveChanges = async () => {
    if (userInformation.name && userInformation.email && userInformation.address && userInformation.phoneNumber) {
      const response = await axios.patch(`/api/user/${user._id}`, userInformation);
      setModalIsOpen(false);
      setUser(response.data.message);
      console.log(response.data);
    } else {
      setError({
        nameError: !userInformation.name,
        emailError: !userInformation.email,
        addressError: !userInformation.address,
        phoneNumberError: !userInformation.phoneNumber,
      });
    }
  };

  return (
    <div className="container mx-auto font-serif">
      <div className="grid grid-cols-2 gap-4">
        <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl mb-4">Hesap Bilgileri</h1>
          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-bold">Name:</span> {user.name}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-bold">Email:</span> {user.email}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-bold">Address:</span> {user.address}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-gray-700">
              <span className="font-bold">Phone Number:</span> +90{user.phoneNumber}
            </p>
          </div>
          <button className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleOpenModal}>
            Update
          </button>
        </div>
        <div className="flex justify-center items-center ">{userAccount.image_urls && userAccount.image_urls.length > 0 ? <img src={`http://localhost:4000/` + userAccount.image_urls[0]} alt="user" className="rounded-full w-80 h-80" /> : <img src={resimsiz} className="rounded-full w-80 h-80" />}</div>
      </div>

      <Modal isOpen={modalIsOpen} onRequestClose={handleCloseModal} style={customStyles}>
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-16">
          <h2 className="text-2xl mb-4">Update Information</h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Name:</label>
            <input type="text" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.nameError ? "border-red-500" : ""}`} placeholder="Name" value={userInformation.name} onChange={(e) => setUserInformation({ ...userInformation, name: e.target.value })} />
            {error.nameError && <p className="text-red-500 text-sm">Lütfen adınızı giriniz</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Email:</label>
            <input type="text" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.emailError ? "border-red-500" : ""}`} placeholder="Email" value={userInformation.email} onChange={(e) => setUserInformation({ ...userInformation, email: e.target.value })} />
            {error.emailError && <p className="text-red-500 text-sm">Lütfen emailinizi giriniz.</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Address:</label>
            <input type="text" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.addressError ? "border-red-500" : ""}`} placeholder="Address" value={userInformation.address} onChange={(e) => setUserInformation({ ...userInformation, address: e.target.value })} />
            {error.addressError && <p className="text-red-500 text-sm">Lütfen adresinizi giriniz.</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Phone Number:</label>
            <input type="text" className={`appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${error.phoneNumberError ? "border-red-500" : ""}`} placeholder="Phone Number" value={userInformation.phoneNumber} onChange={(e) => setUserInformation({ ...userInformation, phoneNumber: e.target.value })} />
            {error.phoneNumberError && <p className="text-red-500 text-sm">Lütfen telefon numaranızı giriniz.</p>}
          </div>
          <div className="flex justify-end">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleSaveChanges}>
              Save
            </button>
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded" onClick={handleCloseModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
