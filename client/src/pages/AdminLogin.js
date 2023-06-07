import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Icon } from "react-icons-kit";
import { eye } from "react-icons-kit/feather/eye";
import { eyeOff } from "react-icons-kit/feather/eyeOff";
import axios from "axios";

export const Login = () => {
  const { login } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hata, setHata] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Deneme");
    } catch (error) {}
  };
  return (
    <section className="min-h-[85vh] bg-gray-100 flex justify-center items-center">
      <div className="w-full max-w-md px-6 py-16 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">Giriş Yap</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="text-gray-700 font-bold block mb-2">
              Email:
            </label>
            <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" id="email" onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-700 font-bold block mb-2">
              Parola:
            </label>
            <div className="relative">
              <input className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type={showPassword ? "text" : "password"} id="password" onChange={(e) => setPassword(e.target.value)} required />
              <button type="button" className="absolute right-0 top-0 mt-2 mr-3" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <Icon icon={eye} /> : <Icon icon={eyeOff} />}
              </button>
            </div>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
            Giriş Yap
          </button>
          {hata && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative" role="alert">
              <span className="block sm:inline">{hata}</span>
            </div>
          )}
        </form>
      </div>
    </section>
  );
};
