"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, LogIn as LoginIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import LoginRegisterModal from "../ui/core/NMTabs/NMTabs";
import { CgLogOut } from "react-icons/cg";
import Swal from "sweetalert2";
import { logoutUser } from "@/services/AuthServices";
import { useUser } from "@/Context/UserContext";
import { signOut } from "next-auth/react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.config";
import logo from "../../../public/assets/logo.png";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const [firebaseUser] = useAuthState(auth);
  const [signOutFirebase] = useSignOut(auth);

  const handleLogOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        await logoutUser();
        await signOut({ redirect: false });
        await signOutFirebase();
        router.push("/");
      } catch (error) {
        console.error("Logout failed:", error);
      }
    }
  };

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
    <nav className="w-full px-4 lg:px-12 py-3 bg-white shadow-sm flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <Link href="/">
        <Image
          src={logo}
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
        {user || firebaseUser ? (
          <Button
            onClick={handleLogOut}
            className="flex items-center gap-2 bg-red-500 text-white border border-transparent hover:bg-white hover:border-red-500 hover:text-red-500 px-10 py-3 rounded-md text-lg font-semibold shadow-md transition-all duration-200 "
          >
            <CgLogOut style={{ width: "20px", height: "20px" }} /> Logout
          </Button>
        ) : (
          <LoginRegisterModal>
            <Button
              variant="ghost"
              className="text-orange-500 text-xl flex items-center gap-2"
            >
              <LoginIcon size={20} /> Login
            </Button>
          </LoginRegisterModal>
        )}

        <Link href="/teacher">
          <Button className="cursor-pointer bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-12 py-4 rounded-md shadow hover:opacity-90 transition text-lg font-normal">
            Find a Teacher
          </Button>
        </Link>
      </div>

      {/* Mobile Nav Toggle */}
      <div className="lg:hidden">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <div className="text-black">
              {menuOpen ? (
                <X size={30} className="text-black" />
              ) : (
                <Menu size={30} className="text-black" />
              )}
            </div>
          </SheetTrigger>

          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left text-lg font-semibold mx-2">
                Menu
              </SheetTitle>
            </SheetHeader>
            <div className="mt-2 space-y-6 px-2">
              <NavLinks />
              {user || firebaseUser ? (
                <Button
                  onClick={handleLogOut}
                  className="w-full bg-red-500 text-white border border-transparent hover:bg-white hover:border-red-500 hover:text-red-500 font-semibold py-2 rounded-md shadow-md transition-all duration-200 flex items-center gap-2 text-md"
                >
                  <CgLogOut className="w-12 h-12" /> Logout
                </Button>
              ) : (
                <LoginRegisterModal>
                  <Button
                    variant="ghost"
                    className="text-orange-500 text-xl flex items-center gap-2 w-full"
                  >
                    <LoginIcon size={20} /> Login
                  </Button>
                </LoginRegisterModal>
              )}

              <Link href="/teacher">
                <Button className="cursor-pointer px-2 w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-semibold py-2 rounded-md shadow hover:opacity-90 transition">
                  Find a Teacher
                </Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

const navItems = [
  { name: "Teachers", href: "/" },
  { name: "Category", href: "/category" },
  { name: "Countries", href: "/countries" },
];

export default Navbar;
