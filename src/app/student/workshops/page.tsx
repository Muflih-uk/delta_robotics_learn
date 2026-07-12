"use client";

import { useState } from "react";

const workshops = [
  {
    id: "ws-1",
    title: "Robot Arm Assembly Masterclass",
    description: "Hands-on workshop covering 6-DOF arm assembly, wiring, and basic calibration routines.",
    date: "Aug 15, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "Lab A – Delta Campus",
    capacity: "24 seats",
    spotsLeft: 8,
    price: "₹2,500",
    status: "Upcoming",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDbI3dMEiqkD4MSv6UKBt-FORF7eU9dMPG45PJeK9z5g0byCEQRcXO26piLLycV8FsV6cupeuLxQNK3bdf6crxvyRC20HotjdqRxc53ABhiTArRioiEqAH4-VQgGz6wzsIXB_g7vzCeCd3684B3N6JKFgR6npNWjZ5qZ9wn0Iuylmkyzty9zh_w_lsdtiB46XUTwB_FC97Lfu5clLGJwDwvL8W8od1IydpsZL1y5z30bsIlJpOtU6lu",
  },
  {
    id: "ws-2",
    title: "Computer Vision with OpenCV",
    description: "Learn real-time object detection, image segmentation, and camera calibration techniques.",
    date: "Aug 22, 2026",
    time: "9:00 AM – 3:00 PM",
    location: "Lab B – Delta Campus",
    capacity: "30 seats",
    spotsLeft: 14,
    price: "₹1,800",
    status: "Upcoming",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuC8axthSmIISmFdKV19EdJN6-P7iGbcVw_-0wnbNr4j1CXSBldlnCutOoTHwJXSuK-1zEXEfbFuRMp6exGcvOp-MCp5cfl_LXwO0Ta0lIeo1xJxNfAE74k4jGAuKfNkm5BTz2rcHB5fBWsPWE1BwYXJM-qs_Tm3WJ85at5SDzi31ohaIbhwZyZH-Cc4gcHEajBMvxJKCq5Wfd55zmsRUX5gBQ-dMNp4v3yhxFQYeXm8rxsSkYyQ-iXy",
  },
  {
    id: "ws-3",
    title: "PCB Design & Soldering Bootcamp",
    description: "Design custom PCBs using KiCad, learn SMD soldering, and build a motor driver from scratch.",
    date: "Sep 5, 2026",
    time: "10:00 AM – 5:00 PM",
    location: "Electronics Workshop – Delta Campus",
    capacity: "16 seats",
    spotsLeft: 3,
    price: "₹3,200",
    status: "Upcoming",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDH-6l7lvztv05L39jJsy0XDRz5s0TF8lVr1kRLQJZWU_VtVc5ltNgFXR1xsNAEHyBifZr0uJvVgfanHX80rkvMrC5kgRyeJ6eAV2DF5TLnRWwY3Q-HdpicYAWeFWrLDH2WI4rZYFIWrkr9pNUdJQ8TZYh7pny6ocd7AH-SteeLXFLY8Vdqr7nwOsJQBiMNZhAhltJ0-bqAmOrmv9WtdHuxUWcczcwMgCyurpOclsVL-vQzv6AaSqzp",
  },
  {
    id: "ws-4",
    title: "Autonomous Navigation with ROS 2",
    description: "SLAM, path planning, and obstacle avoidance on real mobile robots using ROS 2 Nav2.",
    date: "Jul 20, 2026",
    time: "10:00 AM – 4:00 PM",
    location: "Robotics Arena – Delta Campus",
    capacity: "20 seats",
    spotsLeft: 0,
    price: "₹2,800",
    status: "Completed",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuDt6ITKcFxqbcJHAY2nhffopdO5wu-0ytTnIog6DLy6YVcHw1iuEXu3S9b4rUeZTtvuiHfZ7-gPyC3rX04tSVbLIU1_88ViCmqs2NvphVrrihLGm0Ve1El4Wtc5v1JEdK0SSjgV9pc2I7S5xea30UMi2SlbICGafJdj6-d5352ONGutxOGTw-j5XNvG2W6LmljDug-c9UwDHWx9RU08p1oBmnfuxbUAKwbz_xLdujSYF_-Rh5J4o11t",
  },
  {
    id: "ws-5",
    title: "Drone Building & Flight Control",
    description: "Build a quadcopter from parts, flash firmware, tune PID, and complete your maiden flight.",
    date: "Sep 20, 2026",
    time: "9:00 AM – 6:00 PM",
    location: "Outdoor Field – Delta Campus",
    capacity: "12 seats",
    spotsLeft: 12,
    price: "₹4,500",
    status: "Upcoming",
    thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCt3CP2vXOX1ojAKwE4gt2z2tbfKwPK3ssH-IZHzF4-koM0tPv1AUxG_IVFN_Vso6nnwWW7V4pQPWCrv6yms4SdoG61XBm3O72eXOTkgMVhyo7SD2DKHZ6EhCVzZDJEWoFGHh-ZQQPgrnA4FsRdnIoh8rncbxqQ78VUdXR5rteIRh1CH0oL82yg1uZOi2Uiw_jrtBuOG65ZdEqljVzJh6qwGlRxVYEKaAlEp9IQwRT4zEJzV1lfMrnJ",
  },
];

