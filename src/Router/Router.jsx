import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Auth/Login";
import Layout from "../Pages/Layout";
import Users from "../Pages/Users";
import Profile from "../Pages/Profile";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/layoutpage" element={<Layout />} />
        <Route path="/userspage" element={<Users />} />
        <Route path="/userprofile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Router;
