"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginRegisterModal from "../modules/Auth/LoginRegister/LoginRegister";

const Navbar = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { name: "Учителя", href: "/" },
    { name: "Категории", href: "/categories" },
    { name: "Страны", href: "/countries" },
  ];

  const NavLinks = () => (
    <ul className="flex flex-col lg:flex-row lg:justify-center items-start lg:items-center gap-4 lg:gap-12 text-base lg:text-lg text-[#33373D] w-full lg:w-auto">
      {navItems.map((item) => (
        <li key={item.href} className="w-full lg:w-auto">
          <Link
            href={item.href}
            className={`block w-full px-4 py-2 rounded-md transition-all duration-200 ${
              pathname === item.href
                ? "bg-orange-100 text-orange-600 font-semibold"
                : "hover:bg-gray-100"
            }`}
          >
            {item.name}
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <nav className=" w-full px-4 lg:px-12 py-3 bg-white shadow-sm flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <Image
          src="https://traveltoyourteacher.ru/wp-content/uploads/2024/11/cropped-cropped-Logo-for-Travel-to-Your-Teacher-travel-agency_Var-1.1.png"
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      </Link>

      {/* Desktop Nav */}
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <NavLinks />
      </div>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-4">
        <Link href="/login" className="text-orange-500 text-xl">
          Войти в лк
        </Link>

        <LoginRegisterModal>
          <Button className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-12 py-4 rounded-md shadow hover:opacity-90 transition text-lg font-normal">
            Найти учителя
          </Button>
        </LoginRegisterModal>
      </div>

      {/* Mobile Nav Toggle */}
      <div className="lg:hidden">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <div className=" text-black hover:bg-yellow-400">
              {menuOpen ? (
                <X size={30} className="text-black " />
              ) : (
                <Menu size={30} className="text-black" />
              )}
            </div>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left text-lg font-semibold mx-2">
                Меню
              </SheetTitle>
            </SheetHeader>
            <div className="mt-2 space-y-6 px-2">
              <NavLinks />
              <Link
                href="/login"
                className="block text-orange-500 px-4 text-lg font-normal"
              >
                Войти в лк
              </Link>
              <Button className="px-2 w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-2 rounded-md shadow hover:opacity-90 transition">
                Найти учителя
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
