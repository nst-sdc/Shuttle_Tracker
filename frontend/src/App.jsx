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
import { Navigate } from "react-router-dom";

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles, userType }) => {
  if (!userType) {
    return <Navigate to="/login" replace />;
  }
  if (allowedRoles && !allowedRoles.includes(userType)) {
    return <Navigate to={userType === "driver" ? "/driver" : "/"} replace />;
  }
  return children;
};

function App() {
  const [userType, _setUserType] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

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
    setAuthLoading(false);
  }, [setUserType]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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
                <ProtectedRoute userType={userType} allowedRoles={["student"]}>
                  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <Student />
                  </div>
                </ProtectedRoute>
              }
            />
            <Route
              path="/driver"
              element={
                <ProtectedRoute userType={userType} allowedRoles={["driver"]}>
                  <Driver setUserType={setUserType} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/track-shuttle"
              element={
                userType === "driver" ? (
                  <Navigate to="/driver" replace />
                ) : (
                  <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                    <TrackShuttle />
                  </div>
                )
              }
            />
            <Route
              path="/login"
              element={
                userType ? (
                  <Navigate
                    to={userType === "driver" ? "/driver" : "/"}
                    replace
                  />
                ) : (
                  <Login setUserType={setUserType} />
                )
              }
            />
            <Route
              path="/signup"
              element={
                userType ? (
                  <Navigate
                    to={userType === "driver" ? "/driver" : "/"}
                    replace
                  />
                ) : (
                  <Signup setUserType={setUserType} />
                )
              }
            />
          </Routes>
        </main>

        <Footer userType={userType} />
      </div>
    </Router>
  );
}

export default App;
