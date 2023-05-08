import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { NoPage } from "./pages/NoPage";
import { Header } from "./components/Header/Header.js";
import { Navbar } from "./components/Navbar/Navbar";
import { LoginPage } from "./pages/Login";
import { useAuthContext } from "./hooks/useAuthContext";
import { CategoryRoomPage } from "./pages/CategoryRoom";
import { RegisterPage } from "./pages/Register";
import { ContentPage } from "./pages/Content";
import { IhaleRoomPage } from "./pages/IhaleRoom";
import { AllProductPage } from "./pages/AllProduct";
import { CreatePage } from "./pages/Create";
import { ProfilePage } from "./pages/Profile";
import { ChatRoom } from "./pages/ChatRoom";
import { AdminDashboard } from "./pages/AdminDashboard";

export default function App() {
  const { user } = useAuthContext();

  return (
    <div className="App bg-color">
      <BrowserRouter>
        {window.location.pathname !== "/admin" && (
          <>
            <Header />
            <Navbar />
          </>
        )}
        <div className="pages">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
            <Route path="/allproducts" element={<AllProductPage />} />
            <Route path="/kategori/:nesne" element={<CategoryRoomPage />} />
            <Route path="/kategori/:nesne/:id" element={<ContentPage />} />
            <Route path="/room/:id" element={user ? <IhaleRoomPage /> : <Navigate to="/login" />} />
            <Route path="/create" element={user ? <CreatePage /> : <Navigate to="/login" />} />
            <Route path="/profile" element={user ? <ProfilePage /> : <Navigate to="/login" />} />
            <Route path="/chat/:id" element={user ? <ChatRoom /> : <Navigate to="/login" />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}
