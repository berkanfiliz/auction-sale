import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { NoPage } from "./pages/NoPage";
import { Header } from "./components/Header/Header.js";
import { Navbar } from "./components/Navbar/Navbar";
import { LoginPage } from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import { CategoryPage } from "./pages/Category";
import { RegisterPage } from "./pages/Register";

export default function App() {
  //const path = `/kategori/:nesne`;
  const { user } = useAuthContext();

  return (
    <div className="App" style={{ backgroundColor: "#f2e9e4", height: "1500px" }}>
      <BrowserRouter>
        <Header />
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
            <Route path="/kategori/:nesne" element={<CategoryPage />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
