"use client";

import { useState } from "react";
import Link from "next/link";
import type { Course, CourseLevel } from "@/lib/types";

const levels: { value: CourseLevel | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "school", label: "School" },
  { value: "college", label: "College" },
];

const levelStyles: Record<CourseLevel, { color: string; badge: string }> = {
  school: { color: "text-green-600 bg-green-50", badge: "School" },
  college: { color: "text-amber-600 bg-amber-50", badge: "College" },
};

const courses: Course[] = [
  {
    id: "ros2-intro", title: "Intro to ROS 2",
    description: "Master the Robot Operating System for real-world robotics applications.",
    level: "college", price: "1299.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzNA9wx-SR0bqA0pNKUNtz6mvtOuUhSBOlwAMWlHe7cMTmkte5-Une9wUepzHp_rTWSIGkBc_w2vee1LvXasW3w2F-n_JxvDeXGI0okjNUHROCY7oaRfglA7QW1uZj8ZzMz_RBm4VEUAr5gD8BMYhmuT28xZBbiSDMTP8BG6Uw1Ez3BsJsfx6ZNIf9PF65Z5kPijKz0KfEeCuT8bq_ibmw5tzhVW9buYIZuV-YT8XNZ_AIIGlzwXte8g",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [], announcements: [], feedback: [],
  },
  {
    id: "computer-vision", title: "Computer Vision Basics",
    description: "Implement object detection and spatial reasoning for autonomous platforms.",
    level: "college", price: "950.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHUwCJgyFV3EO_osRDHCBtmDC31vl0d2nLbfqHzMZ4nPdGh-G0ACyhMQmSPjUu7jNC6au5yXnfLcISeSPNaXB9uWAwOYgMqi74-hOxUKrZVLhO0rUrSH5ZBPHyrqsHDe2wnxXOmLKpAA_3tZOUYk3Rk7ZNbvzi4ASOnoEiAaSaRkrP8V7D7vVKb1p8WcpHhjmywF3tuGeEfrYITdv__o_zvKxnAITSbkpD9kZMK71FT9ayv54esgUaWw",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [], announcements: [], feedback: [],
  },
  {
    id: "autonomous-systems", title: "Autonomous Systems",
    description: "LiDAR integration, SLAM algorithms, and edge computing for mobile robotics.",
    level: "college", price: "1499.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rU-AuFg-E3xxCpg-65018qlDDpkG86vxs7oF6a2oQ99Eg1VQAHd_p9wqOriPJKOf3Y2NbewK05IgAO79_pdH6FpM7bmowyL4wkbMgnJT2MkzYzN7xMLJiylGfQ0TwzNA-YUUC6yNe3Y7W71GgPB1V2mode40Ifz2bWEdXDiUcDr_oXsWKZWR03VfRf0aWW2XT4HqA3JIHWH0fAWwWDY3QlUnc5uufYAIf4sRxrrUaktDCcw-DwsyKw",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [], announcements: [], feedback: [],
  },
  {
    id: "neural-networks", title: "Neural Networks for Robotics",
    description: "Deep learning for computer vision and reactive robot control architectures.",
    level: "college", price: "1100.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjjX2xYVg2JEG8D4ABhKHwlmPTVT-u4QBUFASemqKzL4uRbdC_XElarJiz_fm9iWkl1hFwKkLRCHpSu1TkrJdstHHqSdp2sLpcxqml1E3b8fwWxVVR3sG8KuIsa2emk8-xtx1X-aUQTJsgRVUT2brSI4wqsxPXTH9fTgEK4LX6-ytJr8C-LszZ-NnDfOt8VV1ST3oV7BoVgCWxUWCW2LLjc9xE1szSht2zs9NJ5zaQpZKmmnwa6Z91Dw",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [], announcements: [], feedback: [],
  },
  {
    id: "embedded-iot", title: "Embedded IoT Systems",
    description: "Custom PCB design, MQTT protocols, and low-latency sensor networks.",
    level: "college", price: "800.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3hYdlv0eLw27hXCwYMFf9-_ck5XUIlzaRKxLw7k94CDjmrYYYVyUxhnxf5a0MX5PSvBKCSgCaIm7ohBKoOjYUoQRWc-aI9kvRiJDR-y7sTS67-9IX_1yFDs4kdxdSmpmDTO1UL9JEkX8EGbn-6bp2LanxjSDBShafAiwVluRdzZBAim7ozAm8bE3s3LXpR_nCVhgG8YW2xg5iS-3bZxej-pdqW9fv_RW_vKpBFCPrZPpciViq0VlPCA",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [], announcements: [], feedback: [],
  },
  {
    id: "industrial-automation", title: "Industrial Automation",
    description: "PLC programming, SCADA integration, and factory floor orchestration.",
    level: "college", price: "1500.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLAH0NJuVPLTVglGCTXv3Jp_J92mKtDa0LOnQdsLNeWzYr3-ytNX1RxpFN5HoJ5fkG5ZjDkpJwI4omdYpZbRZMQDsHKpX8I9aX-mijNdtjEJIbYYEXJa7zSkMhIwO586lIPVv-aeDJQ9nL78QODDC-GrMBFTD68BP6sAa0iWHmQzuItrfxOh0vprD3uHIuZ85I9T8b-DLTDi4JT0U8leHfMQUPViCGMSUQIQ1C6C3KjZA0pmIKnjIHVA",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [], announcements: [], feedback: [],
  },
  {
    id: "sensor-fusion", title: "Sensor Fusion & Estimation",
    description: "Kalman filters, particle filters, and multi-sensor integration for robust perception.",
    level: "college", price: "1050.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzNA9wx-SR0bqA0pNKUNtz6mvtOuUhSBOlwAMWlHe7cMTmkte5-Une9wUepzHp_rTWSIGkBc_w2vee1LvXasW3w2F-n_JxvDeXGI0okjNUHROCY7oaRfglA7QW1uZj8ZzMz_RBm4VEUAr5gD8BMYhmuT28xZBbiSDMTP8BG6Uw1Ez3BsJsfx6ZNIf9PF65Z5kPijKz0KfEeCuT8bq_ibmw5tzhVW9buYIZuV-YT8XNZ_AIIGlzwXte8g",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [], announcements: [], feedback: [],
  },
  {
    id: "robotics-101", title: "Robotics Fundamentals",
    description: "Kinematics, dynamics, and control theory for aspiring roboticists.",
    level: "school", price: "650.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHUwCJgyFV3EO_osRDHCBtmDC31vl0d2nLbfqHzMZ4nPdGh-G0ACyhMQmSPjUu7jNC6au5yXnfLcISeSPNaXB9uWAwOYgMqi74-hOxUKrZVLhO0rUrSH5ZBPHyrqsHDe2wnxXOmLKpAA_3tZOUYk3Rk7ZNbvzi4ASOnoEiAaSaRkrP8V7D7vVKb1p8WcpHhjmywF3tuGeEfrYITdv__o_zvKxnAITSbkpD9kZMK71FT9ayv54esgUaWw",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [], announcements: [], feedback: [],
  },
];

