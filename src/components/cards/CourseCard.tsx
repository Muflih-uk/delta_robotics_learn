import React from "react";
import type { Course } from "@/types";

interface CourseCardProps {
  course: Course;
  onEdit?: (course: Course) => void;
  onDelete?: (id: string) => void;
  onClick?: (course: Course) => void;
}

export function CourseCard({ course, onEdit, onDelete, onClick }: CourseCardProps) {
  return (
    <div 
      className={`bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group ${onClick ? 'cursor-pointer' : ''}`}
      onClick={() => onClick && onClick(course)}
    >
      <div className="relative h-48 overflow-hidden bg-surface-container">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105"
          style={{ backgroundImage: `url(${course.thumbnail_url || "https://placehold.co/600x400/1a1a2e/ffffff?text=No+Image"})` }}
        />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${course.level === "school" ? "bg-primary" : "bg-tertiary"}`}>
            {course.level}
          </span>
          <span className={`text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${course.is_published ? "bg-success" : "bg-warning"}`}>
            {course.is_published ? "Published" : "Draft"}
          </span>
        </div>
        {onEdit && (
          <button
            className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
            onClick={(e) => { e.stopPropagation(); onEdit(course); }}
          >
            <span className="material-symbols-outlined text-lg">more_vert</span>
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-headline-sm text-on-background line-clamp-1">{course.title}</h3>
          <span className="text-primary font-bold text-sm">${course.price}</span>
        </div>
        <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">{course.description}</p>
        <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
          <span className="text-[11px] text-on-surface-variant italic">
            {new Date(course.updated_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </span>
          <div className="flex gap-2">
            {onEdit && (
              <button
                className="text-primary text-xs font-bold flex items-center gap-1 hover:underline"
                onClick={(e) => { e.stopPropagation(); onEdit(course); }}
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                className="text-danger text-xs font-bold flex items-center gap-1 hover:underline"
                onClick={(e) => { e.stopPropagation(); onDelete(course.id); }}
              >
                Delete
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
