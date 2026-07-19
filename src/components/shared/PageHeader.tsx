import React from "react";

interface ActionButton {
  label: string;
  icon: string;
  onClick: () => void;
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actionButton?: ActionButton;
}

export function PageHeader({ title, description, actionButton }: PageHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h2 className="text-headline-lg text-on-background font-bold">{title}</h2>
        {description && (
          <p className="text-on-surface-variant text-body-md">{description}</p>
        )}
      </div>
      {actionButton && (
        <button
          className="flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
          onClick={actionButton.onClick}
        >
          <span className="material-symbols-outlined">{actionButton.icon}</span>
          {actionButton.label}
        </button>
      )}
    </div>
  );
}
