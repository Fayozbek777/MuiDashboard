import React, { useState } from "react";
import { motion } from "framer-motion";
import { useGetUsersQuery } from "../app/features/apiSlice";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Globe,
  Lock,
  UserCheck,
  Cake,
  Hash,
  ChevronLeft,
  ChevronRight,
  Search,
  MoreVertical,
  BadgeCheck,
  Clock,
  Users as UsersIcon,
} from "lucide-react";

const Users = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isLoading, isError } = useGetUsersQuery(page);
  const users = data?.data?.data || [];

  const filteredUsers = users.filter((user) =>
    `${user.name.first} ${user.name.last} ${user.email} ${user.login.username} ${user.location.city}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("ru-RU", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <UsersIcon size={32} />
            Пользователи
          </h1>
          <p className="text-gray-400 mt-1">
            Всего:{" "}
            <span className="text-white font-semibold">
              {data?.data?.total || 0}
            </span>{" "}
            | На странице:{" "}
            <span className="text-white font-semibold">{users.length}</span>
          </p>
        </div>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
          />
          <input
            type="text"
            placeholder="Поиск по имени, email, username..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition w-72"
          />
        </div>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center py-32">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-14 h-14 border-4 border-white/20 border-t-white rounded-full"
          />
        </div>
      )}
      {isError && (
        <div className="text-center py-20">
          <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <UserCheck size={40} className="text-red-400" />
          </div>
          <p className="text-red-400 text-xl">Ошибка загрузки данных</p>
        </div>
      )}
      {!isLoading && !isError && filteredUsers.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          <UsersIcon size={64} className="mx-auto mb-4 opacity-30" />
          <p className="text-xl">Пользователи не найдены</p>
        </div>
      )}
      {!isLoading && !isError && filteredUsers.length > 0 && (
        <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="text-left p-5 text-gray-400 font-medium">
                    Пользователь
                  </th>
                  <th className="text-left p-5 text-gray-400 font-medium">
                    Контакты
                  </th>
                  <th className="text-left p-5 text-gray-400 font-medium">
                    Адрес
                  </th>
                  <th className="text-left p-5 text-gray-400 font-medium">
                    Логин / ID
                  </th>
                  <th className="text-left p-5 text-gray-400 font-medium">
                    Даты
                  </th>
                  <th className="text-left p-5 text-gray-400 font-medium">
                    Доп. инфо
                  </th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user, i) => (
                  <motion.tr
                    key={user.login.uuid}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-all"
                  >
                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={user.picture.large}
                            alt={user.name.first}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10"
                          />
                          <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-[#08080a]" />
                        </div>
                        <div>
                          <p className="text-white font-semibold">
                            {user.name.title} {user.name.first} {user.name.last}
                          </p>
                          <p className="text-xs text-gray-500">
                            @{user.login.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-300">
                          <Mail size={14} />{" "}
                          <span className="truncate max-w-48">
                            {user.email}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Phone size={14} /> {user.phone}
                        </div>
                        {user.cell && (
                          <div className="flex items-center gap-2 text-gray-500 text-xs">
                            <Phone size={12} /> {user.cell}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="p-5 text-sm">
                      <div className="flex items-start gap-2 text-gray-400">
                        <MapPin size={16} />
                        <div>
                          <p>
                            {user.location.street.number}{" "}
                            {user.location.street.name}
                          </p>
                          <p>
                            {user.location.city}, {user.location.state}
                          </p>
                          <p className="text-xs text-gray-500">
                            {user.location.postcode} • {user.location.country}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-xs font-mono">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Lock size={12} /> {user.login.uuid.slice(0, 8)}...
                        </div>
                        <div className="text-gray-500">
                          {user.login.password.slice(0, 10)}...
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-gray-400">
                          <Calendar size={14} />
                          <div>
                            <p className="text-xs text-gray-500">Регистрация</p>
                            <p className="text-white">
                              {formatDate(user.registered.date)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-gray-400">
                          <Cake size={14} />
                          <div>
                            <p className="text-xs text-gray-500">ДР</p>
                            <p className="text-white">
                              {formatDate(user.dob.date)}
                            </p>
                            <p className="text-xs text-gray-600">
                              ({user.dob.age} лет)
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-5 text-sm">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Globe size={14} className="text-gray-500" />
                          <span className="text-gray-300">{user.nat}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <BadgeCheck size={14} className="text-green-400" />
                          <span className="text-green-400 text-xs font-medium">
                            Активен
                          </span>
                        </div>
                        <div className="text-xs text-gray-500">
                          <Clock size={12} /> {user.registered.age} дней назад
                        </div>
                      </div>
                    </td>
                    <td className="p-5">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="p-2 rounded-lg hover:bg-white/10"
                      >
                        <MoreVertical size={16} className="text-gray-500" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 bg-white/5">
            <p className="text-sm text-gray-500">
              Показано {filteredUsers.length} из {data?.data?.total || 0}
            </p>
            <div className="flex items-center gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="p-3 rounded-xl bg-white/10 disabled:bg-white/5 disabled:text-gray-600 hover:bg-white/20 transition"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <span className="px-4 py-2 bg-white/10 rounded-lg text-white font-medium">
                {page}
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPage((p) => p + 1)}
                className="p-3 rounded-xl bg-white/10 hover:bg-white/20 transition"
              >
                <ChevronRight size={18} />
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Users;
