import { useNavigate, useLocation } from "react-router-dom";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

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
      <ArrowBackRoundedIcon fontSize="large" />
    </button>
  );
}
