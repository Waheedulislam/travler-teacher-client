"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useAuthState, useSignOut } from "react-firebase-hooks/auth";
import Swal from "sweetalert2";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, X, LogIn as LoginIcon, ExternalLink, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import LoginRegisterModal from "../ui/core/NMTabs/NMTabs";
import { CgLogOut } from "react-icons/cg";
import { logoutUser } from "@/services/AuthServices";
import { useUser } from "@/Context/UserContext";
import auth from "../Firebase/firebase.config";
import logo from "../../../public/assets/logo.png";
import userLogo from "../../../public/assets/png-clipart-user-profile-computer-icons-login-user-avatars-monochrome-black.png";
import { useTeacherMode } from "@/Context/TeacherModeContext";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useUser();
  const [firebaseUser] = useAuthState(auth);
  const [signOutFirebase] = useSignOut(auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { isTeacherMode, setTeacherMode } = useTeacherMode();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/teacher?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setMenuOpen(false);
    }
  };

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

  const NavLinks = () => {
    const navItems = [
      { name: "Home", href: "/" },
      { name: "Teachers", href: "/teacher" },
      { name: "Country", href: "/category" },
      { name: "Blog", href: "/blog" },
      { name: "FAQ", href: "/faq" },
    ];

    if (user?.role === "admin") {
      navItems.push({ name: "Users", href: "/all-users" });
      navItems.push({ name: "Create-Article", href: "/create-article" });
    }

    return (
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
  };

  return (
    <nav className="w-full px-4 lg:px-12 py-3 bg-white shadow-sm flex items-center justify-between sticky top-0 z-50">
      <Link href="/">
        <Image
          src={logo}
          alt="Logo"
          width={50}
          height={50}
          className="rounded-full"
        />
      </Link>

      <div className="hidden lg:flex flex-1 items-center justify-center">
        <NavLinks />
      </div>

      <div className="hidden lg:flex items-center gap-4">
        {!isTeacherMode && user?.role !== "admin" && (
          <form onSubmit={handleSearch} className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search teachers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Button
              type="submit"
              className="bg-gradient-to-r from-[#FF700B] to-[#FDC90C] text-white px-7 py-2 rounded-md"
            >
              Search
            </Button>
          </form>
        )}

        {user || firebaseUser ? (
          <>
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <button className="focus:outline-none">
                  <Image
                    src={user?.image || firebaseUser?.photoURL || userLogo}
                    alt="User Avatar"
                    width={42}
                    height={42}
                    className="rounded-full border border-gray-300 shadow-sm hover:ring-2 hover:ring-orange-400 transition"
                  />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-52">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  <ExternalLink className="w-4 h-4 mr-2" /> View Profile
                </DropdownMenuItem>
                {!isTeacherMode && (
                  <div className="px-3 py-1">
                    <Button
                      variant="outline"
                      onClick={() => setTeacherMode(true)}
                      className="w-full border-orange-500 text-orange-600 hover:bg-orange-100"
                    >
                      👨‍🏫 Become a Teacher
                    </Button>
                  </div>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/")}>
                  <Copy className="w-4 h-4 mr-2" /> Home
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isTeacherMode && (
              <Button
                variant="outline"
                onClick={() => setTeacherMode(false)}
                className="border-orange-500 text-orange-600 hover:bg-orange-100"
              >
                🎓 Switch to Student
              </Button>
            )}

            <Button
              onClick={handleLogOut}
              className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-white hover:text-red-500 hover:border-red-500 border border-transparent"
            >
              <CgLogOut size={20} /> Logout
            </Button>
          </>
        ) : (
          <LoginRegisterModal>
            <Button
              variant="ghost"
              className="text-orange-500 bg-orange-100 text-xl flex items-center gap-2 cursor-pointer"
            >
              <LoginIcon size={20} /> Login
            </Button>
          </LoginRegisterModal>
        )}
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden">
        <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
          <SheetTrigger asChild>
            <div className="text-black cursor-pointer">
              {menuOpen ? <X size={30} /> : <Menu size={30} />}
            </div>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle className="text-left text-lg font-semibold mx-2">
                {" "}
                Menu{" "}
              </SheetTitle>
            </SheetHeader>

            {user?.role !== "admin" && (
              <form onSubmit={handleSearch} className="flex gap-2 mt-4 px-2">
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#FF700B] to-[#FDC90C] text-white px-4 py-2 rounded-md"
                >
                  Search
                </Button>
              </form>
            )}

            <NavLinks />

            {user || firebaseUser ? (
              <div className="flex flex-col gap-3 mt-4">
                {!isTeacherMode && (
                  <Button
                    variant="outline"
                    onClick={() => setTeacherMode(true)}
                    className="w-full border-orange-500 text-orange-600 hover:bg-orange-100"
                  >
                    👨‍🏫 Become a Teacher
                  </Button>
                )}
                {isTeacherMode && (
                  <Button
                    variant="outline"
                    onClick={() => setTeacherMode(false)}
                    className="w-full border-orange-500 text-orange-600 hover:bg-orange-100"
                  >
                    🎓 Switch to Student
                  </Button>
                )}
                <Button
                  onClick={handleLogOut}
                  className="w-full bg-red-500 text-white px-6 py-3 rounded-md hover:bg-white hover:text-red-500 hover:border-red-500 border border-transparent"
                >
                  <CgLogOut size={20} /> Logout
                </Button>
              </div>
            ) : (
              <LoginRegisterModal>
                <Button
                  variant="ghost"
                  className="text-orange-500 bg-orange-100 text-xl flex items-center gap-2 cursor-pointer"
                >
                  <LoginIcon size={20} /> Login
                </Button>
              </LoginRegisterModal>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
