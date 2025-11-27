import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { User, Lock } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    if (!name || !password) {
      toast.error("Заполните все поля");
      return;
    }

    localStorage.setItem(
      "user",
      JSON.stringify({ name, password, loggedIn: true })
    );
    toast.success("Добро пожаловать");
    setTimeout(() => navigate("/layoutpage"), 600);
  };

  return (
    <div className="min-h-screen bg-[#08080a] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="bg-[#0f0f12]/80 backdrop-blur-2xl rounded-3xl border border-white/5 shadow-2xl p-8 md:p-10">
          {/* Заголовок */}
          <div className="text-center mb-10">
            <h1 className="text-3xl font-light text-white">Вход</h1>
            <p className="text-gray-500 mt-2 text-sm">
              Введите данные для продолжения
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-7">
            {/* Username */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Имя пользователя
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="username"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Пароль
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                  <Lock size={20} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all duration-200"
                />
              </div>
            </div>

            {/* Remember + Forgot */}
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2 text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded bg-white/10 border-white/20 text-white"
                />
                Запомнить
              </label>
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-300 transition"
              >
                Забыли пароль?
              </Link>
            </div>

            {/* Кнопка */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full mt-8 py-4 bg-white text-[#08080a] font-medium rounded-2xl hover:bg-gray-200 transition-all duration-200 shadow-lg"
            >
              Войти
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-8">
            Нет аккаунта?{" "}
            <Link to="/" className="font-medium text-white hover:underline">
              Зарегистрироваться
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
