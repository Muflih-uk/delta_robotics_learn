"use client";

import { useState, useEffect } from 'react';
import { Calendar, MapPin, Image as ImageIcon, Plus } from 'lucide-react';
import { api } from '@/lib/api';
import type { Workshop } from '@/lib/types';
import Drawer from '@/components/intern/Drawer';

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    setLoading(true);
    api.workshops.list()
      .then(setWorkshops)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleOpenDrawer = () => setIsDrawerOpen(true);
    window.addEventListener('open-drawer', handleOpenDrawer);
    return () => window.removeEventListener('open-drawer', handleOpenDrawer);
  }, []);

  const tabs = [
    { id: 'all', label: 'All Events' },
    { id: 'upcoming', label: 'Upcoming' },
    { id: 'completed', label: 'Archived' },
  ];

  const filteredWorkshops = workshops.filter(ws => {
    if (activeTab === 'all') return true;
    return activeTab === 'archived' ? (ws.status === 'completed' || ws.status === 'cancelled') : ws.status === activeTab;
  });

  return (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Workshops</h2>
          <p className="text-sm text-secondary mt-1">14 Workshops total • Managing across 3 campuses</p>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-surface-container-low p-1.5 rounded-lg w-max shrink-0">
        <span className="text-xs font-semibold text-secondary uppercase tracking-wider ml-2 mr-1">Show:</span>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 text-sm font-medium rounded transition-colors ${
              activeTab === tab.id 
                ? 'bg-primary-container text-on-primary-container shadow-sm' 
                : 'text-secondary hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-surface border border-border rounded-xl overflow-hidden animate-pulse">
              <div className="h-40 bg-surface-container-low" />
              <div className="p-5 space-y-3">
                <div className="h-5 bg-surface-container-low rounded w-3/4" />
                <div className="h-4 bg-surface-container-low rounded w-1/2" />
                <div className="h-4 bg-surface-container-low rounded w-1/3" />
              </div>
            </div>
          ))}
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 overflow-y-auto pb-4">
        {filteredWorkshops.map((ws) => (
          <div key={ws.id} className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col">
            <div className="h-40 bg-surface-container-low relative shrink-0">
              <img src={ws.image_url} alt={ws.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${
                  ws.status === 'upcoming' ? 'bg-primary/10 text-primary' :
                  ws.status === 'ongoing' ? 'bg-success/10 text-success' :
                  ws.status === 'completed' ? 'bg-surface-container-low text-secondary' :
                  'bg-destructive/10 text-destructive'
                }`}>
                  {ws.status}
                </span>
              </div>
              <h3 className="font-semibold text-on-surface text-lg mb-4 line-clamp-1 group-hover:text-primary transition-colors">
                {ws.title}
              </h3>
              
              <div className="space-y-2 mb-6 text-sm text-secondary">
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>{new Date(ws.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span className="line-clamp-1">{ws.location}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                <span className="text-xs text-secondary">{ws.total_registrations} registered</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      )}

      <button onClick={() => setIsDrawerOpen(true)} className="fixed bottom-8 right-8 w-14 h-14 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center shadow-lg hover:opacity-90 transition-colors lg:hidden z-20">
        <Plus size={24} />
      </button>

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title="Add Workshop"
        subtitle="Create a new session for the catalog"
        footer={
          <>
            <button onClick={() => setIsDrawerOpen(false)} className="px-4 h-10 border border-border rounded-lg text-on-surface font-medium hover:bg-surface-container-low transition-colors text-sm">
              Cancel
            </button>
            <button className="px-4 h-10 bg-primary-container text-on-primary-container rounded-lg font-medium hover:opacity-90 transition-opacity shadow-sm text-sm" onClick={() => setIsDrawerOpen(false)}>
              Save Workshop
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <section className="space-y-2">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Workshop Title</label>
            <input type="text" placeholder="e.g. Intro to ROS Navigation" className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
          </section>

          <section className="space-y-2">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Description</label>
            <textarea 
              rows={4} 
              placeholder="Describe the learning objectives and prerequisites..." 
              className="w-full border border-border rounded-lg p-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none" 
            />
          </section>

          <div className="grid grid-cols-2 gap-4">
            <section className="space-y-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Date</label>
              <div className="relative">
                <input type="date" className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary" />
              </div>
            </section>
            <section className="space-y-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Venue</label>
              <select className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm text-secondary">
                <option>Select Location</option>
                <option>Innovation Lab, Campus A</option>
                <option>Delta Hall, Engineering Bldg</option>
              </select>
            </section>
          </div>

          <hr className="border-border" />
          <h3 className="font-semibold text-on-surface text-sm uppercase tracking-wider">Media Assets</h3>

          <section className="space-y-2">
            <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Poster Image</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-surface-container-low hover:bg-surface transition-colors cursor-pointer">
              <ImageIcon className="text-secondary mb-2 w-8 h-8" />
              <p className="font-medium text-on-surface text-sm"><span className="text-primary">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-secondary mt-1">Recommended size: 1200×800px</p>
            </div>
          </section>

          <section className="space-y-2">
            <label className="text-[10px] font-bold text-secondary uppercase tracking-wider">Gallery Images (Optional)</label>
            <div className="w-24 h-24 border border-border rounded-xl flex items-center justify-center bg-surface-container-low hover:bg-surface transition-colors cursor-pointer text-secondary hover:text-on-surface">
              <Plus size={24} />
            </div>
          </section>
        </div>
      </Drawer>
    </div>
  );
}
