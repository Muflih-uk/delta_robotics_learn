"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Enrollment, Workshop } from "@/lib/types";

export default function StudentDashboardPage() {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      api.enrollments.myEnrollments(),
      api.workshops.list(),
    ])
      .then(([enr, ws]) => {
        setEnrollments(enr);
        setWorkshops(ws.filter(w => w.status === "upcoming"));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const activeEnrollments = enrollments.filter(e => e.status === "active");
  const upcomingWorkshops = workshops.slice(0, 2);

  return (
    <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
        <div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Welcome back, {user?.first_name || "there"}.</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">Your robotics learning journey is looking solid today.</p>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <div className="relative">
            <span className="material-symbols-outlined text-secondary cursor-pointer hover:text-primary-container">notifications</span>
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary-container rounded-full"></span>
          </div>
          {user?.avatar_url ? (
            <img
              alt="User profile"
              className="w-10 h-10 rounded-full object-cover shadow-sm"
              src={user.avatar_url}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary-container">person</span>
            </div>
          )}
        </div>
      </div>

      {/* Bento Grid Layout */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12 animate-pulse">
          <div className="md:col-span-8 bg-surface-container-lowest border border-border rounded-xl p-6 h-48" />
          <div className="md:col-span-4 bg-surface-bright border border-border rounded-xl p-6 h-48" />
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
        {/* Learning Stats (Span 8) */}
        <div className="md:col-span-8 bg-surface-container-lowest border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <h2 className="font-headline-md text-headline-md text-on-surface mb-6">Learning Activity</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Enrolled Courses</div>
              <div className="font-headline-lg text-headline-lg text-primary-container mt-1">{enrollments.length}</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Active</div>
              <div className="font-headline-lg text-headline-lg text-on-surface mt-1">{activeEnrollments.length}</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Pending</div>
              <div className="font-headline-lg text-headline-lg text-on-surface mt-1">{enrollments.filter(e => e.status === "pending_payment" || e.status === "pending_enrollment").length}</div>
            </div>
            <div>
              <div className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">Workshops</div>
              <div className="font-headline-lg text-headline-lg text-primary-container mt-1 flex items-baseline gap-1">
                {workshops.length} <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>local_fire_department</span>
              </div>
            </div>
          </div>
          <div className="mt-12 w-full h-32 bg-surface-container rounded-lg relative overflow-hidden flex items-end px-4 gap-2">
            <div className="flex-1 bg-primary-container rounded-t-sm h-1/4 opacity-40"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-2/4 opacity-60"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-1/3 opacity-40"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-3/4 opacity-80"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-full"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-2/3 opacity-60"></div>
            <div className="flex-1 bg-primary-container rounded-t-sm h-1/2 opacity-40"></div>
          </div>
        </div>

        {/* Upcoming (Span 4) */}
        <div className="md:col-span-4 bg-surface-bright border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-headline-md text-headline-md text-on-surface">Upcoming Workshops</h2>
            <span className="material-symbols-outlined text-secondary">calendar_today</span>
          </div>
          <div className="flex flex-col gap-3">
            {upcomingWorkshops.length === 0 ? (
              <p className="text-body-md text-on-surface-variant text-center py-4">No upcoming workshops.</p>
            ) : (
              upcomingWorkshops.map((ws) => (
                <div key={ws.id} className="p-3 bg-surface-container-low rounded-lg border-l-4 border-primary-container">
                  <div className="font-label-sm text-label-sm text-primary-container mb-1">
                    {new Date(ws.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  <div className="font-body-md text-body-md font-semibold text-on-surface">{ws.title}</div>
                  <div className="font-label-sm text-label-sm text-secondary mt-1">{ws.location}</div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
      )}

      {/* My Courses */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-headline-lg text-headline-lg text-on-surface">My Enrolled Courses</h2>
          <Link className="font-label-sm text-label-sm text-primary-container hover:underline flex items-center gap-1" href="/student/courses">
            Browse All <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enrollments.length === 0 && !loading && (
            <div className="bg-surface-container-lowest border-2 border-dashed border-surface-variant rounded-xl p-6 flex flex-col justify-center items-center text-center hover:bg-surface-container-low transition-colors cursor-pointer min-h-[300px] col-span-full">
              <div className="w-16 h-16 rounded-full bg-primary-fixed flex items-center justify-center mb-4">
                <span className="material-symbols-outlined text-primary-container text-3xl">explore</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Enroll in Your First Course</h3>
              <p className="font-body-md text-body-md text-on-surface-variant mb-6 text-sm max-w-[200px]">Browse our catalog and start your robotics journey.</p>
              <Link href="/student/courses" className="bg-primary-container text-on-primary font-bold rounded-lg px-6 py-2 hover:bg-primary transition-colors font-label-sm inline-block">
                Browse Catalog
              </Link>
            </div>
          )}
          {enrollments.slice(0, 3).map((enrollment) => (
            <div key={enrollment.id} className="bg-surface-container-lowest border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)] flex flex-col">
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex gap-2 mb-3">
                  <span className={`px-2 py-1 rounded-sm font-label-sm text-[10px] uppercase font-bold ${
                    enrollment.status === "active" ? "bg-success/10 text-success" :
                    enrollment.status === "rejected" ? "bg-destructive/10 text-destructive" :
                    "bg-primary-fixed text-on-primary-fixed"
                  }`}>
                    {enrollment.status.replace(/_/g, " ")}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{enrollment.course_title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant mb-6 flex-1 text-sm">
                  {enrollment.status === "active" ? "You are enrolled and can start learning." :
                   enrollment.status === "pending_payment" ? "Payment is pending. Complete payment to start." :
                   "Waiting for approval."}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
