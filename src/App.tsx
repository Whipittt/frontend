import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "@/pages/home/home";
import Login from "@/pages/login/login";
import SignUp from "@/pages/signup/signup";
import Logout from "@/pages/logout";
import RecipeDetails from "./pages/recipeDetails/detail";
import Users from "./pages/admin/user/users";
import DashboardMetrics from "./pages/admin/metrics/metrics";
import Profile from "./pages/profile/profile";
import Favourites from "./pages/favourites/favourites";
import SearchResults from "./pages/searchResults";
import CreateMealPaln from "./pages/mealplan/mealplan";
import UserDetails from "./pages/admin/user/userDetails";
import AddNewUser from "./pages/admin/user/newUser";
import AdminRoutes from "./components/protectedRoutes";
import Forbidden from "./pages/forbidden";
import NotFound from "./pages/notFound";
import Ingredients from "./pages/admin/ingredients/ingredients";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipe/:recipe_id" element={<RecipeDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/favourites" element={<Favourites />} />
      <Route path="/recipes/ingredients" element={<SearchResults />} />
      <Route path="/mealplan" element={<CreateMealPaln />} />

      <Route path="/404" element={<NotFound />} />
      <Route path="/403" element={<Forbidden />} />

      <Route element={<AdminRoutes />}>
        <Route path="/dashboard" element={<DashboardMetrics />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/add-new" element={<AddNewUser />} />
        <Route path="/users/:user_id" element={<UserDetails />} />

        <Route path="/ingredients" element={<Ingredients />} />
      </Route>
    </Routes>
  );
}
export default App;
