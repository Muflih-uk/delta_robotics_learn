"use client";

import { useState, useEffect } from 'react';
import { Search, MoreVertical, Clock, CalendarDays, Image as ImageIcon } from 'lucide-react';
import { api } from '@/lib/api';
import type { Course } from '@/lib/types';
import Drawer from '@/components/intern/Drawer';

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    api.courses.list()
      .then(setCourses)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleOpenDrawer = () => setIsDrawerOpen(true);
    window.addEventListener('open-drawer', handleOpenDrawer);
    return () => window.removeEventListener('open-drawer', handleOpenDrawer);
  }, []);

  const filteredCourses = courses.filter(course => {
    const matchesType = typeFilter === '' || course.level === typeFilter.toLowerCase();
    const matchesStatus = statusFilter === '' || (statusFilter === 'Published' ? course.is_published : !course.is_published);
    return matchesType && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Courses</h2>
          <p className="text-sm text-secondary mt-1">48 Courses total</p>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-xl border border-border flex flex-wrap gap-4 items-center shadow-sm">
        <div className="flex-1 min-w-[200px]">
          <select 
            className="w-full h-10 bg-surface border border-border rounded-lg px-3 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="School">School</option>
            <option value="College">College</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <select 
            className="w-full h-10 bg-surface border border-border rounded-lg px-3 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <select 
            className="w-full h-10 bg-surface border border-border rounded-lg px-3 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Programming">Programming</option>
            <option value="Hardware">Hardware</option>
            <option value="AI">AI</option>
          </select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <select 
            className="w-full h-10 bg-surface border border-border rounded-lg px-3 text-sm focus:ring-2 focus:ring-primary outline-none cursor-pointer"
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
          >
            <option value="">All Difficulties</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse">
              <div className="h-40 bg-surface-container-low" />
              <div className="p-4 space-y-3">
                <div className="h-5 bg-surface-container-low rounded w-3/4" />
                <div className="h-4 bg-surface-container-low rounded w-1/2" />
                <div className="h-4 bg-surface-container-low rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-4">
        {filteredCourses.map((course) => (
          <div key={course.id} className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group relative flex flex-col">
            <div className="h-40 bg-surface-container-low relative shrink-0">
              <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-[10px] font-bold text-on-surface uppercase tracking-wider shadow-sm">
                {course.level === 'school' ? 'School' : 'College'}
              </div>
              <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider shadow-sm backdrop-blur-sm ${
                course.is_published ? 'bg-green-100 text-green-700' : 'bg-surface-container-low text-secondary'
              }`}>
                {course.is_published ? 'Published' : 'Draft'}
              </div>
            </div>
            
            <div className="p-4 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-on-surface line-clamp-1 group-hover:text-primary transition-colors text-base">{course.title}</h3>
                <button className="text-secondary hover:text-on-surface flex-shrink-0">
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <p className="text-sm text-secondary line-clamp-2 mb-4">{course.description}</p>
              
              <div className="grid grid-cols-2 gap-y-2 text-sm border-t border-border pt-3 mt-auto">
                <div className="flex items-center gap-1.5 text-secondary">
                  <Clock size={14} />
                  {new Date(course.updated_at).toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1.5 text-on-surface font-bold justify-end">
                  ${parseFloat(course.price).toLocaleString()}
                </div>
                <div className="col-span-2 text-xs text-secondary mt-1 flex items-center gap-1.5">
                  <CalendarDays size={14} />
                  Created: {new Date(course.created_at).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add Course"
        footer={
          <>
            <div className="flex items-center gap-3 mr-auto">
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary-container"></div>
                <span className="ml-3 text-xs font-semibold text-on-surface uppercase tracking-wider">Published</span>
              </label>
            </div>
            <button className="px-4 h-10 border border-border rounded-lg text-on-surface font-medium hover:bg-surface-container-low transition-colors text-sm" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </button>
            <button className="px-4 h-10 bg-primary-container text-white rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm text-sm" onClick={() => setIsDrawerOpen(false)}>
              Save Course
            </button>
          </>
        }
      >
        <div className="space-y-8 text-sm">
          <div className="bg-surface-container-low p-1 rounded-lg flex">
            <button className="flex-1 py-2 text-center rounded bg-surface shadow-sm font-semibold text-on-surface">School</button>
            <button className="flex-1 py-2 text-center rounded font-medium text-secondary hover:text-on-surface">College</button>
          </div>

          <section className="space-y-4">
            <h3 className="font-semibold text-base text-on-surface border-b border-border pb-2">Basic Information</h3>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-secondary uppercase">Course Title</label>
              <input type="text" className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:ring-2 focus:ring-primary outline-none transition-shadow" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-secondary uppercase">Description</label>
              <textarea className="w-full border border-border rounded-lg p-3 bg-surface focus:ring-2 focus:ring-primary outline-none transition-shadow resize-none" rows={4} />
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-semibold text-base text-on-surface border-b border-border pb-2">Details</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-secondary uppercase">Category</label>
                <select className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:ring-2 focus:ring-primary outline-none">
                  <option>Programming</option>
                  <option>Hardware</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-secondary uppercase">Difficulty</label>
                <select className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:ring-2 focus:ring-primary outline-none">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-secondary uppercase">Duration (Weeks)</label>
                <input type="number" className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:ring-2 focus:ring-primary outline-none" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-secondary uppercase">Price ($)</label>
                <input type="number" className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:ring-2 focus:ring-primary outline-none" />
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="font-semibold text-base text-on-surface border-b border-border pb-2">Media</h3>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-surface-container-low hover:bg-surface transition-colors cursor-pointer">
              <ImageIcon className="text-secondary mb-2 w-8 h-8" />
              <p className="font-semibold text-on-surface">Upload Thumbnail</p>
              <p className="text-xs text-secondary mt-1">PNG, JPG up to 5MB</p>
            </div>
          </section>
        </div>
      </Drawer>
    </div>
  );
}
