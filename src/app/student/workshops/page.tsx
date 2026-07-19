"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Import types from lib/types
import type { Workshop, WorkshopRegistration, WorkshopStatus } from "@/lib/types";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function StudentWorkshopsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | WorkshopStatus>("all");
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isRegistrationDrawerOpen, setIsRegistrationDrawerOpen] = useState(false);
  const [isMyRegistrationsOpen, setIsMyRegistrationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"available" | "my-registrations">("available");
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError("");
    Promise.all([
      api.workshops.list(),
      api.workshopRegistrations.myRegistrations(),
    ])
      .then(([ws, regs]) => {
        setWorkshops(ws);
        setRegistrations(regs);
      })
      .catch((err) => setError(err.message || "Failed to load workshops"))
      .finally(() => setLoading(false));
  }, []);

  // Filter workshops based on search and status
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(search.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || workshop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Check if user is registered for a workshop
  const isRegisteredForWorkshop = (workshopId: string) =>
    registrations.some(reg => reg.workshop === workshopId && reg.status !== "cancelled");

  // Handle workshop registration
  const handleRegister = async (workshopId: string) => {
    setRegistering(true);
    try {
      const newReg = await api.workshopRegistrations.register(workshopId);
      setRegistrations(prev => [...prev, newReg]);
      setWorkshops(prev => prev.map(w =>
        w.id === workshopId
          ? {...w, total_registrations: w.total_registrations + 1}
          : w
      ));
      setIsRegistrationDrawerOpen(false);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Registration failed";
      alert(msg);
    } finally {
      setRegistering(false);
    }
  };

  return (
    <>
      <div className="p-container-padding max-w-[1440px] mx-auto w-full">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Workshops</h2>
            <p className="text-on-surface-variant font-body-md text-body-md">
              Browse upcoming hands-on workshops and reserve your spot.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            {/* Tabs */}
            <div className="flex space-x-2">
              <button
                className={`${activeTab === "available"
                  ? "px-4 py-2 bg-primary-container text-white font-body-md-bold rounded-lg"
                  : "px-4 py-2 text-on-surface-variant hover:bg-bg-alt"
                }`}
                onClick={() => setActiveTab("available")}
              >
                Available Workshops
              </button>
              <button
                className={`${activeTab === "my-registrations"
                  ? "px-4 py-2 bg-primary-container text-white font-body-md-bold rounded-lg"
                  : "px-4 py-2 text-on-surface-variant hover:bg-bg-alt"
                }`}
                onClick={() => setActiveTab("my-registrations")}
              >
                My Registrations
              </button>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row md:items-start gap-3">
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant mb-1 px-1">Status</label>
                <select
                  className="h-10 px-3 rounded-lg border border-border bg-white text-body-md focus:ring-1 focus:ring-primary outline-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as "all" | WorkshopStatus)}
                >
                  <option value="all">All Statuses</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="text-[10px] font-bold uppercase text-on-surface-variant mb-1 px-1">Search</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
                  <input
                    className="h-10 pl-9 pr-4 rounded-lg border border-border bg-white text-body-md focus:ring-1 focus:ring-primary outline-none w-56"
                    placeholder="Search workshops..."
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content based on active tab */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-border rounded-xl overflow-hidden animate-pulse">
                <div className="h-48 bg-surface-container" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-surface-container rounded w-3/4" />
                  <div className="h-4 bg-surface-container rounded w-full" />
                  <div className="h-4 bg-surface-container rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-destructive/30 mb-4">error</span>
            <p className="text-headline-md text-destructive mb-2">Failed to load workshops</p>
            <p className="text-body-md text-on-surface-variant mb-6">{error}</p>
            <button onClick={() => window.location.reload()} className="bg-primary-container text-on-primary px-6 py-2.5 rounded-lg font-bold">Retry</button>
          </div>
        ) : activeTab === "available" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkshops.map(workshop => (
              <div
                key={workshop.id}
                className={`group bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer ${workshop.status === "completed" ? "opacity-75 grayscale-[0.3]" : ""}`}
                onClick={() => setSelectedWorkshop(workshop)}
              >
                <div className="relative h-48 bg-surface-container-low overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${workshop.image_url}')` }}
                  ></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={
                      workshop.status === "upcoming"
                        ? "px-2 py-1 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider shadow-sm border border-border bg-primary/20 text-primary"
                        : workshop.status === "ongoing"
                          ? "px-2 py-1 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider shadow-sm border border-border bg-success/20 text-success"
                          : workshop.status === "completed"
                            ? "px-2 py-1 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider shadow-sm border border-border bg-surface-container text-primary-container"
                            : "px-2 py-1 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider shadow-sm border border-border bg-error/20 text-error"
                    }>
                      {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors">
                      {workshop.title}
                    </h3>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium">
                      {/* Registration Status Badge */}
                      {isRegisteredForWorkshop(workshop.id) ? (
                        <span className="bg-success/20 text-success">
                          Registered
                        </span>
                      ) : (
                        <span className="bg-primary/20 text-primary">
                          Register
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-on-surface-variant text-body-md font-body-md line-clamp-2 mb-4">
                    {workshop.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-4">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {new Date(workshop.event_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      {workshop.location}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="flex items-center gap-2 text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-sm">group</span>
                      {workshop.total_registrations} registered
                    </div>
                    <div className="flex items-center gap-2">
                      {workshop.status === "upcoming" && !isRegisteredForWorkshop(workshop.id) ? (
                        <button
                          className="px-3 py-1 bg-primary-container text-white text-xs font-medium rounded-lg hover:bg-primary transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedWorkshop(workshop);
                            setIsRegistrationDrawerOpen(true);
                          }}
                        >
                          Register
                        </button>
                      ) : (
                        <>
                          {workshop.status === "upcoming" && isRegisteredForWorkshop(workshop.id) && (
                            <span className="px-2 py-1 bg-success/20 text-success text-xs font-medium rounded">
                              Registered
                            </span>
                          )}
                          {workshop.status === "completed" && (
                            <span className="px-2 py-1 bg-surface-container text-primary-container text-xs font-medium rounded">
                              Completed
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredWorkshops.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <span className="material-symbols-outlined text-xl text-secondary mb-4">search_off</span>
                <p className="text-center text-secondary">No workshops match your search.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            <h3 className="font-headline-md text-headline-md text-on-surface mb-4">
              My Registrations ({registrations.length})
            </h3>
            {registrations.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-xl text-secondary mb-4">person_off</span>
                <p className="text-center text-secondary">You haven't registered for any workshops yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {registrations.map(registration => (
                  <div
                    key={registration.id}
                    className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-headline-sm text-headline-sm text-on-surface">
                          {registration.workshop_title}
                        </h3>
                        <span className={
                          registration.status === "registered"
                            ? "px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded"
                            : registration.status === "attended"
                              ? "px-2 py-1 bg-success/20 text-success text-xs font-medium rounded"
                              : "px-2 py-1 bg-error/20 text-error text-xs font-medium rounded"
                        }>
                          {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm text-on-surface-variant">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">calendar_today</span>
                          <span>
                            {/* Find workshop date */}
                            {workshops.find(w => w.id === registration.workshop)?.event_date ? (
                              new Date(workshops.find(w => w.id === registration.workshop)!.event_date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                              })
                            ) : (
                              "Date TBA"
                            )}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">location_on</span>
                          <span>
                            {/* Find workshop location */}
                            {workshops.find(w => w.id === registration.workshop)?.location || "Location TBA"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">person</span>
                          <span>{registration.student_name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">access_time</span>
                          <span>
                            {new Date(registration.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </span>
                        </div>
                      </div>

                      {registration.status === "registered" && (
                        <div className="mt-4">
                          <button
                            className="w-full px-4 py-2 bg-primary-container text-white font-body-md-bold rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2"
                            onClick={() => {
                              // In a real app, this would mark as attended
                              // For demo, just show a message
                              alert("Marked as attended!");
                            }}
                          >
                            <span className="material-symbols-outlined">check_circle</span>
                            Mark as Attended
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Workshop Detail Drawer (for registration) */}
        <div
          className={`fixed inset-0 z-[60] drawer-overlay transition-opacity duration-300 bg-black/20 ${isRegistrationDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsRegistrationDrawerOpen(false)}
        ></div>
        <div
          className={`fixed top-0 right-0 h-full w-[480px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out border-l border-border flex flex-col ${isRegistrationDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Drawer Header */}
          <div className="p-6 border-b border-border flex items-center justify-between">
            <div>
              <h3 className="font-headline-md text-headline-md">
                {selectedWorkshop ? "Register for Workshop" : "Workshop Details"}
              </h3>
              <p className="text-secondary text-sm">
                {selectedWorkshop ?
                  `Register for ${selectedWorkshop.title}` :
                  "Select a workshop to view details"}
              </p>
            </div>
            <button
              className="p-2 hover:bg-bg-alt rounded-full text-secondary transition-colors"
              onClick={() => {
                setIsRegistrationDrawerOpen(false);
                setSelectedWorkshop(null);
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Drawer Content */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {selectedWorkshop ? (
              <div className="space-y-6">
                {/* Workshop Info */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-headline-md text-headline-md text-on-surface">
                      {selectedWorkshop.title}
                    </h3>
                    <div className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium">
                      <span className={
                        selectedWorkshop.status === "upcoming"
                          ? "bg-primary/20 text-primary"
                          : selectedWorkshop.status === "ongoing"
                            ? "bg-success/20 text-success"
                            : selectedWorkshop.status === "completed"
                              ? "bg-info/20 text-info"
                              : "bg-error/20 text-error"
                      }>
                        {selectedWorkshop.status.charAt(0).toUpperCase() + selectedWorkshop.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center text-secondary gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">event</span>
                      <span>
                        {new Date(selectedWorkshop.event_date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </span>
                    </div>
                    <div className="flex items-center text-secondary gap-2 text-sm">
                      <span className="material-symbols-outlined text-sm">location_on</span>
                      <span>{selectedWorkshop.location}</span>
                    </div>
                  </div>

                  <p className="text-on-surface-variant text-body-md font-body-md">
                    {selectedWorkshop.description}
                  </p>
                </div>

                  {/* Gallery Preview */}
                  {selectedWorkshop.gallery_images.length > 0 && (
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">Gallery Preview</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedWorkshop.gallery_images.slice(0, 4).map((img, index) => (
                          <div
                            key={index}
                            className="aspect-square bg-bg-alt border border-border rounded-lg overflow-hidden"
                          >
                            <img
                              className="w-full h-full object-cover"
                              src={img}
                              alt={`${selectedWorkshop.title} gallery ${index + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Registration Status & Button */}
                  <div className="space-y-4">
                    <div className="text-center py-4">
                      {isRegisteredForWorkshop(selectedWorkshop.id) ? (
                        <>
                          <p className="text-success font-body-md-bold">
                            You are already registered for this workshop!
                          </p>
                          {selectedWorkshop.status === "upcoming" && (
                            <button
                              className="mt-3 px-4 py-2 bg-secondary-container text-secondary font-body-md-bold rounded-lg hover:bg-secondary-transition-colors"
                              onClick={() => {
                                // In a real app, this would update registration status
                                alert("Marked as attended!");
                              }}
                            >
                              Mark as Attended
                            </button>
                          )}
                        </>
                      ) : (
                        <>
                          {selectedWorkshop.status === "upcoming" ? (
                            <>
                              <p className="text-body-md">
                                Ready to join this workshop? Click the button below to register.
                              </p>
                              <button
                                className="mt-4 w-full px-6 py-3 bg-primary-container text-white font-body-md-bold rounded-lg hover:bg-primary transition-colors shadow-sm"
                                onClick={() => {
                                  if (user) {
                                    handleRegister(selectedWorkshop.id);
                                  } else {
                                    router.push("/login?redirect=/student/workshops");
                                  }
                                }}
                              >
                                Register Now
                              </button>
                            </>
                          ) : (
                            <>
                              {selectedWorkshop.status === "completed" && (
                                <p className="text-body-md text-secondary">
                                  This workshop has already taken place.
                                </p>
                              )}
                              {selectedWorkshop.status === "ongoing" && (
                                <p className="text-body-md text-secondary">
                                  This workshop is currently in progress.
                                </p>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              )
            : (
              <div className="flex flex-col items-center justify-center py-12">
                <span className="material-symbols-outlined text-xl text-secondary mb-4">description</span>
                <p className="text-center text-secondary">Select a workshop to view details</p>
              </div>
            )}
          </div>

          {/* Drawer Actions */}
          <div className="p-6 border-t border-border flex items-center gap-4 bg-white">
            <button
              type="button"
              className="flex-1 px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors"
              onClick={() => {
                setIsRegistrationDrawerOpen(false);
                setSelectedWorkshop(null);
              }}
            >
              Cancel
            </button>
            {selectedWorkshop && !isRegisteredForWorkshop(selectedWorkshop.id) && selectedWorkshop.status === "upcoming" && (
              <button
                className="flex-1 px-6 py-2.5 bg-primary-container text-white rounded-lg font-body-md-bold hover:bg-primary transition-colors shadow-sm cursor-pointer"
                onClick={() => {
                  if (user) {
                    handleRegister(selectedWorkshop.id);
                  } else {
                    router.push("/login?redirect=/student/workshops");
                  }
                }}
              >
                Register Now
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// Helper type for status filter
type Set<T> = React.Dispatch<React.SetStateAction<T>>;