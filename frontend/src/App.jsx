import React, { useState, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Student from "./pages/Student";
import Driver from "./pages/Driver";
import TrackShuttle from "./pages/TrackShuttle";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Footer from "./components/Footer";

function App() {
  const [userType, _setUserType] = useState(null);

  // Helper to update both state and localStorage
  const setUserType = useCallback((type) => {
    _setUserType(type);
    if (type) {
      localStorage.setItem("user_type", type);
    } else {
      localStorage.removeItem("user_type");
    }
  }, []);

  useEffect(() => {
    const driverToken = localStorage.getItem("jwt_token");
    const driverUser = localStorage.getItem("driver_user");
    if (driverToken && driverUser) {
      setUserType("driver");
      return;
    }
    const storedType = localStorage.getItem("user_type");
    if (storedType) {
      setUserType(storedType);
    }
  }, [setUserType]);

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full bg-background transition-colors duration-200 overflow-x-hidden">
        <div className="fixed inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />

        <Navbar userType={userType} setUserType={setUserType} />

        <main className="relative w-full flex-grow pt-20">
          <Routes>
            <Route
              path="/"
              element={<Home userType={userType} setUserType={setUserType} />}
            />
            <Route
              path="/student"
              element={
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                  <Student setUserType={setUserType} />
                </div>
              }
            />
            <Route
              path="/driver"
              element={
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                  <Driver setUserType={setUserType} />
                </div>
              }
            />
            <Route
              path="/track-shuttle"
              element={
                <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                  <TrackShuttle />
                </div>
              }
            />
            <Route
              path="/login"
              element={<Login setUserType={setUserType} />}
            />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>

        <Footer userType={userType} />
      </div>
    </Router>
  );
}

export default App;