const statusStyles: Record<string, { bg: string; text: string }> = {
  Upcoming: { bg: "bg-white/90", text: "text-primary" },
  Ongoing: { bg: "bg-primary-container", text: "text-white" },
  Completed: { bg: "bg-surface-dim/90", text: "text-on-surface-variant" },
};

export default function StudentWorkshopsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedWorkshop, setSelectedWorkshop] = useState<typeof workshops[0] | null>(null);

  const filtered = workshops.filter((w) => {
    const matchesSearch = w.title.toLowerCase().includes(search.toLowerCase()) || w.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || w.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <div className="p-container-padding max-w-[1440px] mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface">Workshops</h2>
            <p className="text-on-surface-variant font-body-md text-body-md">Browse upcoming hands-on workshops and reserve your spot.</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-col">
              <label className="text-[10px] font-bold uppercase text-on-surface-variant mb-1 px-1">Status</label>
              <select
                className="h-10 px-3 rounded-lg border border-border bg-white text-body-md focus:ring-1 focus:ring-primary outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="Upcoming">Upcoming</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
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

        {/* Workshop Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((ws) => {
            const style = statusStyles[ws.status] || statusStyles.Upcoming;
            return (
              <div
                key={ws.id}
                className={`group bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer ${ws.status === "Completed" ? "opacity-75 grayscale-[0.3]" : ""}`}
                onClick={() => setSelectedWorkshop(ws)}
              >
                <div className="relative h-48 bg-surface-container-low overflow-hidden">
                  <div
                    className="w-full h-full bg-cover bg-center transform group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url('${ws.thumbnail}')` }}
                  ></div>
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className={`px-2 py-1 backdrop-blur rounded text-[10px] font-bold uppercase tracking-wider shadow-sm border border-border ${style.bg} ${style.text}`}>
                      {ws.status}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 group-hover:text-primary transition-colors">{ws.title}</h3>
                  <p className="text-on-surface-variant text-body-md font-body-md line-clamp-2 mb-4">{ws.description}</p>
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant mb-4">
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">calendar_today</span>
                      {ws.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm">schedule</span>
                      {ws.time.split(" – ")[0]}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <span className="font-body-md-bold text-on-surface">{ws.price}</span>
                    {ws.spotsLeft > 0 ? (
                      <span className="text-[11px] text-primary font-bold">{ws.spotsLeft} spots left</span>
                    ) : (
                      <span className="text-[11px] text-on-surface-variant font-medium">Fully booked</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <span className="material-symbols-outlined text-5xl text-on-surface-variant/30 mb-4 block">search_off</span>
            <p className="text-headline-md text-on-surface-variant">No workshops match your search.</p>
          </div>
        )}
      </div>

      {/* Workshop Detail Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${selectedWorkshop ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setSelectedWorkshop(null)}
      >
        <div className="absolute inset-0 bg-on-background/40 backdrop-blur-sm"></div>
        <div
          className={`absolute right-0 top-0 h-full w-full max-w-[480px] bg-white shadow-2xl transition-transform duration-300 flex flex-col border-l border-border ${selectedWorkshop ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="px-6 py-6 border-b border-border flex items-center justify-between bg-bg-alt">
            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface">Workshop Details</h2>
              <p className="text-on-surface-variant text-body-md font-body-md">Review details and enroll</p>
            </div>
            <button
              className="p-2 hover:bg-surface-container rounded-full transition-all text-on-surface-variant"
              onClick={() => setSelectedWorkshop(null)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content */}
          {selectedWorkshop && (
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-6">
              {/* Thumbnail */}
              <div className="h-48 rounded-xl overflow-hidden bg-surface-container-low">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url('${selectedWorkshop.thumbnail}')` }}
                ></div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="font-headline-md text-headline-md text-on-surface mb-2">{selectedWorkshop.title}</h3>
                <p className="text-on-surface-variant text-body-md">{selectedWorkshop.description}</p>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    Date
                  </div>
                  <div className="font-body-md-bold text-on-surface">{selectedWorkshop.date}</div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Time
                  </div>
                  <div className="font-body-md-bold text-on-surface">{selectedWorkshop.time}</div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    Location
                  </div>
                  <div className="font-body-md-bold text-on-surface text-sm">{selectedWorkshop.location}</div>
                </div>
                <div className="p-4 bg-surface-container-low rounded-xl">
                  <div className="flex items-center gap-2 text-on-surface-variant text-xs font-bold uppercase mb-1">
                    <span className="material-symbols-outlined text-sm">group</span>
                    Capacity
                  </div>
                  <div className="font-body-md-bold text-on-surface">{selectedWorkshop.capacity}</div>
                </div>
              </div>

              {/* Price & Availability */}
              <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-xl">
                <div>
                  <div className="text-xs font-bold text-on-surface-variant uppercase">Fee</div>
                  <div className="font-headline-md text-headline-md text-primary-container">{selectedWorkshop.price}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-on-surface-variant uppercase">Availability</div>
                  {selectedWorkshop.spotsLeft > 0 ? (
                    <div className="font-body-md-bold text-primary">{selectedWorkshop.spotsLeft} spots left</div>
                  ) : (
                    <div className="font-body-md-bold text-on-surface-variant">Sold out</div>
                  )}
                </div>
              </div>

              {/* Placeholder QR */}
              {selectedWorkshop.spotsLeft > 0 && selectedWorkshop.status !== "Completed" && (
                <div className="border-2 border-dashed border-border rounded-xl p-6 text-center bg-bg-alt">
                  <div className="w-32 h-32 mx-auto mb-4 bg-surface-container rounded-lg flex items-center justify-center">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant">qr_code_2</span>
                  </div>
                  <p className="font-body-md-bold text-on-surface mb-1">Scan to Pay</p>
                  <p className="text-xs text-on-surface-variant">Payment gateway integration coming soon</p>
                </div>
              )}
            </div>
          )}

          {/* Footer */}
          <div className="px-6 py-6 border-t border-border flex gap-3">
            <button
              className="flex-1 px-4 py-2.5 rounded-lg border border-border font-body-md-bold text-on-surface hover:bg-bg-alt transition-all"
              onClick={() => setSelectedWorkshop(null)}
            >
              Close
            </button>
            {selectedWorkshop && selectedWorkshop.spotsLeft > 0 && selectedWorkshop.status !== "Completed" && (
              <button className="flex-1 px-4 py-2.5 rounded-lg bg-primary-container text-white font-body-md-bold hover:brightness-110 shadow-sm transition-all flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">shopping_cart</span>
                Enroll & Pay
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
