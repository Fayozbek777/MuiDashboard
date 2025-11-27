import React from "react";
import { motion } from "framer-motion";

const Loader = ({ size = "md", fullScreen = false }) => {
  const sizes = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
    xl: "w-20 h-20",
  };

  const containerClasses = fullScreen
    ? "fixed inset-0 z-50 flex items-center justify-center bg-[#08080a]/90 backdrop-blur-md"
    : "flex items-center justify-center py-20";

  return (
    <div className={containerClasses}>
      <div className="relative">
        {/* Главный спиннер с градиентом */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`${sizes[size]} rounded-full border-4 border-white/10 border-t-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-1`}
        >
          <div className="w-full h-full rounded-full bg-[#08080a]/80 backdrop-blur-sm" />
        </motion.div>

        {/* Внутренний пульсирующий круг */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.6, 1, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-xl"
        />

        {/* Центральная точка */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-3 h-3 bg-white rounded-full shadow-lg shadow-white/50"
          />
        </div>

        {/* Плавающие частицы (2025 тренд) */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-white/60 rounded-full"
            initial={{ x: 0, y: 0 }}
            animate={{
              x: [0, Math.cos(i * 1.2) * 60, 0],
              y: [0, Math.sin(i * 1.2) * 60, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
            style={{
              top: "50%",
              left: "50%",
            }}
          />
        ))}
      </div>

      {/* Подпись (опционально) */}
      {fullScreen && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-32 text-gray-400 text-sm tracking-wider"
        >
          Загрузка интерфейса...
        </motion.p>
      )}
    </div>
  );
};

export default Loader;
