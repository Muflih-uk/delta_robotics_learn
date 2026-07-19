"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Course, CourseLevel, CourseCreateRequest } from "@/types";
import { PageHeader } from "@/components/shared/PageHeader";
import { FilterBar } from "@/components/shared/FilterBar";
import { EmptyState } from "@/components/shared/EmptyState";
import { CourseCard } from "@/components/cards/CourseCard";
export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [search, setSearch] = useState("");
  const [levelFilter, setLevelFilter] = useState<CourseLevel | "all">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formLevel, setFormLevel] = useState<CourseLevel>("school");
  const [formPrice, setFormPrice] = useState("");
  const [formPublished, setFormPublished] = useState(false);
  const [formThumbnail, setFormThumbnail] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadCourses();
  }, []);

  async function loadCourses() {
    try {
      setLoading(true);
      const data = await api.courses.list();
      setCourses(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load courses");
    } finally {
      setLoading(false);
    }
  }

  function openCreateDrawer() {
    setEditingCourse(null);
    setFormTitle("");
    setFormDescription("");
    setFormLevel("school");
    setFormPrice("");
    setFormPublished(false);
    setFormThumbnail("");
    setIsDrawerOpen(true);
  }

  function openEditDrawer(course: Course) {
    setEditingCourse(course);
    setFormTitle(course.title);
    setFormDescription(course.description);
    setFormLevel(course.level);
    setFormPrice(course.price);
    setFormPublished(course.is_published);
    setFormThumbnail(course.thumbnail_url || "");
    setIsDrawerOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload: CourseCreateRequest = {
        title: formTitle,
        description: formDescription,
        level: formLevel,
        price: formPrice,
        thumbnail_url: formThumbnail || undefined,
        is_published: formPublished,
      };
      if (editingCourse) {
        await api.courses.update(editingCourse.id, payload);
      } else {
        await api.courses.create(payload);
      }
      setIsDrawerOpen(false);
      await loadCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save course");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await api.courses.delete(id);
      await loadCourses();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete course");
    }
  }

  const filtered = courses.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase());
    const matchesLevel = levelFilter === "all" || c.level === levelFilter;
    const matchesStatus = statusFilter === "all" || (statusFilter === "published" ? c.is_published : !c.is_published);
    return matchesSearch && matchesLevel && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex-1 min-h-screen">
        <div className="p-container-padding max-w-[1440px] mx-auto">
          <div className="h-8 w-32 bg-surface-container-high rounded animate-pulse mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-72 bg-surface-container-high rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && courses.length === 0) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button onClick={() => loadCourses()} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 min-h-screen">
        <div className="p-container-padding max-w-[1440px] mx-auto">
          <PageHeader
            title="Courses"
            description={`Manage ${courses.length} courses across platforms.`}
            actionButton={{
              label: "Add Course",
              icon: "add",
              onClick: openCreateDrawer
            }}
          />

          <FilterBar search={search} onSearchChange={setSearch} searchPlaceholder="Filter courses...">
            <select
              className="px-4 py-2 border border-outline-variant rounded-lg text-sm bg-bg-alt focus:ring-1 focus:ring-primary outline-none"
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value as CourseLevel | "all")}
            >
              <option value="all">Type: All</option>
              <option value="school">School</option>
              <option value="college">College</option>
            </select>
            <select
              className="px-4 py-2 border border-outline-variant rounded-lg text-sm bg-bg-alt focus:ring-1 focus:ring-primary outline-none"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as "all" | "published" | "draft")}
            >
              <option value="all">Status: All</option>
              <option value="published">Published</option>
            </select>
          </FilterBar>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.length === 0 ? (
              <EmptyState title="No courses found" description="Try adjusting your filters or create a new course." icon="menu_book" />
            ) : (
              filtered.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onEdit={openEditDrawer} 
                  onDelete={handleDelete} 
                />
              ))
            )}
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        <div
          className={`absolute right-0 top-0 bottom-0 w-full max-w-[500px] bg-surface shadow-2xl transition-transform duration-500 flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-bright">
            <div>
              <h3 className="text-headline-md font-bold text-on-surface">
                {editingCourse ? "Edit Course" : "Add Course"}
              </h3>
              <p className="text-xs text-on-surface-variant">
                {editingCourse ? "Update curriculum details" : "Create a new course"}
              </p>
            </div>
            <button
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
              onClick={() => setIsDrawerOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Course Title</label>
              <input
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                placeholder="e.g. Introduction to Kinematics"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Description</label>
              <textarea
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white"
                rows={3}
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Course description..."
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1.5">Level</label>
                <select
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white"
                  value={formLevel}
                  onChange={(e) => setFormLevel(e.target.value as CourseLevel)}
                >
                  <option value="school">School</option>
                  <option value="college">College</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1.5">Price ($)</label>
                <input
                  className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white"
                  type="number"
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Thumbnail URL</label>
              <input
                className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white"
                value={formThumbnail}
                onChange={(e) => setFormThumbnail(e.target.value)}
                placeholder="https://..."
              />
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-outline-variant">
              <div>
                <span className="text-xs font-bold text-on-surface">Published</span>
                <p className="text-[10px] text-on-surface-variant">Make visible to students</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={formPublished}
                  onChange={(e) => setFormPublished(e.target.checked)}
                />
                <div className="w-11 h-6 bg-secondary-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success" />
              </label>
            </div>
          </div>

          <div className="p-6 border-t border-outline-variant bg-surface-bright flex gap-3">
            <button
              className="flex-1 py-3 border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-bg-alt transition-colors"
              onClick={() => setIsDrawerOpen(false)}
            >
              Cancel
            </button>
            <button
              className="flex-1 py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50"
              onClick={handleSave}
              disabled={saving || !formTitle || !formPrice}
            >
              {saving ? "Saving..." : editingCourse ? "Update Course" : "Save Course"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
