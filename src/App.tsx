import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/home";
import Login from "@/pages/login/login";
import SignUp from "@/pages/signup/signup";
import Logout from "@/pages/logout";
import Detail from "./pages/details/detail";
import Users from "./pages/admin/user/users";
import DashboardMetrics from "./pages/admin/metrics/metrics";
import Profile from "./pages/profile/profile";
import Favourites from "./pages/favourites/favourites";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:recipe_id" element={<Detail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favourites" element={<Favourites />} />

      <Route path="/dashboard" element={<DashboardMetrics />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
}

export default App;
