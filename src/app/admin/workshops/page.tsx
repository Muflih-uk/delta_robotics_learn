"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Workshop, WorkshopRegistration, WorkshopStatus, WorkshopCreateRequest } from "@/lib/types";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRegistrationsDrawerOpen, setIsRegistrationsDrawerOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [workshopToDelete, setWorkshopToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<WorkshopStatus | "all">("all");
  const [publishedFilter, setPublishedFilter] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formStatus, setFormStatus] = useState<WorkshopStatus>("upcoming");
  const [formDate, setFormDate] = useState("");
  const [formLocation, setFormLocation] = useState("");
  const [formImage, setFormImage] = useState("");
  const [formPublished, setFormPublished] = useState(false);

  useEffect(() => {
    loadWorkshops();
  }, []);

  async function loadWorkshops() {
    try {
      setLoading(true);
      const data = await api.workshops.list();
      setWorkshops(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load workshops");
    } finally {
      setLoading(false);
    }
  }

  async function loadRegistrations(workshopId: string) {
    try {
      const data = await api.workshopRegistrations.myRegistrations();
      setRegistrations(data.filter((r) => r.workshop === workshopId));
    } catch {
      setRegistrations([]);
    }
  }

  function openCreateDrawer() {
    setSelectedWorkshop(null);
    resetForm();
    setIsDrawerOpen(true);
  }

  function openEditDrawer(workshop: Workshop) {
    setSelectedWorkshop(workshop);
    setFormTitle(workshop.title);
    setFormDescription(workshop.description);
    setFormStatus(workshop.status);
    setFormDate(workshop.event_date?.split("T")[0] || "");
    setFormLocation(workshop.location);
    setFormImage(workshop.image_url || "");
    setFormPublished(workshop.is_published);
    setIsDrawerOpen(true);
  }

  function resetForm() {
    setFormTitle("");
    setFormDescription("");
    setFormStatus("upcoming");
    setFormDate("");
    setFormLocation("");
    setFormImage("");
    setFormPublished(false);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload: WorkshopCreateRequest = {
        title: formTitle,
        description: formDescription || undefined,
        status: formStatus,
        event_date: formDate || undefined,
        location: formLocation || undefined,
        image_url: formImage || undefined,
        is_published: formPublished,
      };
      if (selectedWorkshop) {
        await api.workshops.update(selectedWorkshop.id, payload);
      } else {
        await api.workshops.create(payload);
      }
      setIsDrawerOpen(false);
      await loadWorkshops();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save workshop");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!workshopToDelete) return;
    try {
      await api.workshops.delete(workshopToDelete);
      setIsDeleteConfirmOpen(false);
      setWorkshopToDelete(null);
      await loadWorkshops();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete workshop");
    }
  }

  function openRegistrationsDrawer(workshop: Workshop) {
    setSelectedWorkshop(workshop);
    loadRegistrations(workshop.id);
    setIsRegistrationsDrawerOpen(true);
  }

  const filteredWorkshops = workshops.filter((workshop) => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || workshop.status === statusFilter;
    const matchesPublished = publishedFilter === null || workshop.is_published === publishedFilter;
    return matchesSearch && matchesStatus && matchesPublished;
  });

  const stats = {
    total: workshops.length,
    upcoming: workshops.filter((w) => w.status === "upcoming").length,
    ongoing: workshops.filter((w) => w.status === "ongoing").length,
    completed: workshops.filter((w) => w.status === "completed").length,
    cancelled: workshops.filter((w) => w.status === "cancelled").length,
  };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto bg-surface p-container-padding">
        <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse mb-6" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-80 bg-surface-container-high rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error && workshops.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto bg-surface p-container-padding flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button onClick={() => loadWorkshops()} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-surface p-container-padding custom-scrollbar">
        <div className="mb-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">Workshops</h2>
              <p className="text-secondary font-body-md">{stats.total} Workshops total</p>
            </div>
            <button
              className="bg-primary-container hover:bg-primary text-white font-body-md-bold px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95"
              onClick={openCreateDrawer}
            >
              <span className="material-symbols-outlined">add</span>
              Add Workshop
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="text-primary font-semibold">Upcoming</div>
              <div className="text-2xl font-bold">{stats.upcoming}</div>
            </div>
            <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="text-success font-semibold">Ongoing</div>
              <div className="text-2xl font-bold">{stats.ongoing}</div>
            </div>
            <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="text-info font-semibold">Completed</div>
              <div className="text-2xl font-bold">{stats.completed}</div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-start justify-between bg-white p-4 border border-border rounded-xl mb-8 shadow-sm gap-4">
            <div className="flex w-full md:w-auto items-center gap-4">
              <input
                type="text"
                placeholder="Search workshops..."
                className="h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none transition-all w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <select
                className="h-11 px-4 pr-8 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as WorkshopStatus | "all")}
              >
                <option value="all">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
              <select
                className="h-11 px-4 pr-8 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none"
                value={publishedFilter === null ? "" : String(publishedFilter)}
                onChange={(e) => {
                  const val = e.target.value;
                  setPublishedFilter(val === "" ? null : val === "true");
                }}
              >
                <option value="">All</option>
                <option value="true">Published</option>
                <option value="false">Unpublished</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorkshops.length === 0 ? (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">precision_manufacturing</span>
              <p className="text-center text-secondary">No workshops found</p>
            </div>
          ) : (
            filteredWorkshops.map((workshop) => (
              <div key={workshop.id} className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="relative h-48">
                  <img className="w-full h-full object-cover" alt={workshop.title} src={workshop.image_url || "https://placehold.co/600x400/1a1a2e/ffffff?text=No+Image"} />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1 rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-2">
                      <button className="p-1 hover:text-primary" onClick={(e) => { e.stopPropagation(); openEditDrawer(workshop); }}>
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button className="p-1 hover:text-primary" onClick={(e) => { e.stopPropagation(); setWorkshopToDelete(workshop.id); setIsDeleteConfirmOpen(true); }}>
                        <span className="material-symbols-outlined">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-headline-sm text-headline-sm group-hover:text-primary transition-colors">{workshop.title}</h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      workshop.status === "upcoming" ? "bg-primary/20 text-primary"
                        : workshop.status === "ongoing" ? "bg-success/20 text-success"
                          : workshop.status === "completed" ? "bg-info/20 text-info"
                            : "bg-error/20 text-error"
                    }`}>
                      {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                    </span>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-secondary gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">event</span>
                      {new Date(workshop.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </div>
                    <div className="flex items-center text-secondary gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {workshop.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-xs font-semibold uppercase tracking-wider text-secondary">
                      {workshop.total_registrations} Registrations
                    </span>
                  </div>
                  <div className="mt-4">
                    <button
                      className="w-full bg-primary-container text-white font-body-md-bold py-2 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2"
                      onClick={() => openRegistrationsDrawer(workshop)}
                    >
                      <span className="material-symbols-outlined">people</span>
                      View Registrations
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 bg-black/20 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsDrawerOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-[480px] bg-white z-[70] shadow-2xl transition-transform duration-300 border-l border-border flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md">{selectedWorkshop ? "Edit Workshop" : "Add Workshop"}</h3>
            <p className="text-secondary text-sm">{selectedWorkshop ? "Modify workshop details" : "Create a new session"}</p>
          </div>
          <button className="p-2 hover:bg-bg-alt rounded-full text-secondary transition-colors" onClick={() => { setIsDrawerOpen(false); setSelectedWorkshop(null); }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">Title</label>
              <input className="w-full h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Workshop title" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">Description</label>
              <textarea className="w-full px-4 py-3 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none" rows={4} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Description..." />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">Date</label>
                <input className="w-full h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none" type="date" value={formDate} onChange={(e) => setFormDate(e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">Location</label>
                <input className="w-full h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} placeholder="Venue" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">Status</label>
              <select className="w-full h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none" value={formStatus} onChange={(e) => setFormStatus(e.target.value as WorkshopStatus)}>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-on-surface mb-1">Image URL</label>
              <input className="w-full h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none" value={formImage} onChange={(e) => setFormImage(e.target.value)} placeholder="https://..." />
            </div>
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold text-on-surface">Published</label>
              <input type="checkbox" className="h-4 w-4" checked={formPublished} onChange={(e) => setFormPublished(e.target.checked)} />
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-border flex items-center gap-4 bg-white">
          <button type="button" className="flex-1 px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors" onClick={() => { setIsDrawerOpen(false); setSelectedWorkshop(null); }}>Cancel</button>
          <button className="flex-1 px-6 py-2.5 bg-primary-container text-white rounded-lg font-body-md-bold hover:bg-primary transition-colors shadow-sm disabled:opacity-50" onClick={handleSave} disabled={saving || !formTitle}>
            {saving ? "Saving..." : selectedWorkshop ? "Update Workshop" : "Save Workshop"}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 bg-black/20 ${isRegistrationsDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsRegistrationsDrawerOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-[480px] bg-white z-[70] shadow-2xl transition-transform duration-300 border-l border-border flex flex-col ${isRegistrationsDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md">{selectedWorkshop ? `${selectedWorkshop.title} Registrations` : "Registrations"}</h3>
            <p className="text-secondary text-sm">View participant registrations</p>
          </div>
          <button className="p-2 hover:bg-bg-alt rounded-full text-secondary transition-colors" onClick={() => { setIsRegistrationsDrawerOpen(false); setSelectedWorkshop(null); }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {registrations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8">
              <span className="material-symbols-outlined text-4xl text-secondary mb-4">people</span>
              <p className="text-center text-secondary">No registrations found</p>
            </div>
          ) : (
            <table className="min-w-full divide-y divide-border">
              <thead className="bg-bg-alt">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {registrations.map((reg) => (
                  <tr key={reg.id} className="hover:bg-bg-alt">
                    <td className="px-6 py-4 text-body-md">{reg.student_name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-0.5 rounded text-xs ${
                        reg.status === "registered" ? "bg-primary/20 text-primary"
                          : reg.status === "attended" ? "bg-success/20 text-success"
                            : "bg-error/20 text-error"
                      }`}>
                        {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-body-md text-secondary">
                      {new Date(reg.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
        <div className="p-6 border-t border-border">
          <button type="button" className="w-full px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors" onClick={() => { setIsRegistrationsDrawerOpen(false); setSelectedWorkshop(null); }}>Close</button>
        </div>
      </div>

      <div className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/20 ${isDeleteConfirmOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed z-[90] bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl ${isDeleteConfirmOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} transition-all duration-300`}>
        <h3 className="font-headline-md text-headline-md mb-4">Delete Workshop</h3>
        <p className="text-body-md mb-6">Are you sure you want to delete this workshop? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button className="flex-1 px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors" onClick={() => { setIsDeleteConfirmOpen(false); setWorkshopToDelete(null); }}>Cancel</button>
          <button className="flex-1 px-6 py-2.5 bg-error text-white rounded-lg font-body-md-bold hover:bg-error/80 transition-colors shadow-sm" onClick={handleDeleteConfirm}>Delete Workshop</button>
        </div>
      </div>
    </>
  );
}
