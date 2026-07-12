"use client";

import { useState } from "react";
import Link from "next/link";

export default function StudentExperiencePage() {
  const [formData, setFormData] = useState({
    title: "",
    course: "",
    shortDesc: "",
    review: "",
  });

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

        <form className="p-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
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
                <option value="ros2-intro">Intro to ROS 2</option>
                <option value="computer-vision">Computer Vision Basics</option>
                <option value="autonomous-systems">Autonomous Systems</option>
                <option value="robotics-101">Robotics Fundamentals</option>
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
              Submit Experience
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