export default function CourseCatalogPage() {
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState<CourseLevel | "all">("all");

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = activeLevel === "all" || c.level === activeLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Course Catalog</h1>
          <p className="text-body-md text-on-surface-variant">Explore our robotics and AI curriculum.</p>
        </div>
        <div className="relative w-full md:w-72">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search courses..."
            className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm bg-surface-container-lowest focus:ring-1 focus:ring-primary outline-none placeholder:text-on-surface-variant/50"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-10">
        {levels.map((l) => (
          <button
            key={l.value}
            onClick={() => setActiveLevel(l.value)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
              activeLevel === l.value
                ? "bg-primary-container text-on-primary"
                : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container border border-border"
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filtered.map((course) => {
          const style = levelStyles[course.level];
          return (
            <Link
              key={course.id}
              href={`/student/courses/${course.id}`}
              className="group bg-surface-container-lowest border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative h-44 overflow-hidden bg-surface-container">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
                  style={{ backgroundImage: `url('${course.thumbnail_url}')` }}
                />
                <div className="absolute top-3 left-3">
                  <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${style.color}`}>
                    {style.badge}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="font-headline-md text-headline-md text-on-surface mb-1.5 group-hover:text-primary-container transition-colors">{course.title}</h3>
                <p className="text-body-md text-on-surface-variant mb-4 flex-1 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
                  <span className="text-body-md-bold text-on-surface">${parseFloat(course.price).toLocaleString()}</span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">search_off</span>
          <p className="text-headline-md text-on-surface-variant">No courses match your search.</p>
        </div>
      )}
    </main>
  );
}
