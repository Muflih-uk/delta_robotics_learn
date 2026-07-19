import React from "react";

interface FilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode; // For passing custom select dropdowns
}

export function FilterBar({ 
  search, 
  onSearchChange, 
  searchPlaceholder = "Search...", 
  children 
}: FilterBarProps) {
  return (
    <div className="bg-surface border border-outline-variant rounded-xl p-4 mb-8 flex flex-wrap items-center gap-4 shadow-sm">
      <div className="flex-1 min-w-[240px] relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
        <input
          className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded-lg text-sm bg-bg-alt focus:ring-1 focus:ring-primary outline-none"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      {children}
    </div>
  );
}
