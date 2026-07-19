import React from "react";

interface EmptyStateProps {
  icon?: string;
  title: string;
  description: string;
}

export function EmptyState({ icon = "search_off", title, description }: EmptyStateProps) {
  return (
    <div className="col-span-full py-16 text-center bg-surface border border-outline-variant rounded-xl flex flex-col items-center justify-center">
      <span className="material-symbols-outlined text-6xl text-secondary mb-4 opacity-50">{icon}</span>
      <h3 className="text-xl font-bold text-on-surface mb-2">{title}</h3>
      <p className="text-on-surface-variant max-w-md mx-auto">
        {description}
      </p>
    </div>
  );
}
