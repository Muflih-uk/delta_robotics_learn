"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import type { Course } from "@/lib/types";

const levelStyles: Record<string, { color: string; badge: string }> = {
  school: { color: "text-green-600 bg-green-50", badge: "School" },
  college: { color: "text-amber-600 bg-amber-50", badge: "College" },
};

const materialIcons: Record<string, string> = {
  video: "play_circle",
  pdf: "description",
};

const courseData: Record<string, Course> = {
  "ros2-intro": {
    id: "ros2-intro", title: "Intro to ROS 2",
    description: "This comprehensive course takes you from ROS 2 fundamentals to advanced robotics application development. You'll learn how to build distributed robotic systems using ROS 2's powerful communication infrastructure. Through hands-on projects, you'll master topics, services, actions, and parameters while building real robot applications. By the end, you'll be able to design, implement, and deploy ROS 2 nodes for autonomous systems.",
    level: "college", price: "1299.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzNA9wx-SR0bqA0pNKUNtz6mvtOuUhSBOlwAMWlHe7cMTmkte5-Une9wUepzHp_rTWSIGkBc_w2vee1LvXasW3w2F-n_JxvDeXGI0okjNUHROCY7oaRfglA7QW1uZj8ZzMz_RBm4VEUAr5gD8BMYhmuT28xZBbiSDMTP8BG6Uw1Ez3BsJsfx6ZNIf9PF65Z5kPijKz0KfEeCuT8bq_ibmw5tzhVW9buYIZuV-YT8XNZ_AIIGlzwXte8g",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [
      { id: "m1", course: "ros2-intro", type: "video", title: "Introduction to ROS 2 Ecosystem", url: "https://youtube.com/example1", order_index: 1, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
      { id: "m2", course: "ros2-intro", type: "video", title: "Workspace Setup & Colcon Build", url: "https://youtube.com/example2", order_index: 2, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
      { id: "m3", course: "ros2-intro", type: "video", title: "Nodes, Topics & Publishers/Subscribers", url: "https://youtube.com/example3", order_index: 3, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
      { id: "m4", course: "ros2-intro", type: "video", title: "Services & Clients", url: "https://youtube.com/example4", order_index: 4, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
      { id: "m5", course: "ros2-intro", type: "video", title: "Actions & Action Servers", url: "https://youtube.com/example5", order_index: 5, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
      { id: "m6", course: "ros2-intro", type: "pdf", title: "ROS 2 Cheatsheet", url: "https://example.com/ros2-cheatsheet.pdf", order_index: 6, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
    ],
    announcements: [
      { id: "a1", course: "ros2-intro", title: "Welcome to ROS 2", content: "Please complete the setup guide before starting module 1.", created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
    ],
    feedback: [
      { id: "f1", course: "ros2-intro", student: "Alex M.", rating: 5, comment: "Best ROS 2 course I've taken. The hands-on projects really cemented the concepts.", created_at: "2026-07-06T10:00:00Z" },
      { id: "f2", course: "ros2-intro", student: "Priya K.", rating: 5, comment: "Excellent structure. The progression from basics to capstone is very well paced.", created_at: "2026-07-06T10:00:00Z" },
      { id: "f3", course: "ros2-intro", student: "James W.", rating: 4, comment: "Great content. Would love more advanced examples in future updates.", created_at: "2026-07-06T10:00:00Z" },
    ],
  },
  "computer-vision": {
    id: "computer-vision", title: "Computer Vision Basics",
    description: "Dive into the world of computer vision with a focus on robotics applications. This course covers image processing fundamentals, feature detection, object recognition, and 3D vision techniques. Using OpenCV and deep learning frameworks, you'll build vision systems that can detect, track, and interpret visual information in real-time environments.",
    level: "college", price: "950.00",
    thumbnail_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCHUwCJgyFV3EO_osRDHCBtmDC31vl0d2nLbfqHzMZ4nPdGh-G0ACyhMQmSPjUu7jNC6au5yXnfLcISeSPNaXB9uWAwOYgMqi74-hOxUKrZVLhO0rUrSH5ZBPHyrqsHDe2wnxXOmLKpAA_3tZOUYk3Rk7ZNbvzi4ASOnoEiAaSaRkrP8V7D7vVKb1p8WcpHhjmywF3tuGeEfrYITdv__o_zvKxnAITSbkpD9kZMK71FT9ayv54esgUaWw",
    is_published: true, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z", updated_at: "2026-07-06T10:00:00Z",
    materials: [
      { id: "m7", course: "computer-vision", type: "video", title: "Digital Image Representation", url: "", order_index: 1, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
      { id: "m8", course: "computer-vision", type: "video", title: "Color Spaces & Transformations", url: "", order_index: 2, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
      { id: "m9", course: "computer-vision", type: "video", title: "Feature Detection (Harris, SIFT)", url: "", order_index: 3, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
      { id: "m10", course: "computer-vision", type: "video", title: "Object Detection with YOLO", url: "", order_index: 4, created_by: "uuid-1", created_at: "2026-07-06T10:00:00Z" },
    ],
    announcements: [],
    feedback: [
      { id: "f4", course: "computer-vision", student: "Maria G.", rating: 5, comment: "Incredible depth for an introductory course. The YOLO module was fantastic.", created_at: "2026-07-06T10:00:00Z" },
      { id: "f5", course: "computer-vision", student: "Tom L.", rating: 4, comment: "Well structured. Could use more practical exercises.", created_at: "2026-07-06T10:00:00Z" },
    ],
  },
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
  const id = params.id as string;
  const [activeTab, setActiveTab] = useState<"about" | "materials" | "reviews">("about");

  const course = courseData[id];

  if (!course) {
    return (
      <main className="flex-1 p-4 md:p-10 bg-background min-h-screen max-w-[1440px] mx-auto w-full">
        <div className="text-center py-20">
          <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4">help</span>
          <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Course Not Found</h1>
          <p className="text-body-md text-on-surface-variant mb-6">The course you're looking for doesn't exist.</p>
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
              <Link
                href={`/student/courses/${course.id}/enroll`}
                className="block w-full text-center bg-primary-container text-on-primary rounded-lg px-6 py-3 font-bold hover:bg-primary transition-colors"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
