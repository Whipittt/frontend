import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

import MainLayout from "@/layouts/mainLayout";
import PageHeaderWithAvatar from "@/components/pageHeader";
import UserAvatar from "@/components/userAvatar";
import LogoutConfirmation from "@/components/logoutConfirmation";

import { Card, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import ProfileCard from "./profileCard";
import EditButton from "./editButton";
import { EditMealPreferences } from "./editMealPreferences";

import { useProfileData } from "@/hooks/useUsersData";
import { Skeleton } from "@/components/ui/skeleton";
import { UpdateProfile } from "./updateProfile";

export default function Profile() {
  const { data: user, isLoading } = useProfileData();

  const [isPreferenceEditOpen, setIsPreferenceEditOpen] = useState(false);
  const [isProfileUpdateOpen, setIsProfileUpdateOpen] = useState(false);

  const navigate = useNavigate();

  const fullName = user?.fullname ?? "";
  const nameParts = fullName.trim().split(/\s+/).filter(Boolean);

  const personalDetails = [
    { label: "First Name", value: nameParts[0] ?? "" },
    {
      label: "Last Name",
      value: nameParts.length > 1 ? nameParts.slice(1).join(" ") : "",
    },
    { label: "Email", value: user?.email ?? "" },
  ];

  const preference = user?.preference;

  const preferenceDetails = [
    {
      label: "Dietary Restrictions",
      value: preference?.dietary_restrictions?.length
        ? preference.dietary_restrictions.map((r) => r.name).join("/")
        : "None",
    },
    { label: "Cuisine", value: preference?.ethnicity ?? "" },
    { label: "Cooking Time", value: preference?.cooking_time ?? "" },
    { label: "Skill Level", value: preference?.skill_level ?? "" },
  ];

  return (
    <>
      <MainLayout pageTitle="My profile" className="gap-8">
        <PageHeaderWithAvatar text="My Profile" hideAvatar />

        <section className="flex flex-col gap-4 md:gap-8">
          <Card className="p-8 rounded-3xl flex justify-between items-center">
            <div className="flex gap-4 items-center">
              {isLoading ? (
                <Skeleton className="h-12 w-12 rounded-full" />
              ) : (
                <UserAvatar />
              )}

              <div className="flex flex-col gap-1">
                {isLoading ? (
                  <>
                    <Skeleton className="h-5 w-40" />
                    <Skeleton className="h-4 w-24" />
                  </>
                ) : (
                  <>
                    <span className="font-semibold text-lg capitalize">
                      {fullName}
                    </span>
                    <span className="text-muted-foreground text-sm capitalize">
                      {preference?.skill_level || "—"}
                    </span>
                  </>
                )}
              </div>
            </div>

            {!isLoading && (
              <EditButton
                onClick={() => setIsProfileUpdateOpen((prev) => !prev)}
              />
            )}
          </Card>

          <ProfileCard
            header="Personal Information"
            details={personalDetails}
            loading={isLoading}
            onEditClick={() => setIsProfileUpdateOpen((prev) => !prev)}
          />

          {isLoading ? (
            <ProfileCard header="Meal Preferences" details={[]} loading />
          ) : preference ? (
            <ProfileCard
              header="Meal Preferences"
              details={preferenceDetails}
              onEditClick={() => setIsPreferenceEditOpen(true)}
            />
          ) : (
            <Card className="p-8 flex justify-between items-start">
              <div className="w-full flex flex-col gap-6">
                <CardHeader className="p-0">
                  <span className="font-medium">Meal Preferences</span>
                </CardHeader>

                <div className="flex flex-col gap-4 items-center">
                  <span>You haven't set your preferences</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate("/preferences/add")}
                  >
                    Set Preferences
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-8 flex justify-between items-start">
            <div className="w-full flex flex-col gap-6">
              <CardHeader className="p-0">
                <span className="font-medium">Logout</span>
              </CardHeader>

              <LogoutConfirmation>
                <Button
                  variant="outline"
                  className="rounded-full bg-destructive/5 w-fit"
                >
                  <LogOut />
                  <span>Logout</span>
                </Button>
              </LogoutConfirmation>
            </div>
          </Card>
        </section>
      </MainLayout>

      {!isLoading && user && preference && (
        <EditMealPreferences
          open={isPreferenceEditOpen}
          onOpenChange={setIsPreferenceEditOpen}
          preference={preference}
        />
      )}

      {!isLoading && user && (
        <UpdateProfile
          open={isProfileUpdateOpen}
          onOpenChange={setIsProfileUpdateOpen}
          user={{
            id: user?.id,
            fullname: user?.fullname || "",
            email: user?.email || "",
            is_active: user?.is_active ?? true,
            is_superuser: user?.is_superuser ?? false,
          }}
        />
      )}
    </>
  );
}
