"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { Enrollment, Workshop, InventoryItem } from "@/lib/types";

export default function AdminDashboardPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [enrollmentsData, workshopsData, inventoryData] = await Promise.all([
          api.enrollments.myEnrollments(),
          api.workshops.list(),
          api.inventory.list(),
        ]);
        setEnrollments(enrollmentsData);
        setWorkshops(workshopsData);
        setInventory(inventoryData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-container-padding flex-1 overflow-y-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse" />
            <div className="h-4 w-64 bg-surface-container-high rounded animate-pulse mt-2" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-surface-container-lowest border border-border rounded-xl p-5 animate-pulse">
              <div className="h-4 w-24 bg-surface-container-high rounded mb-4" />
              <div className="h-8 w-16 bg-surface-container-high rounded" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-container-padding flex-1 overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-4xl text-danger mb-4 block">error</span>
          <p className="text-on-surface font-body-md-bold">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const activeEnrollments = enrollments.filter((e) => e.status === "active");
  const lowStockItems = inventory.filter((i) => i.is_low_stock || i.quantity === 0);
  const upcomingWorkshops = workshops.filter((w) => w.status === "upcoming").slice(0, 3);
  const recentEnrollments = [...enrollments]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 5);

  return (
    <div className="p-container-padding flex-1 overflow-y-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Dashboard</h2>
          <p className="text-secondary mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="text-sm text-secondary bg-surface-container-low px-3 py-1.5 rounded-md border border-border">
          <span className="font-medium text-on-surface">Last synced:</span> Just now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-secondary font-medium">Total Enrollments</p>
            <span className="material-symbols-outlined text-primary bg-accent-tint p-1.5 rounded-md">group</span>
          </div>
          <div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">{enrollments.length}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-secondary font-medium">Active Enrollments</p>
            <span className="material-symbols-outlined text-primary bg-accent-tint p-1.5 rounded-md">school</span>
          </div>
          <div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">{activeEnrollments.length}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-secondary font-medium">Total Workshops</p>
            <span className="material-symbols-outlined text-primary bg-accent-tint p-1.5 rounded-md">precision_manufacturing</span>
          </div>
          <div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">{workshops.length}</h3>
          </div>
        </div>

        <div className="bg-surface-container-lowest border border-border rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <p className="text-secondary font-medium">Pending Inventory</p>
            <span className="material-symbols-outlined text-warning bg-surface-container-high p-1.5 rounded-md">inventory_2</span>
          </div>
          <div>
            <h3 className="font-headline-lg text-headline-lg text-on-surface">{lowStockItems.length}</h3>
            {lowStockItems.length > 0 && (
              <p className="text-danger text-sm flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                Action required
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-border rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden flex flex-col h-full">
            <div className="p-5 border-b border-border flex justify-between items-center bg-surface-bright">
              <h3 className="font-headline-md text-headline-md text-on-surface">Recent Enrollments</h3>
            </div>
            <div className="overflow-x-auto flex-1 p-5">
              {recentEnrollments.length === 0 ? (
                <p className="text-secondary text-center py-8">No enrollments yet</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-secondary font-label-sm uppercase tracking-wider border-b border-border">
                      <th className="pb-3 font-semibold">Student ID</th>
                      <th className="pb-3 font-semibold">Course</th>
                      <th className="pb-3 font-semibold">Date</th>
                      <th className="pb-3 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-body-md text-on-surface divide-y divide-border">
                    {recentEnrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="hover:bg-bg-alt transition-colors">
                        <td className="py-4 font-medium">{enrollment.student}</td>
                        <td className="py-4 text-secondary">{enrollment.course_title}</td>
                        <td className="py-4 text-secondary">
                          {new Date(enrollment.created_at).toLocaleDateString("en-US", {
                            month: "short", day: "numeric", year: "numeric",
                          })}
                        </td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              enrollment.status === "active"
                                ? "bg-green-100 text-success"
                                : enrollment.status === "rejected"
                                  ? "bg-red-100 text-danger"
                                  : "bg-yellow-100 text-warning"
                            }`}
                          >
                            {enrollment.status.replace(/_/g, " ")}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-border rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="p-5 border-b border-border bg-surface-bright">
              <h3 className="font-headline-md text-headline-md text-on-surface">Upcoming Workshops</h3>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {upcomingWorkshops.length === 0 ? (
                <p className="text-secondary text-sm">No upcoming workshops</p>
              ) : (
                upcomingWorkshops.map((workshop) => (
                  <div key={workshop.id} className="flex gap-4 items-start pb-4 border-b border-border last:border-0 last:pb-0">
                    <div className="bg-surface-container-low border border-outline-variant rounded-lg p-2 text-center min-w-[50px]">
                      <p className="text-xs font-bold text-secondary uppercase">
                        {new Date(workshop.event_date).toLocaleDateString("en-US", { month: "short" })}
                      </p>
                      <p className="font-headline-sm text-primary">
                        {new Date(workshop.event_date).getDate()}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-body-md-bold text-on-surface">{workshop.title}</h4>
                      <p className="text-sm text-secondary flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[14px]">location_on</span>
                        {workshop.location}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {lowStockItems.length > 0 && (
            <div className="bg-surface-container-lowest border border-danger/20 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.06)] overflow-hidden">
              <div className="p-5 border-b border-border bg-error-container/30 flex justify-between items-center">
                <h3 className="font-headline-md text-headline-md text-on-surface flex items-center gap-2">
                  <span className="material-symbols-outlined text-danger">warning</span>
                  Inventory Alerts
                </h3>
              </div>
              <div className="p-5 flex flex-col gap-3">
                {lowStockItems.slice(0, 5).map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-bg-alt rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-on-surface">{item.name}</p>
                      <p className="text-xs text-secondary mt-0.5">{item.location}</p>
                    </div>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                        item.quantity === 0
                          ? "bg-red-100 text-danger border border-red-200"
                          : "bg-yellow-100 text-warning border border-yellow-200"
                      }`}
                    >
                      {item.quantity === 0 ? "Out of Stock" : `${item.quantity} Left`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
