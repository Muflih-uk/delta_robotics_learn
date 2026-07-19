"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Clock, DollarSign, UserCheck, Ban } from "lucide-react";
import type { Enrollment, EnrollmentStatus } from "@/lib/types";

const statusConfig: Record<EnrollmentStatus, { label: string; variant: "default" | "outline" | "destructive" | "secondary"; className: string; icon: typeof Clock }> = {
  pending_payment: { label: "Pending Payment", variant: "outline", className: "text-amber-600 border-amber-200 bg-amber-50", icon: Clock },
  payment_verification: { label: "Payment Verification", variant: "outline", className: "text-orange-600 border-orange-200 bg-orange-50", icon: DollarSign },
  pending_enrollment: { label: "Pending Enrollment", variant: "outline", className: "text-blue-600 border-blue-200 bg-blue-50", icon: UserCheck },
  active: { label: "Active", variant: "default", className: "bg-green-600 hover:bg-green-700", icon: CheckCircle2 },
  rejected: { label: "Rejected", variant: "destructive", className: "", icon: Ban },
};

export default function EnrollmentsPage() {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.enrollments.myEnrollments();
        setEnrollments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load enrollments");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statusSummary = [
    { status: "payment_verification" as EnrollmentStatus, count: enrollments.filter(e => e.status === "payment_verification").length, icon: DollarSign, label: "Payment Verification" },
    { status: "pending_enrollment" as EnrollmentStatus, count: enrollments.filter(e => e.status === "pending_enrollment").length, icon: UserCheck, label: "Pending Enrollment" },
    { status: "active" as EnrollmentStatus, count: enrollments.filter(e => e.status === "active").length, icon: CheckCircle2, label: "Active" },
    { status: "rejected" as EnrollmentStatus, count: enrollments.filter(e => e.status === "rejected").length, icon: Ban, label: "Rejected" },
  ];

  if (loading) {
    return (
      <div className="flex flex-col gap-6 p-6">
        <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse" />
        <div className="grid gap-4 md:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-surface-container-high rounded-lg animate-pulse" />
          ))}
        </div>
        <div className="h-64 bg-surface-container-high rounded-lg animate-pulse" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col gap-6 p-6 items-center justify-center">
        <p className="text-danger">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Enrollment Pipeline</h1>
          <p className="text-muted-foreground mt-1">Review and approve student course enrollments.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-4">
        {statusSummary.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.status} className="border rounded-lg p-4 bg-background shadow-sm flex flex-col items-center justify-center text-center">
              <Icon className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="font-semibold text-lg">{item.count}</h3>
              <p className="text-sm text-muted-foreground">{item.label}</p>
            </div>
          );
        })}
      </div>

      <div className="border rounded-lg bg-background shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                  No enrollments found
                </TableCell>
              </TableRow>
            ) : (
              enrollments.map((enrollment) => {
                const config = statusConfig[enrollment.status];
                const StatusIcon = config.icon;
                const isResolved = enrollment.status === "active" || enrollment.status === "rejected";
                return (
                  <TableRow key={enrollment.id}>
                    <TableCell className="font-medium">{enrollment.student}</TableCell>
                    <TableCell>{enrollment.course_title}</TableCell>
                    <TableCell>{new Date(enrollment.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={config.variant} className={config.className}>
                        <StatusIcon className="h-3.5 w-3.5 mr-1 inline" />
                        {config.label}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {enrollment.status === "payment_verification" && (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">Verify Payment</Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                        </div>
                      )}
                      {enrollment.status === "pending_enrollment" && (
                        <div className="flex justify-end gap-2">
                          <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50">Confirm Enroll</Button>
                          <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                        </div>
                      )}
                      {enrollment.status === "pending_payment" && (
                        <Button size="sm" variant="outline" className="text-muted-foreground" disabled>Awaiting Payment</Button>
                      )}
                      {isResolved && (
                        <Button size="sm" variant="ghost" disabled>
                          {enrollment.status === "active" ? "Enrolled" : "Rejected"}
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
