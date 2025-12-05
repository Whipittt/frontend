import MainLayout from "@/layouts/mainLayout";
import { Card } from "@/components/ui/card";
import ProfileCard from "./profileCard";
import EditButton from "./editButton";
import { useAuth } from "@/services/authService";
import UserAvatar from "@/components/userAvatar";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import PageHeader from "@/components/pageHeader";

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
      <MainLayout
        pageTitle="My profile"
        className="flex flex-col gap-8 px-3 md:px-8"
      >
        <PageHeader text="My Profile" includeAvatar={false} />

        <section className="flex flex-col gap-4 md:gap-8">
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
        </section>
      </MainLayout>
    </>
  );
}
