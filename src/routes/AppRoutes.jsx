import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
// import Dashboard from "../pages/Dashboard";
// import Search from "../pages/Search";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      {/*<Route path="/dashboard" element={<Dashboard />} />
      <Route path="/search" element={<Search />} /> */}
    </Routes>
  );
}
