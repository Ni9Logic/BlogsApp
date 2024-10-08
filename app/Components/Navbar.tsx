"use client";

import { Contact, HomeIcon } from "lucide-react";
import { FloatingDock } from "./ui/floating-dock";
import { IconLogin2, IconLogout2, IconPencil } from "@tabler/icons-react";
import React from "react";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

type Items = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

type NavbarProps = {
  isLoggedIn: boolean;
};
export const Navbar: React.FC<NavbarProps> = ({ isLoggedIn }: NavbarProps) => {
  const items: Items[] = [
    {
      title: "Home",
      icon: <HomeIcon />,
      href: "/",
    },
    {
      title: "Contact Us",
      icon: <Contact />,
      href: "/Contactus",
    },
    {
      title: "API Example",
      icon: <GitHubLogoIcon />,
      href: "/ApiExample",
    },
    {
      title: "Publish",
      icon: <IconPencil />,
      href: "/Publish",
    },
    {
      title: isLoggedIn ? "Logout" : "Login",
      icon: isLoggedIn ? <IconLogout2 /> : <IconLogin2 />,
      href: "/Login",
    },
  ];
  return (
    <div className="md:p-16 md:w-auto md:items-center md:justify-center">
      <FloatingDock items={items} />
    </div>
  );
};

export default Navbar;
