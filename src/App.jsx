import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import { AuthContextprovider } from "./context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";


const App = () => {
  return (
    <>
      <AuthContextprovider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        
          <Route
            path="/Profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextprovider>
    </>
  );
};

export default App;
