"use client";

import { useState } from "react";

// Import types from lib/types
import type { Workshop, WorkshopRegistration, WorkshopStatus } from "@/lib/types";

// Mock workshop data shaped to API types
const mockWorkshops: Workshop[] = [
  {
    id: "ws-1",
    title: "Robot Arm Assembly Masterclass",
    description: "Hands-on workshop covering 6-DOF arm assembly, wiring, and basic calibration routines.",
    status: "upcoming" as WorkshopStatus,
    event_date: "2026-08-15",
    location: "Lab A – Delta Campus",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbI3dMEiqkD4MSv6UKBt-FORF7eU9dMPG45PJeK9z5g0byCEQRcXO26piLLycV8FsV6cupeuLxQNK3bdf6crxvyRC20HotjdqRxc53ABhiTArRioiEqAH4-VQgGz6wzsIXB_g7vzCeCd3684B3N6JKFgR6npNWjZ5qZ9wn0Iuylmkyzty9zh_w_lsdtiB46XUTwB_FC97Lfu5clLGJwDwvL8W8od1IydpsZL1y5z30bsIlJpOtU6lu",
    is_published: true,
    gallery_images: [
      "https://example.com/ws1-gallery1.jpg",
      "https://example.com/ws1-gallery2.jpg"
    ],
    total_registrations: 16,
    created_at: "2026-07-01T10:00:00Z",
    updated_at: "2026-07-15T14:30:00Z"
  },
  {
    id: "ws-2",
    title: "Computer Vision with OpenCV",
    description: "Learn real-time object detection, image segmentation, and camera calibration techniques.",
    status: "upcoming" as WorkshopStatus,
    event_date: "2026-08-22",
    location: "Lab B – Delta Campus",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8axthSmIISmFdKV19EdJN6-P7iGbcVw_-0wnbNr4j1CXSBldlnCutOoTHwJXSuK-1zEXEfbFuRMp6exGcvOp-MCp5cfl_LXwO0Ta0lIeo1xJxNfAE74k4jGAuKfNkm5BTz2rcHB5fBWsPWE1BwYXJM-qs_Tm3WJ85at5SDzi31ohaIbhwZyZH-Cc4gcHEajBMvxJKCq5Wfd55zmsRUX5gBQ-dMNp4v3yhxFQYeXm8rxsSkYyQ-iXy",
    is_published: true,
    gallery_images: [
      "https://example.com/ws2-gallery1.jpg"
    ],
    total_registrations: 16,
    created_at: "2026-07-05T09:00:00Z",
    updated_at: "2026-07-18T11:20:00Z"
  },
  {
    id: "ws-3",
    title: "PCB Design & Soldering Bootcamp",
    description: "Design custom PCBs using KiCad, learn SMD soldering, and build a motor driver from scratch.",
    status: "upcoming" as WorkshopStatus,
    event_date: "2026-09-05",
    location: "Electronics Workshop – Delta Campus",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH-6l7lvztv05L39jJsy0XDRz5s0TF8lVr1kRLQJZWU_VtVc5ltNgFXR1xsNAEHyBifZr0uJvVgfanHX80rkvMrC5kgRyeJ6eAV2DF5TLnRWwY3Q-HdpicYAWeFWrLDH2WI4rZYFIWrkr9pNUdJQ8TZYh7pny6ocd7AH-SteeLXFLY8Vdqr7nwOsJQBiMNZhAhltJ0-bqAmOrmv9WtdHuxUWcczcwMgCyurpOclsVL-vQzv6AaSqzp",
    is_published: true,
    gallery_images: [
      "https://example.com/ws3-gallery1.jpg",
      "https://example.com/ws3-gallery2.jpg",
      "https://example.com/ws3-gallery3.jpg"
    ],
    total_registrations: 13,
    created_at: "2026-07-10T10:00:00Z",
    updated_at: "2026-08-20T16:45:00Z"
  },
  {
    id: "ws-4",
    title: "Autonomous Navigation with ROS 2",
    description: "SLAM, path planning, and obstacle avoidance on real mobile robots using ROS 2 Nav2.",
    status: "completed" as WorkshopStatus,
    event_date: "2026-07-20",
    location: "Robotics Arena – Delta Campus",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt6ITKcFxqbcJHAY2nhffopdO5wu-0ytTnIog6DLy6YVcHw1iuEXu3S9b4rUeZTtvuiHfZ7-gPyC3rX04tSVbLIU1_88ViCmqs2NvphVrrihLGm0Ve1El4Wtc5v1JEdK0SSjgV9pc2I7S5xea30UMi2SlbICGafJdj6-d5352ONGutxOGTw-j5XNvG2W6LmljDug-c9UwDHWx9RU08p1oBmnfuxbUAKwbz_xLdujSYF_-Rh5J4o11t",
    is_published: true,
    gallery_images: [
      "https://example.com/ws4-gallery1.jpg",
      "https://example.com/ws4-gallery2.jpg"
    ],
    total_registrations: 20,
    created_at: "2026-06-15T10:00:00Z",
    updated_at: "2026-07-21T09:30:00Z"
  },
  {
    id: "ws-5",
    title: "Drone Building & Flight Control",
    description: "Build a quadcopter from parts, flash firmware, tune PID, and complete your maiden flight.",
    status: "upcoming" as WorkshopStatus,
    event_date: "2026-09-20",
    location: "Outdoor Field – Delta Campus",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt3CP2vXOX1ojAKwE4gt2z2tbfKwPK3ssH-IZHzF4-koM0tPv1AUxG_IVFN_Vso6nnwWW7V4pQPWCrv6yms4SdoG61XBm3O72eXOTkgMVhyo7SD2DKHZ6EhCVzZDJEWoFGHh-ZQQPgrnA4FsRdnIoh8rncbxqQ78VUdXR5rteIRh1CH0oL82yg1uZOi2Uiw_jrtBuOG65ZdEqljVzJh6qwGlRxVYEKaAlEp9IQwRT4zEJzV1lfMrnJ",
    is_published: true,
    gallery_images: [
      "https://example.com/ws5-gallery1.jpg",
      "https://example.com/ws5-gallery2.jpg"
    ],
    total_registrations: 0,
    created_at: "2026-07-20T09:00:00Z",
    updated_at: "2026-08-10T11:20:00Z"
  }
];

