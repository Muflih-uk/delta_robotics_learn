"use client";

import { Sidebar } from "./Sidebar";

const adminNavItems = [
  { title: "Dashboard", url: "/admin/dashboard", icon: "dashboard" },
  { title: "Students", url: "/admin/students", icon: "school" },
  { title: "Enrollments", url: "/admin/enrollments", icon: "person_add" },
  { title: "Courses", url: "/admin/courses", icon: "menu_book" },
  { title: "Experiences", url: "/admin/experiences", icon: "vrpano" },
  { title: "Inventory", url: "/admin/inventory", icon: "inventory_2" },
  { title: "Workshops", url: "/admin/workshops", icon: "precision_manufacturing" },
  { title: "Gallery", url: "/admin/gallery", icon: "photo_library" },
  { title: "Reports", url: "/admin/reports", icon: "analytics" },
  { title: "Users", url: "/admin/users", icon: "account_circle" },
  { title: "Settings", url: "/admin/settings", icon: "settings" },
];

export function AppSidebar() {
  return <Sidebar navItems={adminNavItems} portalName="ADMIN CONSOLE" />;
}
