"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export function StudentNavbar() {
  const pathname = usePathname();

  return (
    <header className="h-[64px] w-full sticky top-0 z-40 bg-surface border-b border-border flex items-center justify-between px-gutter shrink-0">
      {/* Left: Search */}
      <div className="flex-1 max-w-md">
        <div className="relative flex items-center focus-within:ring-2 focus-within:ring-primary rounded-lg transition-all">
          <span className="material-symbols-outlined absolute left-3 text-secondary">
            search
          </span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-surface-container-lowest border border-border rounded-lg text-body-md focus:outline-none focus:border-transparent"
            placeholder="Search courses, workshops..."
            type="text"
          />
        </div>
      </div>

      {/* Right: Actions */}
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
        <div className="ml-2">
          <img
            alt="User Avatar"
            className="w-8 h-8 rounded-full border border-border object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuB--e6dnBZNASTTRm6e2EaShxdV78ORhMx3REiS13VoKx7ymregT6J4hLZ6TV3zMgP7D3tcK2uiDlwNzSqDWSsmPif0vyJsNqHX-RokSvba5IlysPlJmtm-GGiNV4DWSoUAYnq_u9zRDp5_-ExlxeGVrGiFk8ctr6eBq6jWguwHJZ_gF4rrhpOP44CQhyp1f-Pbg4IZpz0gF-bQeT0DSalgOCxiY-J70kD2Ga_fHna74MiL3ybiYrQE1A"
          />
        </div>
      </div>
    </header>
  );
}
