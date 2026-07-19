"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Course, Enrollment } from "@/lib/types";

export default function ReportsPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState("Last 6 Months");

  useEffect(() => {
    async function load() {
      try {
        const [coursesData, enrollmentsData] = await Promise.all([
          api.courses.list(),
          api.enrollments.myEnrollments(),
        ]);
        setCourses(coursesData);
        setEnrollments(enrollmentsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load reports");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-container-padding bg-background">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse" />
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-surface-container-high rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 overflow-y-auto p-container-padding bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const totalEnrolled = enrollments.length;

  return (
    <div className="flex-1 overflow-y-auto p-container-padding bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">Reports &amp; Analytics</h2>
            <p className="font-body-md text-body-md text-secondary">Comprehensive overview of system performance and growth.</p>
          </div>
          <button className="flex items-center gap-2 px-4 h-10 rounded-lg bg-surface-container-lowest border border-border text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors">
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            Export PDF
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-surface-container-lowest rounded-xl border border-border p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="font-body-md text-body-md text-secondary">Total Courses</span>
              <span className="material-symbols-outlined text-primary bg-primary-fixed/30 p-1.5 rounded-lg">menu_book</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">{courses.length}</h3>
          </div>
          <div className="bg-surface-container-lowest rounded-xl border border-border p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="font-body-md text-body-md text-secondary">Active Students</span>
              <span className="material-symbols-outlined text-tertiary bg-tertiary-fixed/30 p-1.5 rounded-lg">groups</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">{activeEnrollments.length}</h3>
          </div>
          <div className="bg-surface-container-lowest rounded-xl border border-border p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="font-body-md text-body-md text-secondary">Total Enrollments</span>
              <span className="material-symbols-outlined text-on-primary-fixed-variant bg-surface-container/50 p-1.5 rounded-lg">check_circle</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">{totalEnrolled}</h3>
          </div>
          <div className="bg-surface-container-lowest rounded-xl border border-border p-5 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <span className="font-body-md text-body-md text-secondary">Platform Health</span>
              <span className="material-symbols-outlined text-success bg-success/10 p-1.5 rounded-lg">check_circle</span>
            </div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">Online</h3>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="bg-surface-container-lowest rounded-xl border border-border p-6 shadow-sm lg:col-span-2 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Enrollment Trends</h3>
              <select className="h-8 pl-3 pr-8 rounded-lg border border-border bg-background font-label-sm text-label-sm text-on-surface focus:ring-primary-container focus:border-primary-container" value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                <option>Last 6 Months</option>
                <option>This Year</option>
              </select>
            </div>
            <div className="flex-1 min-h-[250px] relative border-b border-l border-border/50">
              <div className="absolute inset-0 flex items-end justify-between px-4 pb-2 gap-4">
                {[20, 40, 35, 70, 55, 90].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary-container rounded-t-sm" style={{ height: `${h}%` }} />
                ))}
              </div>
              <div className="absolute -bottom-6 left-0 right-0 flex justify-between font-label-sm text-label-sm text-secondary px-4">
                <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl border border-border p-6 shadow-sm flex flex-col items-center">
            <h3 className="font-headline-sm text-headline-sm text-on-surface w-full text-left mb-6">Course Distribution</h3>
            <div className="w-full flex-1 flex items-end justify-around gap-8 mb-6 px-4">
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-primary-container rounded-t-sm" style={{ height: `${courses.filter(c => c.level === "school").length / Math.max(courses.length, 1) * 100}%` }} />
                <span className="font-label-sm text-label-sm text-secondary">School</span>
              </div>
              <div className="flex flex-col items-center gap-2 w-full">
                <div className="w-full bg-tertiary-fixed rounded-t-sm" style={{ height: `${courses.filter(c => c.level === "college").length / Math.max(courses.length, 1) * 100}%` }} />
                <span className="font-label-sm text-label-sm text-secondary">College</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-xl border border-border shadow-sm overflow-hidden flex flex-col">
          <div className="p-5 border-b border-border flex justify-between items-center bg-surface-container-lowest">
            <h3 className="font-headline-sm text-headline-sm text-on-surface">Courses</h3>
          </div>
          <div className="overflow-x-auto w-full">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-bg-alt">
                  <th className="py-3 px-5 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Course Name</th>
                  <th className="py-3 px-5 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Category</th>
                  <th className="py-3 px-5 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Price</th>
                  <th className="py-3 px-5 font-label-sm text-label-sm text-secondary uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="font-body-md text-body-md divide-y divide-border">
                {courses.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-8 px-5 text-center text-secondary">No courses available</td>
                  </tr>
                ) : (
                  courses.map((course) => (
                    <tr key={course.id} className="hover:bg-bg-alt transition-colors">
                      <td className="py-4 px-5 text-on-surface font-body-md-bold">{course.title}</td>
                      <td className="py-4 px-5 text-secondary">{course.level}</td>
                      <td className="py-4 px-5 text-on-surface">${course.price}</td>
                      <td className="py-4 px-5">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${course.is_published ? "bg-green-100 text-success" : "bg-yellow-100 text-warning"}`}>
                          {course.is_published ? "Published" : "Draft"}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
