"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Course, Enrollment, EnrollmentStatus } from "@/lib/types";

const levelLabels: Record<string, string> = {
  school: "School",
  college: "College",
};

const statusConfig: Record<EnrollmentStatus, { label: string; icon: string; color: string }> = {
  pending_payment: { label: "Pending Payment", icon: "hourglass_empty", color: "text-amber-600 bg-amber-50" },
  payment_verification: { label: "Payment Verification", icon: "hourglass_top", color: "text-blue-600 bg-blue-50" },
  pending_enrollment: { label: "Pending Approval", icon: "pending", color: "text-orange-600 bg-orange-50" },
  active: { label: "Enrolled", icon: "check_circle", color: "text-green-600 bg-green-50" },
  rejected: { label: "Rejected", icon: "cancel", color: "text-red-600 bg-red-50" },
};

export default function EnrollPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const [course, setCourse] = useState<Pick<Course, "id" | "title" | "thumbnail_url" | "price" | "level"> | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    setLoadingCourse(true);
    api.courses.get(id)
      .then((c) => setCourse(c))
      .catch((err) => setError(err.message || "Failed to load course"))
      .finally(() => setLoadingCourse(false));
  }, [id]);

  const handleEnroll = async () => {
    if (!course) return;
    setEnrolling(true);
    setError("");

    try {
      const result = await api.enrollments.enroll(course.id);
      setEnrollment(result);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Enrollment failed. Please try again.";
      setError(msg);
    } finally {
      setEnrolling(false);
    }
  };

  if (loadingCourse) {
    return (
      <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full animate-pulse">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          <div className="flex-1 space-y-4">
            <div className="h-6 bg-surface-container rounded w-1/3" />
            <div className="h-8 bg-surface-container rounded w-2/3" />
            <div className="h-4 bg-surface-container rounded w-1/2" />
          </div>
          <div className="w-full lg:w-72 shrink-0">
            <div className="h-32 bg-surface-container rounded-xl mb-4" />
            <div className="h-20 bg-surface-container rounded-xl" />
          </div>
        </div>
      </main>
    );
  }

  if (!course) {
    return (
      <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full">
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">help</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Course Not Found</h1>
          <Link href="/student/courses" className="bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold inline-block mt-4">
            Browse Courses
          </Link>
        </div>
      </main>
    );
  }

  if (enrollment) {
    const status = statusConfig[enrollment.status];
    return (
      <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full flex items-center justify-center">
        <div className="max-w-md text-center bg-surface-container-lowest border border-border rounded-xl p-10 shadow-[0_4px_20px_rgba(0,0,0,0.06)]">
          <div className={`w-16 h-16 rounded-full ${status.color} flex items-center justify-center mx-auto mb-6`}>
            <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>{status.icon}</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Enrollment Submitted</h1>
          <p className="text-body-md text-on-surface-variant mb-4">
            You're enrolled in <strong className="text-on-surface">{enrollment.course_title}</strong>.
            Current status: <span className="font-semibold">{status.label}</span>.
          </p>
          <p className="text-label-sm text-on-surface-variant mb-6">Check your email for confirmation and next steps.</p>
          <Link href={`/student/learning/${enrollment.course}`} className="block w-full bg-primary-container text-on-primary rounded-lg px-6 py-3 font-bold hover:bg-primary transition-colors mb-3">
            Start Learning
          </Link>
          <Link href="/student/dashboard" className="block text-center text-primary-container text-sm font-medium hover:underline">
            Go to Dashboard
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full">
      <div className="mb-6">
        <Link href={`/student/courses/${course.id}`} className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Course
        </Link>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1">
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">Enroll in {course.title}</h1>
          <p className="text-body-md text-on-surface-variant mb-8">
            You're about to enroll in this course. Complete your enrollment below to get started.
          </p>

          {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <button
            onClick={handleEnroll}
            disabled={enrolling}
            className="w-full sm:w-auto bg-primary-container text-on-primary rounded-lg px-8 py-3 font-bold text-base hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {enrolling ? (
              <>
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">how_to_reg</span>
                Enroll Now &mdash; ${parseFloat(course.price).toLocaleString()}
              </>
            )}
          </button>
        </div>

        <div className="w-full lg:w-72 shrink-0">
          <div className="bg-surface-container-lowest border border-border rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
            <div className="h-32 overflow-hidden">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${course.thumbnail_url}')` }} />
            </div>
            <div className="p-4">
              <h3 className="font-headline-md text-headline-md text-on-surface mb-1">{course.title}</h3>
              <div className="text-label-sm text-on-surface-variant mb-3">{levelLabels[course.level] || course.level} Level</div>
              <div className="border-t border-border pt-3">
                <div className="flex justify-between font-headline-md text-headline-md">
                  <span className="text-on-surface">Price</span>
                  <span className="text-primary-container">${parseFloat(course.price).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
