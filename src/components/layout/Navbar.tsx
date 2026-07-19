"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";

interface NavbarProps {
  searchPlaceholder: string;
  showAddAction?: boolean;
}

export function Navbar({ searchPlaceholder, showAddAction = false }: NavbarProps) {
  const pathname = usePathname();
  const { user } = useAuth();

  const getAddActionText = () => {
    if (pathname.includes("students")) return "Add Student";
    if (pathname.includes("courses")) return "Add Course";
    if (pathname.includes("enrollments")) return "Add Enrollment";
    if (pathname.includes("inventory")) return "Add Item";
    if (pathname.includes("workshops")) return "Add Workshop";
    if (pathname.includes("users")) return "Add User";
    return "Add New";
  };

  return (
    <header className="h-[64px] w-full sticky top-0 z-40 bg-surface border-b border-border flex items-center justify-between px-gutter shrink-0">
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center focus-within:ring-2 focus-within:ring-primary rounded-lg transition-all">
          <span className="material-symbols-outlined absolute left-3 text-secondary">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-surface-container-lowest border border-border rounded-lg text-body-md focus:outline-none focus:border-transparent"
            placeholder={searchPlaceholder}
            type="text"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <button className="text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low focus:outline-none">
          <span className="material-symbols-outlined">notifications</span>
        </button>
        <button className="text-secondary hover:text-primary transition-colors p-2 rounded-full hover:bg-surface-container-low focus:outline-none">
          <span className="material-symbols-outlined">help</span>
        </button>
        <div className="w-px h-6 bg-border mx-2"></div>
        <button className="font-body-md-bold text-secondary hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-surface-container-low">
          Support
        </button>
        
        {showAddAction && !pathname.includes("settings") && !pathname.includes("reports") && !pathname.includes("gallery") && (
          <button className="bg-primary-container text-on-primary h-10 px-4 rounded-lg font-body-md-bold flex items-center gap-2 hover:opacity-90 transition-opacity shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container">
            <span className="material-symbols-outlined text-[18px]">add</span>
            {getAddActionText()}
          </button>
        )}

        <div className="ml-2">
          <img
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-border object-cover"
            src={user?.avatar_url || "https://lh3.googleusercontent.com/aida-public/AB6AXuCiXoQjlib7gaummq8j7oEOP4r68qbOIJEk1akz_d0wA59y1xlACM12A7Oy-SIXNG1qhqB7aUqmobJyyWJPjsSNyI6_IQQoSdgA5qSgY_J0aoiPFqLD454yvrZ6Rrn0wb_uBOkJy1TUWkyKweCmBNtAx7_RhJSPCiEa-otHBeKtfwq2-llTY9YkrPmy2sXouiDUfzKoVJ9_6t1DG7gH-fnyg_nkHLAHmsPUydqZtKjLX-lCYtr1zKd1"}
          />
        </div>
      </div>
    </header>
  );
}
