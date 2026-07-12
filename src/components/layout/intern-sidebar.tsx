"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const internNavItems = [
  { title: "Overview", url: "/intern/dashboard", icon: "dashboard" },
  { title: "Projects", url: "/intern/projects", icon: "precision_manufacturing" },
  { title: "Mentors", url: "/intern/mentors", icon: "group" },
  { title: "Resources", url: "/intern/resources", icon: "folder_open" },
  { title: "Reports", url: "/intern/reports", icon: "analytics" },
];

export function InternSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <aside className="hidden md:flex w-64 h-screen fixed left-0 top-0 flex-col justify-between py-6 z-40 bg-surface-container-low dark:bg-surface-container">
      <div>
        <div className="px-6 mb-12">
          <div className="flex items-center gap-3 mb-2">
            <img src="/logo-32.png" alt="Delta Robotics" className="w-8 h-8 object-contain" />
            <div className="font-headline-md text-headline-md font-bold text-primary-container">Delta Robotics</div>
          </div>
          <div className="font-body-md text-body-md text-secondary">Intern Program</div>
          <div className="font-body-md text-body-md text-on-surface-variant text-xs mt-1">Cohort 2026</div>
        </div>
        <nav className="px-3 flex flex-col gap-1">
          {internNavItems.map((item) => {
            const isActive = pathname === item.url || pathname.startsWith(item.url + "/");

            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 mx-2 p-3 rounded-lg transition-transform duration-150 active:translate-x-1 ${
                  isActive
                    ? "bg-primary-container text-on-primary-container font-bold"
                    : "text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed-variant"
                }`}
              >
                <span
                  className="material-symbols-outlined"
                  style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                >
                  {item.icon}
                </span>
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="px-3 flex flex-col gap-1">
        <Link
          href="#"
          className="flex items-center gap-3 mx-2 p-3 rounded-lg text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed-variant transition-transform duration-150 active:translate-x-1"
        >
          <span className="material-symbols-outlined">help</span>
          Help
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 mx-2 p-3 rounded-lg text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed-variant transition-transform duration-150 active:translate-x-1"
        >
          <span className="material-symbols-outlined">settings</span>
          Settings
        </Link>
        <button
          onClick={async () => { await logout(); router.push("/login"); }}
          className="flex items-center gap-3 mx-2 p-3 rounded-lg text-on-surface-variant hover:bg-primary-fixed hover:text-on-primary-fixed-variant transition-transform duration-150 active:translate-x-1 w-full text-left"
        >
          <span className="material-symbols-outlined">logout</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
