"use client";

import { ChevronDown } from "lucide-react";
import Notification from "@/icons/notification.svg";

const Navbar = () => {
  return (
    <header className="hidden md:flex fixed top-0 left-64 right-0 z-40 h-16 bg-white border-b border-gray-200 px-6 items-center justify-end">
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative w-8 h-8 flex items-center justify-center">
          <Notification className="w-5 h-5 text-[#4F4F4F]" />
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="w-6 h-6 rounded-2xl bg-purple-600 text-white flex items-center justify-center text-xs font-semibold">
            O
          </div>

          {/* Name + Dropdown + Pending */}
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[#141414] font-medium text-[14px] leading-[150%]">
                Oluwatobiloba
              </span>
              <ChevronDown size={16} className="text-gray-500" />
            </div>
            <span className="mt-1 px-2 py-0.5 text-[12px] font-medium rounded-lg bg-[#FEF8F1] text-[#ED9D2C] w-fit">
              Pending
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
