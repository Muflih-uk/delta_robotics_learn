"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
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

const courseData: Record<string, Pick<Course, "id" | "title" | "thumbnail_url" | "price" | "level">> = {
  "ros2-intro": { id: "ros2-intro", title: "Intro to ROS 2", thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzNA9wx-SR0bqA0pNKUNtz6mvtOuUhSBOlwAMWlHe7cMTmkte5-Une9wUepzHp_rTWSIGkBc_w2vee1LvXasW3w2F-n_JxvDeXGI0okjNUHROCY7oaRfglA7QW1uZj8ZzMz_RBm4VEUAr5gD8BMYhmuT28xZBbiSDMTP8BG6Uw1Ez3BsJsfx6ZNIf9PF65Z5kPijKz0KfEeCuT8bq_ibmw5tzhVW9buYIZuV-YT8XNZ_AIIGlzwXte8g", price: "1299.00", level: "college" },
  "computer-vision": { id: "computer-vision", title: "Computer Vision Basics", thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHUwCJgyFV3EO_osRDHCBtmDC31vl0d2nLbfqHzMZ4nPdGh-G0ACyhMQmSPjUu7jNC6au5yXnfLcISeSPNaXB9uWAwOYgMqi74-hOxUKrZVLhO0rUrSH5ZBPHyrqsHDe2wnxXOmLKpAA_3tZOUYk3Rk7ZNbvzi4ASOnoEiAaSaRkrP8V7D7vVKb1p8WcpHhjmywF3tuGeEfrYITdv__o_zvKxnAITSbkpD9kZMK71FT9ayv54esgUaWw", price: "950.00", level: "college" },
  "autonomous-systems": { id: "autonomous-systems", title: "Autonomous Systems", thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuB8rU-AuFg-E3xxCpg-65018qlDDpkG86vxs7oF6a2oQ99Eg1VQAHd_p9wqOriPJKOf3Y2NbewK05IgAO79_pdH6FpM7bmowyL4wkbMgnJT2MkzYzN7xMLJiylGfQ0TwzNA-YUUC6yNe3Y7W71GgPB1V2mode40Ifz2bWEdXDiUcDr_oXsWKZWR03VfRf0aWW2XT4HqA3JIHWH0fAWwWDY3QlUnc5uufYAIf4sRxrrUaktDCcw-DwsyKw", price: "1499.00", level: "college" },
  "neural-networks": { id: "neural-networks", title: "Neural Networks for Robotics", thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBjjX2xYVg2JEG8D4ABhKHwlmPTVT-u4QBUFASemqKzL4uRbdC_XElarJiz_fm9iWkl1hFwKkLRCHpSu1TkrJdstHHqSdp2sLpcxqml1E3b8fwWxVVR3sG8KuIsa2emk8-xtx1X-aUQTJsgRVUT2brSI4wqsxPXTH9fTgEK4LX6-ytJr8C-LszZ-NnDfOt8VV1ST3oV7BoVgCWxUWCW2LLjc9xE1szSht2zs9NJ5zaQpZKmmnwa6Z91Dw", price: "1100.00", level: "college" },
  "embedded-iot": { id: "embedded-iot", title: "Embedded IoT Systems", thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuA3hYdlv0eLw27hXCwYMFf9-_ck5XUIlzaRKxLw7k94CDjmrYYYVyUxhnxf5a0MX5PSvBKCSgCaIm7ohBKoOjYUoQRWc-aI9kvRiJDR-y7sTS67-9IX_1yFDs4kdxdSmpmDTO1UL9JEkX8EGbn-6bp2LanxjSDBShafAiwVluRdzZBAim7ozAm8bE3s3LXpR_nCVhgG8YW2xg5iS-3bZxej-pdqW9fv_RW_vKpBFCPrZPpciViq0VlPCA", price: "800.00", level: "college" },
  "industrial-automation": { id: "industrial-automation", title: "Industrial Automation", thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCLAH0NJuVPLTVglGCTXv3Jp_J92mKtDa0LOnQdsLNeWzYr3-ytNX1RxpFN5HoJ5fkG5ZjDkpJwI4omdYpZbRZMQDsHKpX8I9aX-mijNdtjEJIbYYEXJa7zSkMhIwO586lIPVv-aeDJQ9nL78QODDC-GrMBFTD68BP6sAa0iWHmQzuItrfxOh0vprD3uHIuZ85I9T8b-DLTDi4JT0U8leHfMQUPViCGMSUQIQ1C6C3KjZA0pmIKnjIHVA", price: "1500.00", level: "college" },
  "sensor-fusion": { id: "sensor-fusion", title: "Sensor Fusion & Estimation", thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzNA9wx-SR0bqA0pNKUNtz6mvtOuUhSBOlwAMWlHe7cMTmkte5-Une9wUepzHp_rTWSIGkBc_w2vee1LvXasW3w2F-n_JxvDeXGI0okjNUHROCY7oaRfglA7QW1uZj8ZzMz_RBm4VEUAr5gD8BMYhmuT28xZBbiSDMTP8BG6Uw1Ez3BsJsfx6ZNIf9PF65Z5kPijKz0KfEeCuT8bq_ibmw5tzhVW9buYIZuV-YT8XNZ_AIIGlzwXte8g", price: "1050.00", level: "college" },
  "robotics-101": { id: "robotics-101", title: "Robotics Fundamentals", thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHUwCJgyFV3EO_osRDHCBtmDC31vl0d2nLbfqHzMZ4nPdGh-G0ACyhMQmSPjUu7jNC6au5yXnfLcISeSPNaXB9uWAwOYgMqi74-hOxUKrZVLhO0rUrSH5ZBPHyrqsHDe2wnxXOmLKpAA_3tZOUYk3Rk7ZNbvzi4ASOnoEiAaSaRkrP8V7D7vVKb1p8WcpHhjmywF3tuGeEfrYITdv__o_zvKxnAITSbkpD9kZMK71FT9ayv54esgUaWw", price: "650.00", level: "school" },
};

export default function EnrollPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const course = courseData[id];
  const [loading, setLoading] = useState(false);
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [error, setError] = useState("");

  const handleEnroll = async () => {
    setLoading(true);
    setError("");

    try {
      const mockEnrollment: Enrollment = {
        id: "enr-" + Date.now(),
        student: "student-uuid",
        course: course.id,
        course_title: course.title,
        status: "pending_payment",
        approved_by: null,
        approved_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      setEnrollment(mockEnrollment);
    } catch {
      setError("Enrollment failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
            disabled={loading}
            className="w-full sm:w-auto bg-primary-container text-on-primary rounded-lg px-8 py-3 font-bold text-base hover:bg-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading ? (
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
