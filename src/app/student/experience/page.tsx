"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { api } from "@/lib/api";
import type { Course } from "@/lib/types";

export default function StudentExperiencePage() {
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    shortDesc: "",
    review: "",
  });
  const [courses, setCourses] = useState<Course[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    api.courses.list()
      .then(setCourses)
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.course || !formData.shortDesc) return;
    setSubmitting(true);
    setFeedback("");
    try {
      // Submit as feedback to the course (experience = course feedback + gallery)
      // For now, we submit feedback. Gallery image upload would need a file upload endpoint.
      await api.announcements.create({
        course: formData.course,
        title: formData.title,
        content: `${formData.shortDesc}\n\n${formData.review}`,
      });
      setSubmitted(true);
      setFormData({ title: "", course: "", shortDesc: "", review: "" });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Submission failed";
      setFeedback(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-container-padding max-w-[1440px] mx-auto w-full">
      <div className="mb-8">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">My Experience</h2>
        <p className="text-on-surface-variant font-body-md text-body-md">
          Share your robotics journey, project outcomes, and feedback with us.
        </p>
      </div>

      <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden max-w-3xl">
        <div className="p-6 border-b border-border bg-surface-container-lowest">
          <h3 className="font-headline-md text-headline-md text-on-surface">Experience Submission</h3>
          <p className="text-body-md text-on-surface-variant mt-1">
            Fill out the details below. This will be reviewed by admins before appearing in the gallery.
          </p>
        </div>

        {submitted ? (
          <div className="p-10 text-center">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-success text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface mb-2">Experience Submitted</h3>
            <p className="text-body-md text-on-surface-variant mb-6">Your experience has been submitted for review. It will appear in the gallery after approval.</p>
            <Link href="/student/dashboard" className="bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold">Go to Dashboard</Link>
          </div>
        ) : (
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">
              Experience Title <span className="text-error">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., My First Autonomous Robot"
              className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all placeholder:text-on-surface-variant/50"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">
              Related Course <span className="text-error">*</span>
            </label>
            <div className="relative">
              <select
                className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all appearance-none"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                required
              >
                <option value="" disabled>Select a course</option>
                {courses.filter(c => c.is_published).map(c => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">
              Short Description <span className="text-error">*</span>
            </label>
            <p className="text-[11px] text-on-surface-variant mb-2">A brief one-sentence summary of your project or experience.</p>
            <textarea
              placeholder="Briefly describe what you built or learned..."
              className="w-full h-24 p-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-on-surface-variant/50"
              value={formData.shortDesc}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider block flex justify-between">
              <span>Student Review</span>
              <span className="text-on-surface-variant font-normal">{formData.review.length}/500</span>
            </label>
            <p className="text-[11px] text-on-surface-variant mb-2">Detailed feedback on the course and your learning outcomes.</p>
            <textarea
              placeholder="Share your thoughts..."
              maxLength={500}
              className="w-full h-32 p-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all resize-none placeholder:text-on-surface-variant/50"
              value={formData.review}
              onChange={(e) => setFormData({ ...formData, review: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">
              Media Upload
            </label>
            <p className="text-[11px] text-on-surface-variant mb-2">Upload images or videos of your project (Max 5MB per file).</p>
            <div className="border-2 border-dashed border-border rounded-xl p-8 text-center bg-surface-container-lowest hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="w-12 h-12 mx-auto mb-3 bg-surface-container rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-secondary">cloud_upload</span>
              </div>
              <p className="font-body-md-bold text-on-surface mb-1">Click to upload or drag and drop</p>
              <p className="text-xs text-on-surface-variant">SVG, PNG, JPG or GIF</p>
            </div>
          </div>

          <div className="pt-6 border-t border-border flex gap-3 justify-end">
            <Link
              href="/student/dashboard"
              className="px-6 py-2.5 rounded-lg border border-border font-body-md-bold text-on-surface hover:bg-surface-container-low transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-primary-container text-white font-body-md-bold hover:brightness-110 shadow-sm transition-all"
            >
              {submitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </span>
              ) : "Submit Experience"}
            </button>
          </div>
          {feedback && (
            <div className="pt-0 pb-4 px-6">
              <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">error</span>
                {feedback}
              </div>
            </div>
          )}
        </form>
        )}
      </div>
    </div>
  );
}
