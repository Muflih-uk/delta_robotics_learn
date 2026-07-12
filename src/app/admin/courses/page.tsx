"use client";

import { useState } from "react";

export default function CoursesPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <div className="flex-1 min-h-screen">
        <div className="p-container-padding max-w-[1440px] mx-auto">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-headline-lg text-on-background font-bold">Courses</h2>
              <p className="text-on-surface-variant text-body-md">Manage 24 active robotics curriculums across platforms.</p>
            </div>
            <button 
              className="flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
              onClick={() => setIsDrawerOpen(true)}
            >
              <span className="material-symbols-outlined">add</span>
              Add Course
            </button>
          </div>

          {/* Toolbar / Filters */}
          <div className="bg-surface border border-outline-variant rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4 shadow-sm">
            <div className="flex-1 min-w-[240px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input 
                className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded-lg text-sm bg-bg-alt focus:ring-1 focus:ring-primary outline-none" 
                placeholder="Filter courses..." 
                type="text"
              />
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <select className="px-4 py-2 border border-outline-variant rounded-lg text-sm bg-bg-alt focus:ring-1 focus:ring-primary outline-none">
                <option>Type: All</option>
                <option>School</option>
                <option>College</option>
              </select>
              <select className="px-4 py-2 border border-outline-variant rounded-lg text-sm bg-bg-alt focus:ring-1 focus:ring-primary outline-none">
                <option>Status: All</option>
                <option>Published</option>
                <option>Draft</option>
              </select>

            </div>
          </div>

          {/* Course Grid (Bento Style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Course Card 1 */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
              <div className="relative h-48 overflow-hidden bg-surface-container">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" 
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBahZtwqdfPGZlR9Nn2bgth-Y2U1iIZ7fGGnszMh-dr5J-zE8JhAbGyG6xH83hNenps8Bh4YzT3i3mN_KJawJcwuMyP6537XX5J6zmTM9w5zXmeHcnTnDhADFgPP091GKpd0AaidwFUwKshfFoo2ZAv2c_xg1kPjBdIiinV2atGOa2qwG3Oghd7UjWN2MAjHjhDV7cT6nsW_WIrqf_H7l8rkJReX8-Vc9ZZr5E1pV95wf_dFs70Drjs')"}}
                ></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">School</span>
                  <span className="bg-success text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Published</span>
                </div>
                <button 
                  className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                  onClick={(e) => { e.stopPropagation(); setIsDrawerOpen(true); }}
                >
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-headline-sm text-on-background line-clamp-1">Introduction to Kinematics</h3>
                  <span className="text-primary font-bold text-sm">$299</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">school</span>
                    School Level
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">people</span>
                    24 Enrolled
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <span className="text-[11px] text-on-surface-variant italic">Last edited 2 days ago</span>
                  <button className="text-primary text-xs font-bold flex items-center gap-1 group-hover:underline">
                    Edit Details
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card 2 */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
              <div className="relative h-48 overflow-hidden bg-surface-container">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" 
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCeEx4sMT6nT7dfxJi5sz96f2LUtsBdd_IUYWKO-i1sg2Xint8lFV6lim8LpX30JPtDvMaZMb3qFmtisyWgstFNyj5wXvt2vR_Rfhyisn27outl2-DpsDRB1IJDw2AQNMyHhvIZRUkI-BjM-8Ww69_hqmDDib9psnl8rEdKzKBLJJH3OLRXUrKtng-bv-x47jKmwpAwv5xZOEZG1AIMs8pOXGZJTlT6FUyU5XbhjP01J7sgGiehjXVm')"}}
                ></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-tertiary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">College</span>
                  <span className="bg-warning text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Draft</span>
                </div>
                <button 
                  className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                  onClick={(e) => { e.stopPropagation(); setIsDrawerOpen(true); }}
                >
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-headline-sm text-on-background line-clamp-1">AI Pathfinding Algorithms</h3>
                  <span className="text-primary font-bold text-sm">$549</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">school</span>
                    College Level
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">people</span>
                    18 Enrolled
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <span className="text-[11px] text-on-surface-variant italic">Last edited 5 hours ago</span>
                  <button className="text-primary text-xs font-bold flex items-center gap-1 group-hover:underline">
                    Edit Details
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Course Card 3 */}
            <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer" onClick={() => setIsDrawerOpen(true)}>
              <div className="relative h-48 overflow-hidden bg-surface-container">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform group-hover:scale-105" 
                  style={{backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC34LufrwcTONnQiKcBYkKyMHOKz0C7caFGYLrGpuW11sJCLvkLNN1adyy1ikc_2A7cAtPtjyWU6heF72IeQVehc6idc0UdkOas_WRIFBNXf20Go1RBN1dCgxrTxIxn75zmFoLiOPipn7xUceGCvdKQ1_b3xXpKcFI9kuovUqKKhihAhMl6lNg5BBIRfJBlgJo-kLMHsQBXckKxLe3olsCez7SJhuiSzbOliKu0LrBNkVDuzMPennAN')"}}
                ></div>
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="bg-tertiary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">College</span>
                  <span className="bg-success text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Published</span>
                </div>
                <button 
                  className="absolute top-3 right-3 w-8 h-8 bg-black/20 hover:bg-black/40 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors"
                  onClick={(e) => { e.stopPropagation(); setIsDrawerOpen(true); }}
                >
                  <span className="material-symbols-outlined text-lg">more_vert</span>
                </button>
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-headline-sm text-on-background line-clamp-1">Embedded Systems Level 2</h3>
                  <span className="text-primary font-bold text-sm">$420</span>
                </div>
                <div className="flex items-center gap-4 text-xs text-on-surface-variant mb-4">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">school</span>
                    College Level
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">people</span>
                    31 Enrolled
                  </div>
                </div>
                <div className="pt-4 border-t border-outline-variant flex justify-between items-center">
                  <span className="text-[11px] text-on-surface-variant italic">Last edited 1 week ago</span>
                  <button className="text-primary text-xs font-bold flex items-center gap-1 group-hover:underline">
                    Edit Details
                    <span className="material-symbols-outlined text-xs">arrow_forward</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Side Drawer (Course Management) Overlay */}
      <div 
        className={`fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsDrawerOpen(false)}
      >
        {/* Drawer Content */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-full max-w-[500px] bg-surface shadow-2xl transition-transform duration-500 flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-bright">
            <div>
              <h3 className="text-headline-md font-bold text-on-surface">Manage Course</h3>
              <p className="text-xs text-on-surface-variant">Update curriculum and platform details</p>
            </div>
            <button 
              className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant"
              onClick={() => setIsDrawerOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
            {/* Type Toggle */}
            <div className="flex items-center p-1 bg-surface-container-low rounded-xl border border-outline-variant">
              <button className="flex-1 py-2 px-4 rounded-lg text-sm font-bold bg-white shadow-sm border border-outline-variant text-primary">School</button>
              <button className="flex-1 py-2 px-4 rounded-lg text-sm font-medium text-on-surface-variant hover:text-on-surface transition-colors">College</button>
            </div>

            {/* Basic Info */}
            <section className="space-y-4">
              <h4 className="text-label-sm uppercase text-on-surface-variant font-bold tracking-widest">Basic Information</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">Course Title</label>
                  <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" type="text" defaultValue="Introduction to Kinematics" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">Description</label>
                  <textarea className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" rows={3} defaultValue="Comprehensive foundational course covering robotic movement principles and mathematical modeling."></textarea>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">Price ($)</label>
                  <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" type="number" defaultValue="299" />
                </div>
              </div>
            </section>

            {/* Media Uploads */}
            <section className="space-y-4">
              <h4 className="text-label-sm uppercase text-on-surface-variant font-bold tracking-widest">Media Assets</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">Thumbnail (4:3)</label>
                  <div className="h-32 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center bg-bg-alt hover:bg-surface-container-low cursor-pointer transition-colors group">
                    <span className="material-symbols-outlined text-on-surface-variant mb-2 group-hover:scale-110 transition-transform">add_a_photo</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Upload Image</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">Banner (16:9)</label>
                  <div className="h-32 border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center bg-bg-alt hover:bg-surface-container-low cursor-pointer transition-colors group">
                    <span className="material-symbols-outlined text-on-surface-variant mb-2 group-hover:scale-110 transition-transform">wallpaper</span>
                    <span className="text-[10px] font-bold text-on-surface-variant uppercase">Upload Banner</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Details & Pricing */}
            <section className="space-y-4">
              <h4 className="text-label-sm uppercase text-on-surface-variant font-bold tracking-widest">Details & Pricing</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">Level</label>
                  <select className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white">
                    <option>School</option>
                    <option>College</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-on-surface mb-1.5">Price ($)</label>
                  <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" type="number" defaultValue="299" />
                </div>
              </div>
            </section>

            {/* Status Toggle */}
            <div className="pt-6 border-t border-outline-variant">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold text-on-surface">Publish Status</span>
                  <p className="text-[10px] text-on-surface-variant">Switch between Draft and Live</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input defaultChecked className="sr-only peer" type="checkbox" />
                  <div className="w-11 h-6 bg-secondary-container peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-success"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-outline-variant bg-surface-bright flex gap-3">
            <button 
              className="flex-1 py-3 border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-bg-alt transition-colors"
              onClick={() => setIsDrawerOpen(false)}
            >
              Cancel
            </button>
            <button 
              className="flex-1 py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all"
              onClick={() => setIsDrawerOpen(false)}
            >
              Save Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
