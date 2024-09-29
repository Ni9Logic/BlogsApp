"use client";

import { Contact, HomeIcon } from "lucide-react";
import { FloatingDock } from "./ui/floating-dock";
import {
  IconLogin2,
  IconPencil,
  IconPhotoShare,
  IconPointerQuestion,
} from "@tabler/icons-react";

type Items = {
  title: string;
  icon: React.ReactNode;
  href: string;
};

export const Navbar = () => {
  const items: Items[] = [
    {
      title: "Home",
      icon: <HomeIcon />,
      href: "/",
    },
    {
      title: "About Us",
      icon: <IconPointerQuestion />,
      href: "/Aboutus",
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
      title: "Log In",
      icon: <IconLogin2 />,
      href: "/",
    },
  ];
  return (
    <div className="p-16 w-auto">
      <FloatingDock items={items} />
    </div>
  );
};

export default Navbar;
