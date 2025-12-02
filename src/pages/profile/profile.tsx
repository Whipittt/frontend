import MainLayout from "@/layouts/mainLayout";
import { Helmet } from "react-helmet-async";
import { Card } from "@/components/ui/card";

import ProfileCard from "./profileCard";
import EditButton from "./editButton";
import { useAuth } from "@/services/authService";
import UserAvatar from "@/components/userAvatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

const APP_NAME = import.meta.env.VITE_APP_NAME;

export default function Profile() {
  const { user, logout } = useAuth();

  const nameParts = (user?.fullname ?? "").trim().split(/\s+/).filter(Boolean);

  const userDetails = [
    { label: "First Name", value: nameParts[0] ?? "" },
    {
      label: "Last Name",
      value: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
    },
    { label: "Email", value: user?.email ?? "" },
  ];

  const preferenceDetails = [
    { label: "Dietary Restrictions", value: "Vegan/Vegetarian" },
    { label: "Cuisine", value: "Igbo" },
    { label: "Cooking Time", value: "Quick Meals" },
    { label: "Skill Level", value: "Beginner" },
  ];

  return (
    <>
      <Helmet>
        <title>{`My profile - ${APP_NAME}`}</title>
      </Helmet>

      <MainLayout className="px-2 md:px-8">
        <section>
          <h1 className="font-serif text-2xl md:text-5xl">My Profile</h1>
        </section>

        <section className="flex flex-col gap-2 md:gap-6">
          <Card className="p-8 rounded-3xl flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <UserAvatar />
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-lg capitalize">
                  {user?.fullname}
                </span>
                <span className="text-muted-foreground text-sm">Beginner</span>
              </div>
            </div>
            <EditButton />
          </Card>
        </section>

        <ProfileCard header="Personal Information" details={userDetails} />

        <ProfileCard header="Meal Preferences" details={preferenceDetails} />

        <Card className="p-8 px-4 rounded-3xl flex justify-between items-start">
          <Button
            variant="outline"
            className="rounded-full bg-transparent"
            onClick={logout}
          >
            <LogOut />
            <span>Logout</span>
          </Button>
        </Card>
      </MainLayout>
    </>
  );
}
