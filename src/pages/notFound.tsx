import { Button } from "@/components/ui/button";
import RootLayout from "@/layouts/rootLayout";
import { ArrowLeft } from "lucide-react";
import HomeIconFilled from "@mui/icons-material/HomeFilled";
import { useLocation, useNavigate } from "react-router-dom";

export default function NotFound() {
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
    <RootLayout pageTitle="404 Not Found">
      <section className="flex flex-col gap-8 py-24 px-4 items-center">
        <div className="flex flex-col gap-4 items-center text-center">
          <span className="text-muted text-9xl font-semibold">404</span>
          <span className="text-4xl font-semibold">Oops! Page Not Found</span>
          <span className="text-muted-foreground">
            The page you're looking for doesn't exist or has been moved. Let's
            help you find what you need.
          </span>
        </div>
        <div className="flex gap-4">
          <Button
            variant="secondary"
            className="text-black"
            onClick={handleBack}
          >
            <ArrowLeft />
            <span>Go back</span>
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            <HomeIconFilled />
            <span>Go to Homepage</span>
          </Button>
        </div>
      </section>
    </RootLayout>
  );
}
