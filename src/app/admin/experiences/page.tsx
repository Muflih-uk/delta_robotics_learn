"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Announcement, Course } from "@/lib/types";

export default function ExperiencesPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);
  const [courseFilter, setCourseFilter] = useState("all");
  const [saving, setSaving] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCourse, setFormCourse] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [announcementsData, coursesData] = await Promise.all([
        api.announcements.list(),
        api.courses.list(),
      ]);
      setAnnouncements(announcementsData);
      setCourses(coursesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load experiences");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormTitle("");
    setFormContent("");
    setFormCourse("");
  }

  function openCreateDrawer() {
    setEditing(null);
    resetForm();
    setIsDrawerOpen(true);
  }

  function openEditDrawer(item: Announcement) {
    setEditing(item);
    setFormTitle(item.title);
    setFormContent(item.content);
    setFormCourse(item.course);
    setIsDrawerOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = { title: formTitle, content: formContent, course: formCourse };
      if (editing) {
        await api.announcements.update(editing.id, payload);
      } else {
        await api.announcements.create(payload);
      }
      setIsDrawerOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save experience");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      await api.announcements.delete(id);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete experience");
    }
  }

  const filtered = announcements.filter((a) => {
    return courseFilter === "all" || a.course === courseFilter;
  });

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-white">
        <div className="p-container-padding max-w-[1440px] mx-auto">
          <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse mb-8" />
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-surface-container-high rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && announcements.length === 0) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button onClick={() => loadData()} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 min-h-screen bg-white">
        <div className="p-container-padding max-w-[1440px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-surface">Experiences</h2>
              <p className="text-on-surface-variant font-body-md text-body-md">
                {announcements.length} announcements • Powered by the Announcements API
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select
                className="h-10 px-3 rounded-lg border border-border bg-white text-body-md focus:ring-1 focus:ring-primary outline-none"
                value={courseFilter}
                onChange={(e) => setCourseFilter(e.target.value)}
              >
                <option value="all">All Courses</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
              <button
                className="h-10 bg-primary-container text-white px-6 rounded-lg font-body-md-bold hover:brightness-110 shadow-sm flex items-center gap-2"
                onClick={openCreateDrawer}
              >
                <span className="material-symbols-outlined">add_circle</span>
                Add Experience
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <span className="material-symbols-outlined text-4xl text-secondary mb-4">vrpano</span>
                <p className="text-center text-secondary">No experiences found</p>
              </div>
            ) : (
              filtered.map((item) => {
                const courseName = courses.find((c) => c.id === item.course)?.title || "Unknown";
                return (
                  <div key={item.id} className="group bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all p-5">
                    <div className="mb-3">
                      <span className="text-[11px] font-bold text-tertiary uppercase tracking-wider bg-tertiary-fixed px-2 py-0.5 rounded">
                        {courseName}
                      </span>
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-on-surface-variant text-body-md font-body-md line-clamp-3 mb-4">
                      {item.content}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-border/50">
                      <span className="text-[11px] text-on-surface-variant font-medium">
                        {new Date(item.created_at).toLocaleDateString("en-US", {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </span>
                      <div className="flex gap-2">
                        <button
                          className="text-primary text-xs font-bold hover:underline"
                          onClick={() => openEditDrawer(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-danger text-xs font-bold hover:underline"
                          onClick={() => handleDelete(item.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm" />
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-[480px] bg-white shadow-2xl transition-transform duration-300 flex flex-col border-l border-border ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="px-6 py-6 border-b border-border flex items-center justify-between bg-bg-alt">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">
                {editing ? "Edit Experience" : "Add New Experience"}
              </h2>
              <p className="text-on-surface-variant text-body-md font-body-md">
                {editing ? "Modify experience details" : "Create a student spotlight"}
              </p>
            </div>
            <button
              className="p-2 hover:bg-surface-container rounded-full transition-all text-on-surface-variant"
              onClick={() => { setIsDrawerOpen(false); setEditing(null); }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
            <div className="space-y-2">
              <label className="font-body-md-bold text-on-surface">Title</label>
              <input
                className="w-full h-10 px-4 rounded-lg border border-border focus:ring-2 focus:ring-primary-container outline-none transition-all font-body-md"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Robot Arm Assembly Showcase"
              />
            </div>
            <div className="space-y-2">
              <label className="font-body-md-bold text-on-surface">Related Course</label>
              <select
                className="w-full h-10 px-4 rounded-lg border border-border focus:ring-2 focus:ring-primary-container outline-none transition-all font-body-md"
                value={formCourse}
                onChange={(e) => setFormCourse(e.target.value)}
              >
                <option value="">Select a course...</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>{c.title}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <label className="font-body-md-bold text-on-surface">Content</label>
              <textarea
                className="w-full p-4 rounded-lg border border-border focus:ring-2 focus:ring-primary-container outline-none transition-all font-body-md resize-none"
                value={formContent}
                onChange={(e) => setFormContent(e.target.value)}
                placeholder="Describe the experience..."
                rows={4}
              />
            </div>
          </div>
          <div className="px-6 py-6 border-t border-border flex gap-3">
            <button
              className="flex-1 px-4 py-2 rounded-lg border border-border font-body-md-bold text-on-surface hover:bg-bg-alt transition-all"
              onClick={() => { setIsDrawerOpen(false); setEditing(null); }}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-4 py-2 rounded-lg bg-primary-container text-white font-body-md-bold hover:brightness-110 shadow-sm transition-all disabled:opacity-50"
              onClick={handleSave}
              disabled={saving || !formTitle || !formContent || !formCourse}
            >
              {saving ? "Saving..." : editing ? "Update" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
