"use client";

import { Sidebar } from "./Sidebar";

const studentNavItems = [
  { title: "Dashboard", url: "/student/dashboard", icon: "dashboard" },
  { title: "Courses", url: "/student/courses", icon: "menu_book" },
  { title: "Workshops", url: "/student/workshops", icon: "precision_manufacturing" },
  { title: "My Experience", url: "/student/experience", icon: "edit_note" },
];

export function StudentSidebar() {
  return <Sidebar navItems={studentNavItems} portalName="STUDENT PORTAL" />;
}
