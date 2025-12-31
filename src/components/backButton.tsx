import { useNavigate, useLocation } from "react-router-dom";
import WestIcon from "@mui/icons-material/West";

export default function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className="p-2 rounded-full hover:bg-muted transition"
    >
      <WestIcon fontSize="large" />
    </button>
  );
}
