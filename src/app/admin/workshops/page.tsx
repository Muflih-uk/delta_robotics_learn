"use client";

import { useState } from "react";
import type { Workshop, WorkshopRegistration, WorkshopStatus } from "@/lib/types";

// Mock data shaped to Workshop type
const mockWorkshops: Workshop[] = [
  {
    id: "1",
    title: "VEX Robotics Masterclass",
    description: "Learn advanced VEX robotics concepts and competition strategies",
    status: "upcoming" as WorkshopStatus,
    event_date: "2023-10-28",
    location: "Innovation Lab, Campus A",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYMBxKZMbHoYZQDJBeT1ECSjMtjTL8AYI18dKSG3_I__-mW6mwefTt0ltlr-UiDFJP6GeRTTZHGoNVTwyHuGujExu_X9qSWxAaNBSyrfeVA-l6etl87Kwq-GIeAeIt-TXuYtFyuuXToVccm7ltvTvDSyEQDJYnw6hZUMzVosMhYYbHXaOGZ0ED0I3taoiER_fPEdAqRWUauJlflfwmcN1MIQxikjOldO-RZ8ah9MfDkgANZ5jnSIy3",
    is_published: true,
    gallery_images: [
      "https://example.com/gallery1.jpg",
      "https://example.com/gallery2.jpg",
      "https://example.com/gallery3.jpg"
    ],
    total_registrations: 24,
    created_at: "2023-08-15T10:00:00Z",
    updated_at: "2023-08-20T14:30:00Z"
  },
  {
    id: "2",
    title: "Advanced Kinematics",
    description: "Deep dive into robotic kinematics and motion planning",
    status: "ongoing" as WorkshopStatus,
    event_date: "2023-11-04",
    location: "Delta Hall, Engineering Wing",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZn9Nz_v7SJttCa3jZgR91JKBQAR3KrNi-Azrvj75oQPoq3bXgD6aePZolQFBGDJoGglCt17NI55vjcAN5k8u0Mq-FZHbgNb00cooxixJeutNjrAp0bgdoiEUaPXpTStuI0Fpp_HeO0akmLlGbWxL1dOYX1wINBlu218XIfwhCflCcviM_ABiJiZflxSC3vl1Xc_bk00P31PGCL2oDxOrrx7QNh0nmTo8jgmR6pWBjEYqMUPtNAAwF",
    is_published: true,
    gallery_images: [
      "https://example.com/gallery4.jpg",
      "https://example.com/gallery5.jpg"
    ],
    total_registrations: 12,
    created_at: "2023-08-20T09:00:00Z",
    updated_at: "2023-10-15T16:45:00Z"
  },
  {
    id: "3",
    title: "VR Simulation Workshop",
    description: "Explore virtual reality applications in robotics simulation",
    status: "completed" as WorkshopStatus,
    event_date: "2023-11-12",
    location: "Metaverse Hub, Innovation Center",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCBeLRJCTTbl7Z_CN7CGGwRY4Ke1NzLrDpzAiPlhntUS_U1Id1BbMYTsiXq-QJ3ABfQONVPsJUrO9_NQwwLbIvJF46EAQStJzOvbP0SZ3j3IyDSjXBui7XXe17leUulBCCBGxtKiQ468_mw17_d4peNVbn2cq0WnFpbQHi9jlscWPS8y24vAjE5RqNrJ2x-O2VeWTDIiuZDD_gebo_cFCnINjDlgTz97ZBIJc9j4tBpCl-KQ9i72t_0",
    is_published: false,
    gallery_images: [
      "https://example.com/gallery6.jpg",
      "https://example.com/gallery7.jpg",
      "https://example.com/gallery8.jpg",
      "https://example.com/gallery9.jpg"
    ],
    total_registrations: 40,
    created_at: "2023-09-01T11:30:00Z",
    updated_at: "2023-11-13T08:15:00Z"
  },
  {
    id: "4",
    title: "IoT & Sensor Integration",
    description: "Hands-on workshop for integrating IoT sensors with robotic systems",
    status: "cancelled" as WorkshopStatus,
    event_date: "2023-12-01",
    location: "Embedded Systems Lab",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbBG4rzjy7vLWU5jKniJUFB7kivLJq6zYsS1g1_yddEsockHcI0Iv8Cjzg0td0sPnXNRTz02OICXqO5_Co5S3wxcd3fLZRxinDSuQivVFYbG1EPjorQ0ZREQeisO5uv7gd23y-bxoGeIdOXgkNsw67mQZyZNGpSd1B6h1npscn9jUjjyhGP4NwvzqSyfqWDYEy2YNzr8B9m-yyX9P-KEwGRr4tawJO2R_vLx9-VkA1aLcBDnDxJ4uS",
    is_published: true,
    gallery_images: [
      "https://example.com/gallery10.jpg"
    ],
    total_registrations: 8,
    created_at: "2023-09-15T14:20:00Z",
    updated_at: "2023-11-20T09:10:00Z"
  }
];

