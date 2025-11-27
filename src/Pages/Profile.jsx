import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Save,
  X,
  Camera,
  Shield,
  Globe,
  Clock,
  Check,
  AlertCircle,
  Upload,
} from "lucide-react";
import toast from "react-hot-toast";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    timezone: "UTC+3 (Moscow Time)",
    bio: "",
  });

  // Загружаем данные из localStorage при монтировании
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser?.name) {
      setFormData({
        name: savedUser.name,
        email: savedUser.email || "user@example.com",
        phone: savedUser.phone || "+7 (999) 123-45-67",
        location: savedUser.location || "Москва, Россия",
        timezone: savedUser.timezone || "UTC+3 (Moscow Time)",
        bio: savedUser.bio || "Администратор системы",
      });
    } else {
      // Дефолтные значения
      setFormData((prev) => ({
        ...prev,
        name: "Алексей Иванов",
        email: "alex@example.com",
        phone: "+7 (999) 123-45-67",
        location: "Москва, Россия",
      }));
    }
  }, []);

  const handleSave = () => {
    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Имя и email обязательны!");
      return;
    }

    localStorage.setItem("user", JSON.stringify(formData));
    toast.success("Профиль успешно обновлён!", {
      icon: "Success",
      style: { background: "#1a1a2e", color: "#fff" },
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Сброс до актуальных данных
    const saved = JSON.parse(localStorage.getItem("user"));
    if (saved) setFormData({ ...saved });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <User size={36} />
            Профиль
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            Управление личными данными и настройками аккаунта
          </p>
        </div>

        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-3 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all"
          >
            <Edit3 size={20} />
            Редактировать профиль
          </motion.button>
        ) : (
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCancel}
              className="flex items-center gap-2 px-5 py-3 bg-white/5 border border-white/10 text-gray-300 rounded-xl hover:bg-white/10 transition"
            >
              <X size={18} />
              Отмена
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-xl shadow-lg hover:shadow-green-500/30 transition-all"
            >
              <Save size={20} />
              Сохранить
            </motion.button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая колонка — аватар и статус */}
        <div className="space-y-6">
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 text-center backdrop-blur-xl"
          >
            <div className="relative inline-block group">
              <div className="w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1">
                <div className="w-full h-full rounded-full bg-[#08080a] flex items-center justify-center text-5xl font-bold text-white">
                  {formData.name.charAt(0).toUpperCase()}
                </div>
              </div>

              {isEditing && (
                <motion.label
                  whileHover={{ scale: 1.15 }}
                  className="absolute bottom-2 right-2 w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center cursor-pointer border-2 border-white/30 shadow-xl group-hover:bg-white/30 transition-all"
                >
                  <Upload size={22} className="text-white" />
                  <input type="file" accept="image/*" className="hidden" />
                </motion.label>
              )}

              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-[#08080a] animate-pulse" />
            </div>

            <h2 className="text-3xl font-bold text-white mt-8">
              {formData.name}
            </h2>
            <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
              <Shield size={18} className="text-blue-400" />
              <span className="font-medium">Администратор</span>
            </p>

            <div className="mt-8 pt-8 border-t border-white/10">
              <p className="text-sm text-gray-500">Присоединился</p>
              <p className="text-white font-medium flex items-center justify-center gap-2 mt-2">
                <Calendar size={18} />
                15 марта 2024
              </p>
            </div>

            <div className="mt-6 flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
              <span className="text-green-400 font-medium">Онлайн</span>
            </div>
          </motion.div>
        </div>

        {/* Правая колонка — редактируемые поля */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-2xl font-semibold text-white mb-8 flex items-center gap-3">
              <User size={28} />
              Личная информация
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <User size={16} />
                  Полное имя
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition"
                    placeholder="Иван Иванов"
                  />
                ) : (
                  <p className="text-white font-medium text-lg">
                    {formData.name}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Mail size={16} />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition"
                  />
                ) : (
                  <p className="text-white font-medium text-lg">
                    {formData.email}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Phone size={16} />
                  Телефон
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition"
                  />
                ) : (
                  <p className="text-white font-medium text-lg">
                    {formData.phone}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <MapPin size={16} />
                  Город
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition"
                  />
                ) : (
                  <p className="text-white font-medium text-lg">
                    {formData.location}
                  </p>
                )}
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Clock size={16} />
                  Часовой пояс
                </label>
                <p className="text-white font-medium text-lg">
                  {formData.timezone}
                </p>
              </div>

              <div>
                <label className="text-sm text-gray-400 flex items-center gap-2 mb-2">
                  <Globe size={16} />
                  Язык интерфейса
                </label>
                <p className="text-white font-medium text-lg">Русский</p>
              </div>
            </div>

            {isEditing && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 pt-8 border-t border-white/10"
              >
                <label className="text-sm text-gray-400 mb-3 block">
                  О себе
                </label>
                <textarea
                  rows={4}
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-white/30 transition resize-none"
                  placeholder="Расскажите немного о себе..."
                />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Profile;
