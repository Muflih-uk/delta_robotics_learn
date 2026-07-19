"use client";

import { useState, useEffect } from 'react';
import { 
  Users, 
  GraduationCap, 
  CreditCard, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  MoreVertical,
  User
} from 'lucide-react';
import { api } from '@/lib/api';
import type { Enrollment, Workshop, InventoryItem } from '@/lib/types';

export default function DashboardPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [inventoryItems, setInventoryItems] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.enrollments.myEnrollments().catch(() => [] as Enrollment[]),
      api.workshops.list().catch(() => [] as Workshop[]),
      api.inventory.list().catch(() => [] as InventoryItem[]),
    ])
      .then(([enr, ws, inv]) => {
        setEnrollments(enr);
        setWorkshops(ws);
        setInventoryItems(inv);
      })
      .finally(() => setLoading(false));
  }, []);

  const activeEnrollments = enrollments.filter(e => e.status === "active");
  const lowStockItems = inventoryItems.filter(i => i.is_low_stock);
  const upcomingWorkshopsList = workshops.filter(w => w.status === "upcoming").slice(0, 3);

  const metrics = [
    { label: 'Total Enrollments', value: enrollments.length.toString(), icon: Users, change: `${activeEnrollments.length} active`, trend: 'up' as const },
    { label: 'Active Enrollments', value: activeEnrollments.length.toString(), icon: GraduationCap, change: `${(activeEnrollments.length / Math.max(enrollments.length, 1) * 100).toFixed(0)}% of total`, trend: 'up' as const },
    { label: 'Workshops', value: workshops.length.toString(), icon: CreditCard, change: `${upcomingWorkshopsList.length} upcoming`, trend: 'up' as const },
    { label: 'Low Stock Items', value: lowStockItems.length.toString(), icon: Package, change: 'Action required', trend: 'down' as const, alert: lowStockItems.length > 0 },
  ];

  const recentEnrollments = enrollments.slice(0, 4).map(e => ({
    id: e.id,
    name: e.student,
    initials: e.student.split(' ').map(s => s[0]).join('').slice(0, 2).toUpperCase(),
    course: e.course_title,
    date: new Date(e.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    status: e.status === 'active' ? 'Active' as const : e.status === 'rejected' ? 'Rejected' as const : 'Pending' as const,
  }));

  const upcomingWorkshops = upcomingWorkshopsList.map(ws => ({
    date: new Date(ws.event_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    title: ws.title,
    instructor: ws.location || 'TBD',
  }));

  return (
    <div className="flex flex-col h-full gap-6 p-6 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Dashboard</h2>
          <p className="text-sm text-secondary mt-1">Welcome back. Here's what's happening today.</p>
        </div>
        <div className="text-sm text-secondary bg-surface-container-low px-3 py-1.5 rounded-md border border-border">
          <span className="font-medium text-on-surface">Last synced:</span> Just now
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => {
          const Icon = metric.icon;
          return (
            <div key={i} className="bg-surface border border-border rounded-xl p-5 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <p className="text-sm font-medium text-secondary">{metric.label}</p>
                <div className={`p-1.5 rounded-md ${metric.alert ? 'bg-red-100 text-red-600' : 'bg-primary-container text-on-primary-container'}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-on-surface">{metric.value}</h3>
                  <p className={`text-sm flex items-center gap-1 mt-1 ${metric.alert ? 'text-red-500' : 'text-green-600'}`}>
                    {metric.alert ? <AlertTriangle size={14} /> : <TrendingUp size={14} />}
                    {metric.change}
                  </p>
                </div>
                {/* Simulated sparkline */}
                <div className="flex items-end gap-1 opacity-50 h-8">
                  {[2, 4, 3, 6, 8].map((h, j) => (
                    <div key={j} className={`w-2 rounded-t ${metric.alert ? 'bg-amber-500' : 'bg-primary-container'}`} style={{ height: `${h * 4}px` }} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
          <div className="p-5 border-b border-border flex justify-between items-center bg-surface-container-low">
            <h3 className="text-lg font-semibold text-on-surface">Recent Enrollments</h3>
            <button className="text-sm font-medium text-primary hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto p-5">
            <table className="w-full text-left">
              <thead>
                <tr className="text-xs font-semibold text-secondary uppercase tracking-wider border-b border-border">
                  <th className="pb-3 font-semibold">Student Name</th>
                  <th className="pb-3 font-semibold">Course</th>
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Status</th>
                  <th className="pb-3 text-right font-semibold">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentEnrollments.map((row) => (
                  <tr key={row.id} className="hover:bg-surface-container-low transition-colors group cursor-pointer text-sm">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-xs">
                          {row.initials}
                        </div>
                        <span className="font-medium text-on-surface">{row.name}</span>
                      </div>
                    </td>
                    <td className="py-4 text-secondary">{row.course}</td>
                    <td className="py-4 text-secondary">{row.date}</td>
                    <td className="py-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        row.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="py-4 text-right">
                      <button className="text-secondary hover:text-primary transition-colors p-1">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border bg-surface-container-low">
              <h3 className="text-lg font-semibold text-on-surface">Upcoming Workshops</h3>
            </div>
            <div className="p-5 flex flex-col gap-4">
              {upcomingWorkshops.map((ws, i) => (
                <div key={i} className="flex gap-4 items-start pb-4 border-b border-border last:border-0 last:pb-0">
                  <div className="bg-surface-container-low border border-border rounded-lg p-2 text-center min-w-[50px]">
                    <p className="text-[10px] font-bold text-secondary uppercase">{ws.date.split(' ')[0]}</p>
                    <p className="text-lg font-bold text-primary">{ws.date.split(' ')[1]}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-on-surface text-sm">{ws.title}</h4>
                    <p className="text-xs text-secondary flex items-center gap-1 mt-1">
                      <User size={12} />
                      Inst. {ws.instructor}
                    </p>
                  </div>
                </div>
              ))}
              <button className="w-full py-2 mt-2 bg-surface border border-border rounded-lg text-primary text-sm font-medium hover:bg-surface-container-low transition-colors">
                View Calendar
              </button>
            </div>
          </div>

          <div className="bg-surface border border-red-200 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-red-200 bg-red-50 flex justify-between items-center">
              <h3 className="text-base font-semibold text-on-surface flex items-center gap-2">
                <AlertTriangle size={18} className="text-red-500" />
                Inventory Alerts
              </h3>
            </div>
            <div className="p-4 flex flex-col gap-3 text-sm">
              {lowStockItems.length === 0 ? (
                <p className="text-sm text-secondary text-center py-4">No low stock items.</p>
              ) : (
                lowStockItems.slice(0, 5).map(item => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-border">
                    <div>
                      <p className="font-medium text-on-surface">{item.name}</p>
                      <p className="text-xs text-secondary mt-0.5">{item.category_name}</p>
                    </div>
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.quantity === 0 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-amber-100 text-amber-700 border border-amber-200'
                    }`}>
                      {item.quantity === 0 ? 'Out of Stock' : `${item.quantity} Left`}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
