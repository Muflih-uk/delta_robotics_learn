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

const enrollments: Enrollment[] = [
  { id: "ENR-001", student: "Rahul Kumar", course: "ros2-intro", course_title: "Intro to ROS 2", status: "payment_verification", approved_by: null, approved_at: null, created_at: "2026-07-10T10:00:00Z", updated_at: "2026-07-10T10:00:00Z" },
  { id: "ENR-002", student: "Sneha Patel", course: "ros2-intro", course_title: "Intro to ROS 2", status: "active", approved_by: "admin-1", approved_at: "2026-07-09T14:30:00Z", created_at: "2026-07-08T09:00:00Z", updated_at: "2026-07-09T14:30:00Z" },
  { id: "ENR-003", student: "Vikram Singh", course: "ros2-intro", course_title: "Intro to ROS 2", status: "pending_payment", approved_by: null, approved_at: null, created_at: "2026-07-08T11:20:00Z", updated_at: "2026-07-08T11:20:00Z" },
  { id: "ENR-004", student: "Neha Gupta", course: "ros2-intro", course_title: "Intro to ROS 2", status: "rejected", approved_by: "admin-1", approved_at: "2026-07-08T16:00:00Z", created_at: "2026-07-07T08:30:00Z", updated_at: "2026-07-08T16:00:00Z" },
  { id: "ENR-005", student: "Amit Desai", course: "ros2-intro", course_title: "Intro to ROS 2", status: "active", approved_by: "admin-1", approved_at: "2026-07-07T12:00:00Z", created_at: "2026-07-06T09:15:00Z", updated_at: "2026-07-07T12:00:00Z" },
  { id: "ENR-006", student: "Priya Sharma", course: "ros2-intro", course_title: "Intro to ROS 2", status: "pending_enrollment", approved_by: "admin-1", approved_at: "2026-07-11T10:00:00Z", created_at: "2026-07-05T14:00:00Z", updated_at: "2026-07-11T10:00:00Z" },
];

const statusSummary: { status: EnrollmentStatus; count: number; icon: typeof Clock; label: string }[] = [
  { status: "payment_verification", count: 1, icon: DollarSign, label: "Payment Verification" },
  { status: "pending_enrollment", count: 1, icon: UserCheck, label: "Pending Enrollment" },
  { status: "active", count: 2, icon: CheckCircle2, label: "Active this month" },
  { status: "rejected", count: 1, icon: Ban, label: "Rejected" },
];

export default function EnrollmentsPage() {
  return (
    <div className="flex flex-col gap-6">
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
              <TableHead>Enrollment ID</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {enrollments.map((enrollment) => {
              const config = statusConfig[enrollment.status];
              const StatusIcon = config.icon;
              const isResolved = enrollment.status === "active" || enrollment.status === "rejected";
              return (
                <TableRow key={enrollment.id}>
                  <TableCell className="font-medium">{enrollment.id}</TableCell>
                  <TableCell>{enrollment.student}</TableCell>
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
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
