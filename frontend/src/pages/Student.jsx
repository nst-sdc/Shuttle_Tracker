import React from "react";
import { useNavigate } from "react-router-dom";
import TrackShuttle from "./TrackShuttle";
import { LogOut } from "lucide-react";
import { motion } from "framer-motion";

function Student({ setUserType }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (setUserType) setUserType(null);
    navigate("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col h-full"
    >
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Student Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, Student</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 bg-destructive/10 text-destructive hover:bg-destructive/20 rounded-lg transition-colors font-medium"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="flex-1">
        <TrackShuttle />
      </div>
    </motion.div>
  );
}

export default Student;
