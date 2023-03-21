import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

export const Login = () => {
  const { login, hata } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    const sonuc = await login(email, password);
    console.log(sonuc);
  };
  return (
    <div className="container mt-10 flex flex-col items-center w-3/4 h-[60vh] space-y-5">
      <div className="text-center text-3xl mt-20">LOGİN</div>
      <input
        onChange={(e) => {
          setEmail(e.target.value);
        }}
        className="w-1/2"
        type="text"
      />
      <input
        onChange={(e) => {
          setPassword(e.target.value);
        }}
        className="w-1/2"
        type="text"
      />
      <button onClick={handleSubmit} className="border border-black p-3 rouded-md hover:bg-green-500">
        Gönder
      </button>
      {hata && <div style={{ backgroundColor: "aqua", marginTop: "20px" }}>{hata}</div>}
    </div>
  );
};