// Mock workshop registrations data
const mockRegistrations: WorkshopRegistration[] = [
  {
    id: "reg1",
    workshop: "ws-1",
    workshop_title: "Robot Arm Assembly Masterclass",
    student: "stu-current-user",
    student_name: "Current Student",
    status: "registered",
    created_at: "2026-07-10T09:30:00Z"
  },
  {
    id: "reg2",
    workshop: "ws-3",
    workshop_title: "PCB Design & Soldering Bootcamp",
    student: "stu-current-user",
    student_name: "Current Student",
    status: "registered",
    created_at: "2026-07-15T14:15:00Z"
  }
];

export default function StudentWorkshopsPage() {
  const [workshops, setWorkshops] = useState<Workshop[]>(mockWorkshops);
  const [registrations, setRegistrations] = useState<WorkshopRegistration[]>(mockRegistrations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | WorkshopStatus>("all");
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(null);
  const [isRegistrationDrawerOpen, setIsRegistrationDrawerOpen] = useState(false);
  const [isMyRegistrationsOpen, setIsMyRegistrationsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"available" | "my-registrations">("available");

  // Filter workshops based on search and status
  const filteredWorkshops = workshops.filter(workshop => {
    const matchesSearch = workshop.title.toLowerCase().includes(search.toLowerCase()) ||
                         workshop.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || workshop.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Get user's registrations
  const myRegistrations = registrations.filter(reg => reg.student === "stu-current-user");

  // Check if user is registered for a workshop
  const isRegisteredForWorkshop = (workshopId: string) =>
    myRegistrations.some(reg => reg.workshop === workshopId && reg.status !== "cancelled");

  // Handle workshop registration
  const handleRegister = (workshopId: string) => {
    // In a real app, this would call the API:
    // await workshopRegistrations.register(workshopId);
    // For demo, we'll just add to mock data
    const workshop = workshops.find(w => w.id === workshopId);
    if (workshop) {
      const newRegistration: WorkshopRegistration = {
        id: `reg${Date.now()}`,
        workshop: workshopId,
        workshop_title: workshop.title,
        student: "stu-current-user",
        student_name: "Current Student",
        status: "registered",
        created_at: new Date().toISOString()
      };
      setRegistrations([...registrations, newRegistration]);

      // Update workshop registration count
      setWorkshops(workshops.map(w =>
        w.id === workshopId
          ? {...w, total_registrations: w.total_registrations + 1}
          : w
      ));
    }

    setIsRegistrationDrawerOpen(false);
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
        {activeTab === "available" ? (
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
              My Registrations ({myRegistrations.length})
            </h3>
            {myRegistrations.length === 0 ? (
              <div className="text-center py-8">
                <span className="material-symbols-outlined text-xl text-secondary mb-4">person_off</span>
                <p className="text-center text-secondary">You haven't registered for any workshops yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {myRegistrations.map(registration => (
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
                                  handleRegister(selectedWorkshop.id);
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
              <button className="flex-1 px-6 py-2.5 bg-primary-container text-white rounded-lg font-body-md-bold hover:bg-primary transition-colors shadow-sm">
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