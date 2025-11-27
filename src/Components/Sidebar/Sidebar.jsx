import React from "react";
import { motion } from "framer-motion";
import { Users, User, LogOut, Home, Settings, BarChart3 } from "lucide-react";

const Sidebar = ({ setActivePage, activePage }) => {
  const userName = JSON.parse(localStorage.getItem("user"))?.name || "User";

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: <Home size={20} /> },
    { id: "users", name: "Users", icon: <Users size={20} /> },
    { id: "profile", name: "Profile", icon: <User size={20} /> },
    { id: "analytics", name: "Analytics", icon: <BarChart3 size={20} /> },
    { id: "settings", name: "Settings", icon: <Settings size={20} /> },
  ];

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="w-64 bg-[#0d0d11]/90 backdrop-blur-2xl h-screen fixed left-0 top-0 border-r border-white/5 flex flex-col">
      {/* Logo + User */}
      <div className="p-6 border-b border-white/5">
        <h1 className="text-2xl font-bold text-white tracking-tighter">LOGO</h1>

        <div className="mt-6 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white font-medium text-sm border border-white/10">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-xs text-gray-500">Logged in as</p>
            <p className="text-sm font-medium text-white capitalize">
              {userName}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <motion.button
              key={item.id}
              whileHover={{ x: 6 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setActivePage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all duration-200 group
                ${
                  activePage === item.id
                    ? "bg-white/10 text-white shadow-lg border border-white/20"
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                }`}
            >
              <span
                className={
                  activePage === item.id
                    ? "text-white"
                    : "group-hover:text-white"
                }
              >
                {item.icon}
              </span>
              <span className="font-medium">{item.name}</span>
            </motion.button>
          ))}
        </div>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-white/5">
        <motion.button
          whileHover={{ x: 6, backgroundColor: "rgba(239, 68, 68, 0.1)" }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-400 hover:text-red-300 transition-all duration-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </motion.button>
      </div>
    </div>
  );
};

export default Sidebar;
