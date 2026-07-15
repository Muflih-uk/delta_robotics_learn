"use client";

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

export default function DashboardPage() {
  const metrics = [
    { label: 'Total Students', value: '1,248', icon: Users, change: '+12% this month', trend: 'up' },
    { label: 'Active Enrollments', value: '856', icon: GraduationCap, change: '+5% this month', trend: 'up' },
    { label: 'Revenue (MTD)', value: '$42.5k', icon: CreditCard, change: '+18% vs last month', trend: 'up' },
    { label: 'Pending Inventory', value: '24', icon: Package, change: 'Action required', trend: 'down', alert: true },
  ];

  const recentEnrollments = [
    { id: 1, name: 'Sarah Jenkins', initials: 'SJ', course: 'Intro to Python Robotics', date: 'Oct 24, 2023', status: 'Active' },
    { id: 2, name: 'Marcus Chen', initials: 'MC', course: 'Advanced Kinematics', date: 'Oct 23, 2023', status: 'Pending' },
    { id: 3, name: 'Elena E Carter', initials: 'EEC', course: 'Drone Assembly 101', date: 'Oct 22, 2023', status: 'Active' },
    { id: 4, name: 'David Rodriguez', initials: 'DR', course: 'Intro to Python Robotics', date: 'Oct 22, 2023', status: 'Active' },
  ];

  const upcomingWorkshops = [
    { date: 'Oct 28', title: 'VEX Robotics Challenge', instructor: 'Dr. A. Smith' },
    { date: 'Nov 02', title: 'ROS Fundamentals', instructor: 'B. Johnson' },
    { date: 'Nov 15', title: '3D Printing for Bots', instructor: 'C. Davis' },
  ];

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
              <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-border">
                <div>
                  <p className="font-medium text-on-surface">Servo Motors (Micro)</p>
                  <p className="text-xs text-secondary mt-0.5">SKU: SM-104</p>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                  3 Left
                </span>
              </div>
              <div className="flex justify-between items-center p-3 bg-surface-container-low rounded-lg border border-border">
                <div>
                  <p className="font-medium text-on-surface">Arduino Uno R3</p>
                  <p className="text-xs text-secondary mt-0.5">SKU: AU-R3</p>
                </div>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                  Out of Stock
                </span>
              </div>
              <button className="w-full py-2 mt-1 text-primary font-medium hover:underline text-sm text-center">
                Manage Inventory →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
