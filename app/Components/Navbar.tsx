"use client";

import { Contact, HomeIcon } from "lucide-react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconLogin2,
  IconLogout2,
  IconPencil,
  IconPhotoShare,
} from "@tabler/icons-react";
import React from "react";

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
      title: "Blogs",
      icon: <IconPhotoShare />,
      href: "/Blogs",
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
    <div className="p-16 w-auto">
      <FloatingDock items={items} />
    </div>
  );
};

export default Navbar;
