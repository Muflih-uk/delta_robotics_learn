"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Enrollment } from "@/lib/types";

export default function StudentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await api.enrollments.myEnrollments();
        setEnrollments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load enrollments");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const uniqueStudents = [...new Map(enrollments.map((e) => [e.student, e])).values()];
  const filtered = uniqueStudents.filter(
    (s) =>
      s.student.toLowerCase().includes(search.toLowerCase()) ||
      s.course_title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex-1 overflow-auto p-container-padding bg-surface-container-lowest flex flex-col gap-6 relative">
        <div className="h-8 w-32 bg-surface-container-high rounded animate-pulse" />
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 bg-surface-container-high rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-auto p-container-padding flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto p-container-padding bg-surface-container-lowest flex flex-col gap-6 relative">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-baseline gap-3">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Students</h2>
          <span className="font-body-md text-body-md text-secondary">
            {uniqueStudents.length} unique students enrolled
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between bg-surface-container-lowest border border-border rounded-xl p-4 shadow-sm">
        <div className="flex-1 w-full lg:max-w-md relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-secondary text-[20px]">search</span>
          <input
            className="w-full h-10 pl-10 pr-4 bg-surface-container-lowest border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            placeholder="Search by student name or course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-surface-container-lowest border border-border rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface-container-lowest">
                <th className="px-6 py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Student ID</th>
                <th className="px-6 py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Course</th>
                <th className="px-6 py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Enrolled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-secondary">
                    No students found
                  </td>
                </tr>
              ) : (
                filtered.map((enrollment) => (
                  <tr key={enrollment.id} className="group hover:bg-bg-alt transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-body-md-bold border border-border">
                          {enrollment.student.charAt(0).toUpperCase()}
                        </div>
                        <div className="font-body-md-bold text-on-surface">{enrollment.student}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">{enrollment.course_title}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          enrollment.status === "active"
                            ? "bg-success/10 text-success border border-success/20"
                            : enrollment.status === "rejected"
                              ? "bg-red-100 text-danger border border-red-200"
                              : "bg-warning/10 text-warning border border-warning/20"
                        }`}
                      >
                        {enrollment.status.replace(/_/g, " ")}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-body-md text-secondary">
                      {new Date(enrollment.created_at).toLocaleDateString("en-US", {
                        month: "short", day: "numeric", year: "numeric",
                      })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
