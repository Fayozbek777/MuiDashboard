import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "../Components/Sidebar/Sidebar";
import Navbar from "../Components/Navbar/Navbar";
import Users from "../Pages/Users";
import Profile from "../Pages/Profile";

const Layout = () => {
  const [activePage, setActivePage] = useState("dashboard");
  const pageComponents = {
    dashboard: (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="space-y-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-white">Welcome back 👋</h1>
          <p className="text-gray-400 mt-3 text-lg">
            Here's what's happening with your projects today.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              label: "Total Users",
              value: "12,483",
              change: "+12%",
              color: "from-blue-600 to-cyan-600",
            },
            {
              label: "Revenue",
              value: "$48,291",
              change: "+23%",
              color: "from-green-600 to-emerald-600",
            },
            {
              label: "Growth",
              value: "37%",
              change: "+5%",
              color: "from-orange-600 to-red-600",
            },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl hover:bg-white/8 transition-all"
            >
              <p className="text-gray-400 text-sm">{stat.label}</p>
              <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-green-400 text-sm font-medium">
                  {stat.change}
                </span>
                <div
                  className={`w-full h-2 bg-white/10 rounded-full overflow-hidden`}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "70%" }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`h-full bg-gradient-to-r ${stat.color}`}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    ),
    users: <Users />,
    profile: <Profile />,
  };

  return (
    <div className="bg-[#08080a] min-h-screen text-white flex">
      {/* Sidebar */}
      <Sidebar activePage={activePage} setActivePage={setActivePage} />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 p-6 pt-20 md:p-8 md:pt-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {pageComponents[activePage] || (
                <div className="text-center py-20">
                  <h2 className="text-2xl text-gray-400">
                    Страница в разработке...
                  </h2>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Layout;
