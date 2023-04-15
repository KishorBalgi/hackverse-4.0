import "./App.css";
import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./Components/Authenticate/signup";
import SignIn from "./Components/Authenticate/signin";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import OTP from "./Components/Authenticate/otp";
import UserCart from "./Components/Cart/userCart";
import { useUser } from "./Context/userContext";
import api from "./Config";
import AddProduct from "./Pages/addProduct";
import DashboardPage from "./Pages/dashboard";

const App = () => {
  const { user, setUser } = useUser();

  useEffect(() => {
    api.get("/api/auth/isLoggedIn").then((res) => {
      setUser(res.data.user);
    });
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/otp/:phoneno" element={<OTP />} />
        <Route path="/cart" element={<UserCart />} />
        <Route path="/addproduct" element={<AddProduct/>}/>
        <Route path="/dashboard" element={<DashboardPage/>}/>
      </Routes>
      <Footer />
    </>
  );
};

export default App;
