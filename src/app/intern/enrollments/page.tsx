"use client";

import { useState, useEffect } from "react";
import { CheckCircle2, Clock, DollarSign, UserCheck, Ban } from "lucide-react";
import { api } from "@/lib/api";
import type { Enrollment, EnrollmentStatus } from "@/lib/types";

const statusConfig: Record<EnrollmentStatus, { label: string; className: string; bgClassName: string; dotClassName: string; icon: typeof Clock }> = {
  pending_payment: { label: "Pending Payment", className: "text-amber-700", bgClassName: "bg-amber-100", dotClassName: "bg-amber-500", icon: Clock },
  payment_verification: { label: "Payment Verification", className: "text-orange-700", bgClassName: "bg-orange-100", dotClassName: "bg-orange-500", icon: DollarSign },
  pending_enrollment: { label: "Pending Enrollment", className: "text-blue-700", bgClassName: "bg-blue-100", dotClassName: "bg-blue-500", icon: UserCheck },
  active: { label: "Active", className: "text-green-700", bgClassName: "bg-green-100", dotClassName: "bg-green-500", icon: CheckCircle2 },
  rejected: { label: "Rejected", className: "text-red-700", bgClassName: "bg-red-100", dotClassName: "bg-red-500", icon: Ban },
};

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api.enrollments.myEnrollments()
      .then(setEnrollments)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statusSummary: { status: EnrollmentStatus; count: number; icon: typeof Clock; label: string }[] = [
    { status: "payment_verification", count: enrollments.filter(e => e.status === "payment_verification").length, icon: DollarSign, label: "Payment Verification" },
    { status: "pending_enrollment", count: enrollments.filter(e => e.status === "pending_enrollment").length, icon: UserCheck, label: "Pending Enrollment" },
    { status: "active", count: enrollments.filter(e => e.status === "active").length, icon: CheckCircle2, label: "Active" },
    { status: "rejected", count: enrollments.filter(e => e.status === "rejected").length, icon: Ban, label: "Rejected" },
  ];
  return (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Student Acceptance</h2>
          <p className="text-sm text-secondary mt-1">Review and approve student course enrollments.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 shrink-0">
        {statusSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.status} className="border border-border rounded-xl p-4 bg-surface shadow-sm flex flex-col items-center justify-center text-center hover:shadow-md transition-shadow">
              <Icon className="h-8 w-8 text-secondary mb-2" />
              <h3 className="font-semibold text-lg text-on-surface">{item.count}</h3>
              <p className="text-sm text-secondary">{item.label}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface">
              <tr className="border-b border-border">
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Enrollment ID</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Student</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Course</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Date</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {enrollments.map((enrollment) => {
                const config = statusConfig[enrollment.status];
                const StatusIcon = config.icon;
                const isResolved = enrollment.status === "active" || enrollment.status === "rejected";
                return (
                  <tr key={enrollment.id} className="hover:bg-surface-container-low transition-colors group">
                    <td className="py-4 px-6 font-medium text-on-surface">{enrollment.id}</td>
                    <td className="py-4 px-6 text-on-surface">{enrollment.student}</td>
                    <td className="py-4 px-6 text-on-surface">{enrollment.course_title}</td>
                    <td className="py-4 px-6 text-secondary">{new Date(enrollment.created_at).toLocaleDateString()}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${config.bgClassName} ${config.className}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dotClassName}`} />
                        {config.label}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      {enrollment.status === "payment_verification" && (
                        <div className="flex justify-end gap-2">
                          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">Verify Payment</button>
                          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors">Reject</button>
                        </div>
                      )}
                      {enrollment.status === "pending_enrollment" && (
                        <div className="flex justify-end gap-2">
                          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-green-50 text-green-700 border border-green-200 hover:bg-green-100 transition-colors">Confirm Enroll</button>
                          <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors">Reject</button>
                        </div>
                      )}
                      {enrollment.status === "pending_payment" && (
                        <span className="text-xs font-semibold text-secondary">Awaiting Payment</span>
                      )}
                      {isResolved && (
                        <span className="text-xs font-semibold text-secondary">
                          {enrollment.status === "active" ? "Enrolled" : "Rejected"}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
