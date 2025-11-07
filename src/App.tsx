import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home";
import Login from "@/pages/login/login";
import SignUp from "@/pages/signup/signup";
import Logout from "@/pages/logout";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
