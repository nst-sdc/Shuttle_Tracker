import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { User, Car, Clock, MapPin, Shield } from "lucide-react";

function Home({ userType, setUserType }) {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    navigate(`/${role}`, { state: { role } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="min-h-[calc(100vh-80px)] w-full flex flex-col justify-center relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container mx-auto px-4 z-10 flex flex-col items-center text-center max-w-5xl"
      >
        <motion.div variants={itemVariants} className="mb-6">
          <span className="px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10 text-primary text-sm font-medium">
            Real-time Campus Mobility
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
        >
          Track Your Campus <br />
          <span className="text-gradient">Shuttle in Real-Time</span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-xl text-muted-foreground max-w-2xl mb-12"
        >
          Experience seamless campus commute with our advanced tracking system.
          Catch your ride on time, every time.
        </motion.p>

        {!userType && (
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect("student")}
              className="group cursor-pointer rounded-3xl p-8 bg-card border border-border hover:border-primary/50 transition-all duration-300 shadow-lg hover:shadow-primary/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">I am a Student</h3>
                <p className="text-sm text-muted-foreground">
                  Track shuttles & plan your commute
                </p>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleRoleSelect("driver")}
              className="group cursor-pointer rounded-3xl p-8 bg-card border border-border hover:border-secondary/50 transition-all duration-300 shadow-lg hover:shadow-secondary/10 relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex flex-col items-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Car className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">I am a Driver</h3>
                <p className="text-sm text-muted-foreground">
                  Manage routes & share location
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Features Preview */}
        <motion.div
          variants={itemVariants}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 w-full border-t border-border pt-12"
        >
          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-primary/10 rounded-xl mb-4 text-primary">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Real-Time Updates</h4>
            <p className="text-sm text-muted-foreground">
              Live location tracking with zero latency.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-secondary/10 rounded-xl mb-4 text-secondary">
              <MapPin className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Route Optimization</h4>
            <p className="text-sm text-muted-foreground">
              Smart routing for efficient travel.
            </p>
          </div>
          <div className="flex flex-col items-center p-4">
            <div className="p-3 bg-accent/10 rounded-xl mb-4 text-accent">
              <Shield className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-semibold mb-2">Secure Access</h4>
            <p className="text-sm text-muted-foreground">
              Verified users only for campus safety.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default Home;
