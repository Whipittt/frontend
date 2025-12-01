import { Button } from "@/components/ui/button";
import RootLayout from "@/layouts/rootLayout";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Forbidden() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const handleLoginAgain = () => {
    navigate("/logout");
    navigate("/login");
  };

  return (
    <RootLayout pageTitle="404 Forbidden">
      <section className="flex flex-col gap-8 py-24 px-4 items-center">
        <div className="flex flex-col gap-4 items-center text-center">
          <span className="text-muted text-9xl font-semibold">403</span>
          <span className="text-4xl font-semibold">
            Forbidden! Access Denied
          </span>
          <span className="text-muted-foreground">
            You don't have enough permission to access the requested page.
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
          <Button variant="outline" onClick={handleLoginAgain}>
            <span>Login again</span>
          </Button>
        </div>
      </section>
    </RootLayout>
  );
}
