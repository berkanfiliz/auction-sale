import { useState } from "react";
import Dropzone from "react-dropzone";
import { FiUpload } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { useLogin } from "../hooks/useLogin";

export const RegisterPage = () => {
  const { login } = useLogin();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    phone: "",
    address: "",
  });
  const [image, setImage] = useState("");
  const [uploadImage, setUploadImage] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!uploadImage) {
        toast.error("Resim yüklemelisiniz!!!");
        return;
      }
      if (formData.password !== formData.passwordConfirm) {
        toast.error("Parolalar eşleşmiyor!!!");
        return;
      }
      if (formData.phone.length !== 11) {
        toast.error("Telefon numarası 11 haneli olmalıdır!!!");
        return;
      }

      const data = new FormData();
      data.append("name", formData.name);
      data.append("email", formData.email);
      data.append("password", formData.password);
      data.append("passwordConfirm", formData.passwordConfirm);
      data.append("phoneNumber", formData.phone);
      data.append("address", formData.address);
      data.append("images", uploadImage);

      const response = await axios.post("/api/signup", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Kullanıcı oluşturulma başarılı!");
      await login(formData.email, formData.password);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleDrop = (acceptedFiles) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setImage(fileReader.result);
    };
    fileReader.readAsDataURL(acceptedFiles[0]);
    setUploadImage(acceptedFiles[0]);
  };

  return (
    <div className="h-[86vh] bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="flex justify-center border shadow-md">
        <Dropzone onDrop={handleDrop} accept="image/*">
          {({ getRootProps, getInputProps }) => (
            <div {...getRootProps()} className="h-[510px] w-[420px] flex items-center justify-around">
              <input {...getInputProps()} />
              {image ? (
                <img src={image} alt="selected" style={{ height: "100%", width: "100%" }} />
              ) : (
                <div className="text-dark p-5 text-center">
                  <span style={{ display: "inline-block", width: "100%", height: "100%" }}>
                    <FiUpload style={{ width: "100%", height: "100px" }} />
                  </span>
                </div>
              )}
            </div>
          )}
        </Dropzone>
        <div className="py-8 px-4 sm:px-10">
          <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Register</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex space-x-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <div className="mt-1">
                  <input id="name" name="name" type="text" autoComplete="name" required value={formData.name} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
            </div>
            <div className="flex space-x-6">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input id="password" name="password" type="password" autoComplete="current-password" required value={formData.password} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>

              <div>
                <label htmlFor="passwordConfirm" className="block text-sm font-medium text-gray-700">
                  Confirm password
                </label>
                <div className="mt-1">
                  <input id="passwordConfirm" name="passwordConfirm" type="password" autoComplete="current-password" required value={formData.passwordConfirm} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone number
              </label>
              <div className="mt-1">
                <input id="phone" name="phone" type="number" autoComplete="tel" required value={formData.phone} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <div className="mt-1">
                <textarea id="address" name="address" rows="3" required value={formData.address} onChange={handleChange} className="appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"></textarea>
              </div>
            </div>

            <div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
