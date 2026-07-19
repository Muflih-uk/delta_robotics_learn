"use client";

import { Sidebar } from "./Sidebar";

const internNavItems = [
  { title: "Dashboard", url: "/intern/dashboard", icon: "dashboard" },
  { title: "Courses", url: "/intern/courses", icon: "menu_book" },
  { title: "Workshops", url: "/intern/workshops", icon: "precision_manufacturing" },
  { title: "Inventory", url: "/intern/inventory", icon: "inventory_2" },
  { title: "Student Acceptance", url: "/intern/enrollments", icon: "person_add" },
];

export function InternSidebar() {
  return <Sidebar navItems={internNavItems} portalName="INTERN PORTAL" />;
}
