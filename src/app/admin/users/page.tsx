"use client";

export default function UsersPage() {
  return (
    <div className="flex-1 overflow-y-auto p-container-padding bg-background">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mb-1">User Management</h2>
            <p className="font-body-md text-body-md text-secondary">Manage admins and interns.</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center p-12 bg-surface-container-lowest border border-border rounded-xl shadow-sm">
          <span className="material-symbols-outlined text-4xl text-secondary mb-4">group</span>
          <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">System Users</h3>
          <p className="text-secondary font-body-md text-center max-w-md">
            User management requires a backend endpoint. Manage users through the Django admin panel or Supabase dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
