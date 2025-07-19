"use client";
import { Navbar } from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar =
    pathname.startsWith("/auth") ||
    pathname === "/login" ||
    pathname === "/register";
  const hideFooter =
    pathname.startsWith("/auth") ||
    pathname === "/login" ||
    pathname === "/register";
  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
      {!hideFooter && <Footer />}
    </>
  );
}
