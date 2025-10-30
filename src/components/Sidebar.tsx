"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown, Bell } from "lucide-react";
import { useCart } from "@/context/CartContext";
import CoursesIcon from "@/icons/discover.svg";
import CartIcon from "@/icons/cart.svg";

const menuItems = [
  { name: "Courses", href: "/", icon: CoursesIcon },
  { name: "Cart", href: "/cart", icon: CartIcon, showBadge: true },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { cart, ready } = useCart();

  if (!ready) return null;

  const cartCount = cart.length;

  // Simple user stub — replace with real user data when available
  const user = {
    initials: "O",
    name: "Oluwatobiloba",
    status: "Pending",
  };

  return (
    <>
      {/* Mobile header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between bg-white border-b border-gray-200 px-4 py-3 md:hidden">
        <Image src="/logo.svg" alt="Lumilearn" width={80} height={32} className="h-5 w-auto" priority />
        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="relative w-8 h-8 flex items-center justify-center rounded-md focus:outline-none focus:ring-2 focus:ring-green-200"
            type="button"
          >
            <Bell className="w-5 h-5 text-[#4F4F4F]" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-2xl w-4 h-4 flex items-center justify-center">{cartCount > 9 ? "9+" : cartCount}</span>}
          </button>

          <button
            onClick={() => setIsOpen((s) => !s)}
            aria-expanded={isOpen}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="rounded-md p-1 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-200"
            type="button"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 flex flex-col bg-white border-r border-gray-100 px-4 py-6 h-full w-64 transform transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
        aria-hidden={!isOpen && typeof window !== "undefined" && window.innerWidth < 768}
      >
        {/* Logo */}
        <div className="mb-10 flex items-center px-2 mt-2 md:mt-0">
          <Image src="/logo.svg" alt="Lumilearn" width={140} height={36} className="h-auto w-auto max-w-[140px]" priority />
        </div>

        {/* Navigation */}
        <nav className="flex flex-col space-y-2 px-2 flex-1" aria-label="Main navigation">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.href === "/" ? pathname === "/" : pathname?.startsWith(item.href);
            const showBadge = !!item.showBadge;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between gap-3 h-11 w-full rounded-lg px-3 transition-colors duration-200 ${
                  isActive ? "bg-[#ECF9F1] text-[#1C9647]" : "text-[#4F4F4F] hover:text-[#1C9647] hover:bg-[#ECF9F1]/60"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <div className="flex items-center gap-2 w-full">
                  <Icon className="w-6 h-6 shrink-0" style={isActive ? { color: "#1C9647" } : undefined} />
                  <span className="truncate text-sm font-normal flex-1">{item.name}</span>
                  {showBadge && cartCount > 0 && <span className="bg-[#1C9647] text-white text-xs font-medium rounded-2xl w-5 h-5 flex items-center justify-center">{cartCount > 9 ? "9+" : cartCount}</span>}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* User at bottom */}
        {isOpen && (
        <div className={`mt-auto border-t border-gray-100 pt-4 ${!isOpen ? "hidden md:block" : ""}`}>
          <button
            className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-200"
            onClick={() => {
              setIsOpen(false);
              // navigate to account page if available
            }}
            type="button"
          >
            <div className="w-10 h-10 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-sm font-semibold">
              {user.initials}
            </div>

            <div className="flex flex-col flex-1 text-left">
              <div className="flex items-center gap-1">
                <span className="text-[#141414] font-medium text-sm">{user.name}</span>
                <ChevronDown size={16} className="text-gray-500" />
              </div>
              <span className="mt-1 px-2 py-0.5 text-xs font-medium rounded-lg bg-[#FEF8F1] text-[#ED9D2C] w-fit">{user.status}</span>
            </div>
          </button>
        </div>
        )}
      </aside>

      {/* Mobile overlay */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black/30 z-30 md:hidden" />}
    </>
  );
}
