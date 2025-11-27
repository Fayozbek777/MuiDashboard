import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Command,
  Moon,
  Sun,
  Settings,
  HelpCircle,
  LogOut,
  ChevronDown,
  Plus,
  Sparkles,
} from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(true);
  const userName = JSON.parse(localStorage.getItem("user"))?.name || "User";

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="h-16 w-full bg-[#0f0f12]/90 backdrop-blur-2xl border-b border-white/5 flex items-center justify-between px-4 md:px-6 fixed top-0 left-64 right-0 z-50"
    >
      {/* Левая часть — поиск + быстрые действия */}
      <div className="flex items-center gap-4 flex-1 max-w-2xl">
        {/* Global Search (CMD+K) */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-400 hover:bg-white/10 hover:text-white transition-all"
        >
          <Search size={16} />
          <span>Quick search...</span>
          <kbd className="ml-auto flex items-center gap-1 px-2 py-1 bg-white/10 rounded text-xs">
            <Command size={12} />
          </kbd>
        </motion.button>

        {/* Mobile search icon */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="md:hidden p-2 rounded-xl hover:bg-white/10"
        >
          <Search size={18} className="text-gray-400" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          className="relative p-2.5 rounded-xl hover:bg-white/10 transition-all group"
          title="AI Assistant"
        >
          <Sparkles
            size={18}
            className="text-purple-400 group-hover:text-purple-300"
          />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
        </motion.button>
      </div>

      {/* Правая часть — иконки и профиль */}
      <div className="flex items-center gap-3 text-gray-400">
        {/* Theme Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setDarkMode(!darkMode)}
          className="p-2.5 rounded-xl hover:bg-white/10 transition"
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </motion.button>

        {/* Help */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="p-2.5 rounded-xl hover:bg-white/10 transition"
          title="Help & Support"
        >
          <HelpCircle size={18} />
        </motion.button>

        {/* Notifications */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="relative p-2.5 rounded-xl hover:bg-white/10 transition"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
        </motion.button>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          className="hidden sm:block p-2.5 rounded-xl hover:bg-white/10 transition"
        >
          <Settings size={18} />
        </motion.button>
        <div className="flex items-center gap-3 pl-3 border-l border-white/10">
          <div className="hidden lg:block text-right">
            <p className="text-xs text-gray-500">Welcome back</p>
            <p className="text-sm font-medium text-white capitalize">
              {userName}
            </p>
          </div>
          <div className="relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 p-0.5 cursor-pointer"
            >
              <div className="w-full h-full rounded-xl bg-[#0f0f12] flex items-center justify-center text-white font-bold text-sm">
                {userName.charAt(0).toUpperCase()}
              </div>
            </motion.div>

            {/* Dropdown Arrow */}
            <ChevronDown
              size={14}
              className="absolute -bottom-1 -right-1 text-white bg-[#0f0f12] rounded-full p-0.5"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Navbar;
