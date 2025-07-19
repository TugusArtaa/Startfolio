"use client";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState, useEffect, useRef } from "react";
import { IconChevronDown, IconLogout } from "@tabler/icons-react";

export function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const closeDropdownTimer = useRef<NodeJS.Timeout | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [activeLink, setActiveLink] = useState<string>("");

  useEffect(() => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setUserEmail(payload.email || null);
        setUserName(payload.name || null);
        setIsLoggedIn(true);
      } catch {
        setIsLoggedIn(false);
        setUserEmail(null);
        setUserName(null);
      }
    } else {
      setIsLoggedIn(false);
      setUserEmail(null);
      setUserName(null);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setActiveLink(window.location.pathname);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserEmail(null);
    setUserName(null);
    setIsDropdownOpen(false);
    window.location.href = "/";
  };

  const navItems = isLoggedIn
    ? [
        { name: "Home", link: "/" },
        { name: "List CV", link: "/cv" },
        { name: "Create CV", link: "/cv/new" },
      ]
    : [];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (!isReady) return null;

  return (
    <div className="relative w-full flex-shrink-0">
      <ResizableNavbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} activeLink={activeLink} />
          <div className="flex items-center gap-4">
            {!isLoggedIn ? (
              <NavbarButton href="/login" variant="primary">
                Sign In
              </NavbarButton>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => {
                  if (closeDropdownTimer.current) {
                    clearTimeout(closeDropdownTimer.current);
                  }
                  setIsDropdownOpen(true);
                }}
                onMouseLeave={() => {
                  closeDropdownTimer.current = setTimeout(() => {
                    setIsDropdownOpen(false);
                  }, 200);
                }}
              >
                <div
                  className="flex items-center gap-2 group cursor-pointer"
                  tabIndex={0}
                  aria-haspopup="true"
                  aria-expanded={isDropdownOpen}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-white font-medium text-sm">
                    {(userName && userName.charAt(0).toUpperCase()) ||
                      (userEmail && userEmail.charAt(0).toUpperCase())}
                  </div>
                  <IconChevronDown
                    className={`h-4 w-4 text-neutral-500 transition-transform duration-200 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </div>

                {isDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 w-64 rounded-lg bg-white shadow-lg border border-neutral-200 z-50"
                    onMouseEnter={() => {
                      if (closeDropdownTimer.current) {
                        clearTimeout(closeDropdownTimer.current);
                      }
                      setIsDropdownOpen(true);
                    }}
                    onMouseLeave={() => {
                      closeDropdownTimer.current = setTimeout(() => {
                        setIsDropdownOpen(false);
                      }, 200);
                    }}
                  >
                    <div className="px-4 py-3 border-b border-neutral-200">
                      <p className="text-sm font-medium text-neutral-900 truncate">
                        {userName || (userEmail && userEmail.split("@")[0])}
                      </p>
                      <p className="text-xs text-neutral-500 truncate">
                        {userEmail}
                      </p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:text-white hover:bg-red-700/60 transition-colors duration-200 rounded-b-md"
                    >
                      <IconLogout className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>
          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`relative text-neutral-600 px-4 py-2 rounded-lg w-full ${
                  activeLink === item.link
                    ? "bg-teal-600 text-white font-bold shadow"
                    : ""
                }`}
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              {!isLoggedIn ? (
                <NavbarButton
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Login
                </NavbarButton>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-white border border-neutral-200 shadow-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white font-semibold text-base shadow-md">
                      {(userName && userName.charAt(0).toUpperCase()) ||
                        (userEmail && userEmail.charAt(0).toUpperCase())}
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="text-sm font-semibold text-neutral-900 truncate">
                        {userName || (userEmail && userEmail.split("@")[0])}
                      </span>
                      <span className="text-xs text-neutral-500 truncate">
                        {userEmail}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-lg text-red-600 text-sm font-semibold border border-red-800/50 shadow-lg"
                  >
                    <IconLogout className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </ResizableNavbar>
    </div>
  );
}
