"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";
import type { Course } from "@/lib/types";

const levelStyles: Record<string, { color: string; badge: string }> = {
  school: { color: "text-green-600 bg-green-50", badge: "School" },
  college: { color: "text-amber-600 bg-amber-50", badge: "College" },
};

const materialIcons: Record<string, string> = {
  video: "play_circle",
  pdf: "description",
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => {
        const icon = i < rating ? "star" : "star_outline";
        return (
          <span key={i} className="material-symbols-outlined text-amber-400 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
            {icon}
          </span>
        );
      })}
    </div>
  );
}

export default function CourseDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const id = params.id as string;
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"about" | "materials" | "reviews">("about");

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError("");
    api.courses.get(id)
      .then(setCourse)
      .catch((err) => setError(err.message || "Failed to load course"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full animate-pulse">
        <div className="h-64 md:h-80 bg-surface-container rounded-xl mb-8" />
        <div className="max-w-4xl space-y-4">
          <div className="h-8 bg-surface-container rounded w-1/2" />
          <div className="h-4 bg-surface-container rounded w-3/4" />
          <div className="h-4 bg-surface-container rounded w-full" />
          <div className="h-4 bg-surface-container rounded w-2/3" />
        </div>
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full">
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">help</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">{error ? "Error Loading Course" : "Course Not Found"}</h1>
          <p className="text-body-md text-on-surface-variant mb-6">{error || "The course you're looking for doesn't exist."}</p>
          {error && (
            <button onClick={() => window.location.reload()} className="bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold mr-3">Retry</button>
          )}
          <Link href="/student/courses" className="bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold">
            Browse Courses
          </Link>
        </div>
      </main>
    );
  }

  const levelStyle = levelStyles[course.level] || levelStyles.college;
  const avgRating = course.feedback.length
    ? Math.round(course.feedback.reduce((s, f) => s + f.rating, 0) / course.feedback.length)
    : 0;

  return (
    <main className="flex-1 bg-background min-h-screen">
      <div className="max-w-[1440px] mx-auto">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${course.thumbnail_url}')` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${levelStyle.color}`}>{levelStyle.badge}</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg md:text-4xl text-white font-bold mb-2">{course.title}</h1>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 p-4 md:p-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
              {(["about", "materials", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`font-body-md-bold capitalize pb-4 -mb-4 border-b-2 transition-colors ${
                    activeTab === tab ? "border-primary-container text-primary-container" : "border-transparent text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {tab === "materials" ? `Materials (${course.materials.length})` : tab === "reviews" ? `Reviews (${course.feedback.length})` : tab}
                </button>
              ))}
            </div>

            {activeTab === "about" && (
              <div>
                <p className="text-body-md text-on-surface-variant leading-relaxed mb-8">{course.description}</p>
                {course.announcements.length > 0 && (
                  <div className="mb-8">
                    <h3 className="font-headline-md text-headline-md text-on-surface mb-4">Announcements</h3>
                    {course.announcements.map((a) => (
                      <div key={a.id} className="p-4 bg-primary-fixed/30 border border-primary-fixed rounded-lg mb-3">
                        <div className="font-body-md-bold text-on-surface mb-1">{a.title}</div>
                        <p className="text-body-md text-on-surface-variant">{a.content}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === "materials" && (
              <div className="space-y-2">
                {course.materials.sort((a, b) => a.order_index - b.order_index).map((m, i) => (
                  <div key={m.id} className="flex items-center gap-4 p-4 bg-surface-container-lowest border border-border rounded-xl hover:bg-surface-container-low transition-colors">
                    <span className="w-8 h-8 rounded-full bg-primary-container/10 flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-primary-container text-sm">{materialIcons[m.type] || "article"}</span>
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="font-body-md-bold text-on-surface truncate">{m.title}</div>
                      <div className="text-label-sm text-on-surface-variant capitalize">{m.type} &bull; Lesson {i + 1}</div>
                    </div>
                    {m.url && (
                      <a href={m.url} target="_blank" rel="noopener noreferrer" className="text-primary-container text-sm font-medium hover:underline shrink-0">
                        Open
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-4">
                {course.feedback.length === 0 && (
                  <p className="text-body-md text-on-surface-variant">No reviews yet.</p>
                )}
                {course.feedback.map((f) => (
                  <div key={f.id} className="p-5 bg-surface-container-lowest border border-border rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-primary-container/20 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary-container text-sm">person</span>
                      </div>
                      <div>
                        <div className="font-body-md-bold text-on-surface">{f.student}</div>
                      </div>
                      <div className="ml-auto">
                        <StarRating rating={f.rating} />
                      </div>
                    </div>
                    <p className="text-body-md text-on-surface-variant">{f.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 bg-surface-container-lowest border border-border rounded-xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
              <div className="text-3xl font-bold text-on-surface mb-1">${parseFloat(course.price).toLocaleString()}</div>
              <div className="text-label-sm text-on-surface-variant mb-6">One-time payment &mdash; full access</div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm text-primary-container">signal_cellular_alt</span>
                  {levelStyle.badge} Level
                </div>
                <div className="flex items-center gap-3 text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm text-primary-container">play_circle</span>
                  {course.materials.length} materials
                </div>
                <div className="flex items-center gap-3 text-body-md text-on-surface-variant">
                  <span className="material-symbols-outlined text-sm text-primary-container">rate_review</span>
                  {avgRating > 0 ? `${avgRating}/5 (${course.feedback.length} reviews)` : "No reviews"}
                </div>
              </div>
              {user ? (
                <Link
                  href={`/student/courses/${course.id}/enroll`}
                  className="block w-full text-center bg-primary-container text-on-primary rounded-lg px-6 py-3 font-bold hover:bg-primary transition-colors"
                >
                  Enroll Now
                </Link>
              ) : (
                <button
                  onClick={() => router.push(`/login?redirect=/student/courses/${course.id}`)}
                  className="block w-full text-center bg-primary-container text-on-primary rounded-lg px-6 py-3 font-bold hover:bg-primary transition-colors cursor-pointer"
                >
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