// Mock registrations data
const mockRegistrations: WorkshopRegistration[] = [
  {
    id: "reg1",
    workshop: "1",
    workshop_title: "VEX Robotics Masterclass",
    student: "stu1",
    student_name: "Alice Johnson",
    status: "registered",
    created_at: "2023-08-16T09:30:00Z"
  },
  {
    id: "reg2",
    workshop: "1",
    workshop_title: "VEX Robotics Masterclass",
    student: "stu2",
    student_name: "Bob Smith",
    status: "attended",
    created_at: "2023-08-17T14:15:00Z"
  },
  {
    id: "reg3",
    workshop: "2",
    workshop_title: "Advanced Kinematics",
    student: "stu3",
    student_name: "Carol Davis",
    status: "registered",
    created_at: "2023-08-21T11:00:00Z"
  }
];

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>(mockWorkshops);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isRegistrationsDrawerOpen, setIsRegistrationsDrawerOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [workshopToDelete, setWorkshopToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<WorkshopStatus | "all">("all");
  const [publishedFilter, setPublishedFilter] = useState<boolean | null>(null);

  // Filter workshops based on search and filters
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || workshop.status === statusFilter;
    const matchesPublished = publishedFilter === null || workshop.is_published === publishedFilter;
    return matchesSearch && matchesStatus && matchesPublished;
  });

  // Calculate stats
  const stats = {
    total: workshops.length,
    upcoming: workshops.filter(w => w.status === "upcoming").length,
    ongoing: workshops.filter(w => w.status === "ongoing").length,
    completed: workshops.filter(w => w.status === "completed").length,
    cancelled: workshops.filter(w => w.status === "cancelled").length
  };

  // Handle opening registrations drawer
  const openRegistrationsDrawer = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsRegistrationsDrawerOpen(true);
  };

  // Handle opening edit drawer
  const openEditDrawer = (workshop: Workshop) => {
    setSelectedWorkshop(workshop);
    setIsDrawerOpen(true);
  };

  // Handle delete confirmation
  const openDeleteConfirm = (id: string) => {
    setWorkshopToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (workshopToDelete) {
      setWorkshops(prev => prev.filter(w => w.id !== workshopToDelete));
      setIsDeleteConfirmOpen(false);
      setWorkshopToDelete(null);
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto bg-surface p-container-padding custom-scrollbar">
        {/* Header & Stats */}
        <div className="mb-6">
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="font-headline-lg text-headline-lg text-on-background">Workshops</h2>
              <p className="text-secondary font-body-md">
                {stats.total} Workshops total • Managing across 3 campuses
              </p>
            </div>
            <button
              className="bg-primary-container hover:bg-primary text-white font-body-md-bold px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-2 transition-all active:scale-95"
              onClick={() => {
                setSelectedWorkshop(null);
                setIsDrawerOpen(true);
              }}
            >
              <span className="material-symbols-outlined">add</span>
              Add Workshop
            </button>
          </div>

          {/* Stats Row */}
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
            <div className="bg-white border border-border rounded-xl p-4 flex items-center gap-3 shadow-sm">
              <div className="text-error font-semibold">Cancelled</div>
              <div className="text-2xl font-bold">{stats.cancelled}</div>
            </div>
          </div>

          {/* Filters Toolbar */}
          <div className="flex flex-col md:flex-row md:flex-row items-start justify-between bg-white p-4 border border-border rounded-xl mb-8 shadow-sm gap-4 md:gap-0">
            <div className="flex w-full md:w-auto items-center gap-4">
              {/* Search */}
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-secondary px-2">Search:</span>
                <input
                  type="text"
                  placeholder="Search workshops..."
                  className="h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Status Filter */}
              <div className="relative">
                <label className="block text-sm font-semibold text-on-surface mb-1">Status:</label>
                <select
                  className="w-full h-11 px-4 pr-10 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all appearance-none"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as WorkshopStatus | "all")}
                >
                  <option value="all">All Statuses</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">expand_more</span>
              </div>

              {/* Published Filter */}
              <div className="relative">
                <label className="block text-sm font-semibold text-on-surface mb-1">Published:</label>
                <select
                  className="w-full h-11 px-4 pr-10 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all appearance-none"
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
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">expand_more</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <div className="flex items-center bg-bg-alt border border-border rounded-lg px-3 py-1.5 gap-2 cursor-pointer hover:border-primary-container transition-colors">
                <span className="material-symbols-outlined text-secondary text-sm">calendar_month</span>
                <span className="text-sm text-secondary">Date Range</span>
              </div>
              <div className="flex items-center bg-bg-alt border border-border rounded-lg px-3 py-1.5 gap-2 cursor-pointer hover:border-primary-container transition-colors">
                <span className="material-symbols-outlined text-secondary text-sm">location_on</span>
                <span className="text-sm text-secondary">Venue</span>
              </div>
              <button className="p-2 text-secondary hover:bg-bg-alt rounded-lg transition-colors">
                <span className="material-symbols-outlined">filter_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Workshop Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredWorkshops.map(workshop => (
            <div
              key={workshop.id}
              className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="relative h-48">
                <img
                  className="w-full h-full object-cover"
                  alt={workshop.title}
                  src={workshop.image_url}
                />
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-1 rounded-lg border border-border opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex space-x-2">
                    <button
                      className="p-1 hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditDrawer(workshop);
                      }}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      className="p-1 hover:text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteConfirm(workshop.id);
                      }}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-headline-sm text-headline-sm group-hover:text-primary transition-colors">
                    {workshop.title}
                  </h3>
                  <div className="flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium">
                    {/* Status Badge */}
                    <span
                      className={
                        workshop.status === "upcoming"
                          ? "bg-primary/20 text-primary"
                          : workshop.status === "ongoing"
                            ? "bg-success/20 text-success"
                            : workshop.status === "completed"
                              ? "bg-info/20 text-info"
                              : "bg-error/20 text-error"
                      }
                    >
                      {workshop.status.charAt(0).toUpperCase() + workshop.status.slice(1)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-secondary gap-2 text-sm">
                    <span className="material-symbols-outlined text-sm">event</span>
                    {new Date(workshop.event_date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric"
                    })}
                  </div>
                  <div className="flex items-center text-secondary gap-2 text-sm">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    {workshop.location}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-1.5 text-secondary">
                    <span className="material-symbols-outlined text-sm">photo_library</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {workshop.gallery_images.length} Photos
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">group</span>
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      {workshop.total_registrations} Registrations
                    </span>
                  </div>
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
          ))}

          {/* Empty State */}
          {filteredWorkshops.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-12">
              <span className="material-symbols-outlined text-xl text-secondary mb-4">search</span>
              <p className="text-center text-secondary">No workshops match your filters</p>
            </div>
          )}
        </div>
      </div>

      {/* Side Drawer: Add/Edit Workshop */}
      <div
        className={`fixed inset-0 z-[60] drawer-overlay transition-opacity duration-300 bg-black/20 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out border-l border-border flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md">
              {selectedWorkshop ? "Edit Workshop" : "Add Workshop"}
            </h3>
            <p className="text-secondary text-sm">
              {selectedWorkshop ? "Modify workshop details" : "Create a new session for the catalog"}
            </p>
          </div>
          <button
            className="p-2 hover:bg-bg-alt rounded-full text-secondary transition-colors"
            onClick={() => {
              setIsDrawerOpen(false);
              setSelectedWorkshop(null);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <form className="space-y-6">
            {/* Text Fields */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">Workshop Title</label>
                <input
                  className="w-full h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all"
                  placeholder="e.g. Intro to ROS Navigation"
                  type="text"
                  defaultValue={selectedWorkshop?.title || ""}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">Description</label>
                <textarea
                  className="w-full px-4 py-3 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all"
                  placeholder="Describe the learning objectives and prerequisites..."
                  rows={4}
                  defaultValue={selectedWorkshop?.description || ""}
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Date</label>
                  <input
                    className="w-full h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all"
                    type="date"
                    defaultValue={selectedWorkshop?.event_date || ""}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-on-surface mb-1">Venue</label>
                  <div className="relative">
                    <select
                      className="w-full h-11 px-4 pr-10 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all appearance-none"
                    >
                      <option>Select Location</option>
                      <option>Innovation Lab, Campus A</option>
                      <option>Delta Hall, Engineering Wing</option>
                      <option>Main Auditorium</option>
                      <option>Embedded Systems Lab</option>
                      <option>Metaverse Hub, Innovation Center</option>
                    </select>
                    <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">expand_more</span>
                  </div>
                </div>
              </div>

              {/* Status Selector */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">Status</label>
                <div className="relative">
                  <select
                    className="w-full h-11 px-4 pr-10 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all appearance-none"
                  >
                    <option value="upcoming">Upcoming</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-semibold text-on-surface mb-1">Image URL</label>
                <input
                  className="w-full h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all"
                  placeholder="https://example.com/image.jpg"
                  type="text"
                  defaultValue={selectedWorkshop?.image_url || ""}
                />
              </div>

              {/* Published Toggle */}
              <div className="flex items-center gap-3">
                <label className="text-sm font-semibold text-on-surface">Published</label>
                <div className="relative w-11 h-6">
                  <input
                    type="checkbox"
                    className="absolute inset-0 h-4 w-4 rounded border-border bg-white focus:ring-2 focus:ring-primary-container"
                    checked={selectedWorkshop?.is_published ?? false}
                    onChange={() => {}}
                  />
                  <div className="absolute inset-0 bg-primary-container/20 rounded-full transition-all"
                     style={{ left: (selectedWorkshop?.is_published ?? false) ? "auto" : "0", right: (selectedWorkshop?.is_published ?? false) ? "0" : "auto" }}></div>
                  <div className="absolute left-0 top-0 h-6 w-6 rounded-full bg-primary-container transition-all"
                     style={{ transform: (selectedWorkshop?.is_published ?? false) ? "translateX(100%)" : "translateX(0)" }}></div>
                </div>
              </div>
            </div>

            {/* Media Uploads */}
            <div className="space-y-4 pt-4 border-t border-border">
              <h4 className="text-sm font-bold uppercase tracking-wider text-secondary">Media Assets</h4>

              {/* Poster Upload */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-2">POSTER IMAGE</label>
                <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center bg-bg-alt hover:bg-surface-container-low hover:border-primary-container transition-all cursor-pointer group">
                  <span className="material-symbols-outlined text-4xl text-secondary group-hover:text-primary transition-colors mb-2">add_photo_alternate</span>
                  <p className="text-sm text-secondary font-medium"><span className="text-primary">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-secondary mt-1">Recommended size: 1200x800px</p>
                </div>
              </div>

              {/* Gallery Multi-upload */}
              <div>
                <label className="block text-xs font-bold text-secondary mb-2">GALLERY IMAGES (OPTIONAL)</label>
                <div className="grid grid-cols-4 gap-2">
                  <div className="aspect-square bg-bg-alt border border-border rounded-lg flex items-center justify-center text-secondary hover:border-primary-container hover:text-primary cursor-pointer transition-all">
                    <span className="material-symbols-outlined">add</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Drawer Actions */}
        <div className="p-6 border-t border-border flex items-center gap-4 bg-white">
          <button
            type="button"
            className="flex-1 px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors"
            onClick={() => {
              setIsDrawerOpen(false);
              setSelectedWorkshop(null);
            }}
          >
            Cancel
          </button>
          <button className="flex-1 px-6 py-2.5 bg-primary-container text-white rounded-lg font-body-md-bold hover:bg-primary transition-colors shadow-sm">
            {selectedWorkshop ? "Update Workshop" : "Save Workshop"}
          </button>
        </div>
      </div>

      {/* Side Drawer: Registrations View */}
      <div
        className={`fixed inset-0 z-[60] drawer-overlay transition-opacity duration-300 bg-black/20 ${isRegistrationsDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsRegistrationsDrawerOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-[480px] bg-white z-[70] shadow-2xl transition-transform duration-300 ease-in-out border-l border-border flex flex-col ${isRegistrationsDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex items-center justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md">
              {selectedWorkshop ? `${selectedWorkshop.title} Registrations` : "Registrations"}
            </h3>
            <p className="text-secondary text-sm">
              View and manage participant registrations
            </p>
          </div>
          <button
            className="p-2 hover:bg-bg-alt rounded-full text-secondary transition-colors"
            onClick={() => {
              setIsRegistrationsDrawerOpen(false);
              setSelectedWorkshop(null);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          {/* Registrations Table */}
          <div className="space-y-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-bg-alt">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Student Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Registered At
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {selectedWorkshop ? (
                    mockRegistrations
                      .filter(reg => reg.workshop === selectedWorkshop!.id)
                      .map(reg => (
                        <tr key={reg.id} className="hover:bg-bg-alt">
                          <td className="px-6 py-4 text-body-md whitespace-nowrap">
                            {reg.student_name}
                          </td>
                          <td className="px-6 py-4 text-body-md whitespace-nowrap">
                            <span className={
                              reg.status === "registered"
                                ? "bg-primary/20 text-primary px-2 py-0.5 rounded text-xs"
                                : reg.status === "attended"
                                  ? "bg-success/20 text-success px-2 py-0.5 rounded text-xs"
                                  : "bg-error/20 text-error px-2 py-0.5 rounded text-xs"
                            }>
                              {reg.status.charAt(0).toUpperCase() + reg.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-body-md whitespace-nowrap">
                            {new Date(reg.created_at).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric"
                            })}
                          </td>
                          <td className="px-6 py-4 text-body-md whitespace-nowrap text-right">
                            <button
                              className="text-sm text-primary hover:text-primary/80 px-2 py-1"
                            >
                              <span className="material-symbols-outlined">edit</span>
                            </button>
                          </td>
                        </tr>
                      ))
                  ) : (
                    <tr>
                      <td className="px-6 py-4 text-center text-secondary col-span-4">
                        Select a workshop to view registrations
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {!selectedWorkshop || mockRegistrations.filter(reg => reg.workshop === selectedWorkshop!.id).length === 0 && (
              <div className="flex flex-col items-center justify-center py-8">
                <span className="material-symbols-outlined text-xl text-secondary mb-4">people</span>
                <p className="text-center text-secondary">
                  {selectedWorkshop ? "No registrations found for this workshop" : "Select a workshop to view registrations"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Drawer Actions */}
        <div className="p-6 border-t border-border flex items-center gap-4 bg-white">
          <button
            type="button"
            className="flex-1 px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors"
            onClick={() => {
              setIsRegistrationsDrawerOpen(false);
              setSelectedWorkshop(null);
            }}
          >
            Close
          </button>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <div
        className={`fixed inset-0 z-[80] dialog-overlay flex items-center justify-center bg-black/20 ${isDeleteConfirmOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>
      <div
        className={`fixed z-[90] bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl ${isDeleteConfirmOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} transition-all duration-300`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md">Delete Workshop</h3>
            <button
              className="p-2 hover:bg-bg-alt rounded-full text-secondary transition-colors"
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                setWorkshopToDelete(null);
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <p className="text-body-md text-center">
            Are you sure you want to delete this workshop? This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">
            <button
              className="flex-1 px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors"
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                setWorkshopToDelete(null);
              }}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-6 py-2.5 bg-error text-white rounded-lg font-body-md-bold hover:bg-error/80 transition-colors shadow-sm"
              onClick={handleDeleteConfirm}
            >
              Delete Workshop
            </button>
          </div>
        </div>
      </div>
    </>
  );
}