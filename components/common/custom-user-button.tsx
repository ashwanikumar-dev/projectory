"use client";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Building2Icon, BuildingIcon } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

export default function CustomUserButton() {
  return (
    <UserButton>
      <UserButton.UserProfilePage
        label="Organizations"
        labelIcon={<BuildingIcon className="size-4" />}
        url="organization"
      >
        <div className="p-4">
          <h2>Manage Organization</h2>
          <OrganizationSwitcher
            hidePersonal={true}
            afterCreateOrganizationUrl={"/submit"}
            afterSelectPersonalUrl={"/submit"}
            appearance={{
              elements: {
                rootBox: "w-full",
              },
            }}
          />
        </div>
      </UserButton.UserProfilePage>
      <UserButton.UserProfilePage
        label="Admin"
        labelIcon={<Building2Icon className="size-4" />}
        url="admin"
      >
        <div className="p-4">
          <h2>Admin Panel</h2>
          <Link href="/admin" className="w-full justify-start">
            <Button size="default" className="w-full justify-start">
              Go to Admin Panel
            </Button>
          </Link>
        </div>
      </UserButton.UserProfilePage>
    </UserButton>
  );
}
