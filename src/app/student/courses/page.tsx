"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
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

export default function CourseCatalogPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [activeLevel, setActiveLevel] = useState<CourseLevel | "all">("all");

  useEffect(() => {
    setLoading(true);
    setError("");
    api.courses.list()
      .then(setCourses)
      .catch((err) => setError(err.message || "Failed to load courses"))
      .finally(() => setLoading(false));
  }, []);

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

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bg-surface-container-lowest border border-border rounded-xl overflow-hidden animate-pulse">
              <div className="h-44 bg-surface-container" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-surface-container rounded w-3/4" />
                <div className="h-4 bg-surface-container rounded w-full" />
                <div className="h-4 bg-surface-container rounded w-1/2" />
                <div className="h-4 bg-surface-container rounded w-1/4 mt-auto" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-destructive/30 mb-4">error</span>
          <p className="text-headline-md text-destructive mb-2">Failed to load courses</p>
          <p className="text-body-md text-on-surface-variant mb-6">{error}</p>
          <button onClick={() => window.location.reload()} className="bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold">Retry</button>
        </div>
      ) : (
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
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">search_off</span>
          <p className="text-headline-md text-on-surface-variant">No courses match your search.</p>
        </div>
      )}
    </main>
  );
}
