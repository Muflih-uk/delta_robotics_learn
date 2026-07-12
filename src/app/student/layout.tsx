import { StudentSidebar } from "@/components/layout/student-sidebar";
import { StudentNavbar } from "@/components/layout/student-navbar";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface-container-lowest text-on-surface font-body-md w-full">
      <StudentSidebar />
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <StudentNavbar />
        <div className="flex-1 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
