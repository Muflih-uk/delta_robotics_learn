"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

const internNavItems = [
  { title: "Dashboard", url: "/intern/dashboard", icon: "dashboard" },
  { title: "Courses", url: "/intern/courses", icon: "menu_book" },
  { title: "Workshops", url: "/intern/workshops", icon: "precision_manufacturing" },
  { title: "Inventory", url: "/intern/inventory", icon: "inventory_2" },
  { title: "Student Acceptance", url: "/intern/enrollments", icon: "person_add" },
];

export function InternSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  return (
    <aside className="hidden md:flex w-[260px] h-screen sticky top-0 left-0 border-r border-border bg-bg-alt flex-col justify-between py-6 shrink-0 z-50">
      <div>
        <div className="px-6 mb-8 flex items-center gap-3">
          <img
            alt="Delta Robotics Logo"
            className="w-8 h-8 object-contain"
            src="/logo-32.png"
          />
          <div>
            <h1 className="font-headline-sm text-headline-sm font-bold text-on-surface uppercase tracking-tight">
              DELTA ROBOTICS
            </h1>
            <span className="font-label-sm text-label-sm text-secondary uppercase">
              INTERN PORTAL
            </span>
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {internNavItems.map((item) => {
            const isActive = pathname === item.url || pathname.startsWith(item.url + "/");
            
            return (
              <Link
                key={item.title}
                href={item.url}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer active:scale-95 transition-colors ${
                  isActive
                    ? "border-l-[3px] border-primary bg-accent-tint text-primary font-body-md-bold"
                    : "text-secondary hover:bg-surface-container-low font-body-md text-body-md"
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
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
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-low transition-colors cursor-pointer active:scale-95 font-body-md text-body-md"
        >
          <span className="material-symbols-outlined text-[20px]">
            account_circle
          </span>
          {user?.first_name ? `${user.first_name} ${user.last_name}` : user?.email || "Profile"}
        </Link>
        <button
          onClick={async () => { await logout(); router.push("/login"); }}
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-surface-container-low transition-colors cursor-pointer active:scale-95 font-body-md text-body-md w-full text-left"
        >
          <span className="material-symbols-outlined text-[20px]">
            logout
          </span>
          Logout
        </button>
      </div>
    </aside>
  );
}
