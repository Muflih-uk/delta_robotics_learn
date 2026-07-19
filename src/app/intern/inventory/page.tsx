"use client";

import { useState, useEffect } from 'react';
import { Download, Plus, RotateCcw, Edit2, Image as ImageIcon, Minus, Filter } from 'lucide-react';
import { api } from '@/lib/api';
import type { InventoryItem } from '@/lib/types';
import Drawer from '@/components/intern/Drawer';

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<'details' | 'add'>('details');

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    setLoading(true);
    api.inventory.list()
      .then(setInventory)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const handleOpenDrawer = () => {
      setDrawerMode('add');
      setIsDrawerOpen(true);
    };
    window.addEventListener('open-drawer', handleOpenDrawer);
    return () => window.removeEventListener('open-drawer', handleOpenDrawer);
  }, []);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === '' || item.category_name === categoryFilter;
    const matchesStatus = statusFilter === '' || 
      (statusFilter === 'In Stock' && !item.is_low_stock && item.quantity > 0) ||
      (statusFilter === 'Low Stock' && item.is_low_stock && item.quantity > 0) ||
      (statusFilter === 'Out of Stock' && item.quantity === 0) ||
      statusFilter === '';
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="flex flex-col h-full gap-6 p-6">
      <div className="flex justify-between items-end shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-on-surface">Inventory</h2>
          <p className="text-sm text-secondary mt-1">Manage robot parts, electronics, and mechanical components (1,482 items total)</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 px-4 border border-border rounded-lg bg-surface text-on-surface text-sm font-medium flex items-center gap-2 hover:bg-surface-container-low transition-colors shadow-sm">
            <Download size={18} />
            Export CSV
          </button>
          <button 
            className="h-10 px-4 bg-primary-container hover:opacity-90 text-on-primary-container rounded-lg text-sm font-medium flex items-center gap-2 transition-colors shadow-sm"
            onClick={() => { setDrawerMode('add'); setIsDrawerOpen(true); }}
          >
            <Plus size={18} />
            Add Item
          </button>
        </div>
      </div>

      <div className="bg-surface p-4 rounded-xl border border-border shadow-sm shrink-0">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="flex-1 min-w-[240px]">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5 block">Search</label>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary w-4 h-4" />
              <input 
                type="text" 
                placeholder="Filter inventory..." 
                className="w-full h-10 pl-9 pr-4 bg-surface border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="w-48">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5 block">Category</label>
            <select 
              className="w-full h-10 bg-surface border border-border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">All Categories</option>
              <option value="Microcontrollers">Microcontrollers</option>
              <option value="Sensors">Sensors</option>
              <option value="Motors">Motors</option>
              <option value="Boards">Boards</option>
            </select>
          </div>
          <div className="w-40">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5 block">Status</label>
            <select 
              className="w-full h-10 bg-surface border border-border rounded-lg px-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
            </select>
          </div>
          <div className="w-48">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5 block">Stock Level</label>
            <div className="h-10 bg-surface border border-border rounded-lg px-3 flex items-center gap-3">
              <span className="text-sm text-secondary">Min 0</span>
              <div className="flex-1 h-1.5 bg-border rounded-full relative">
                <div className="absolute left-0 top-0 h-full w-1/2 bg-primary-container rounded-full"></div>
                <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 bg-primary-container rounded-full shadow border-2 border-white"></div>
              </div>
            </div>
          </div>
          <button className="h-10 w-10 flex items-center justify-center text-primary-container hover:opacity-80 rounded-lg transition-colors">
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden animate-pulse">
          <div className="p-6 space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="w-12 h-12 bg-surface-container-low rounded" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-surface-container-low rounded w-1/3" />
                  <div className="h-3 bg-surface-container-low rounded w-1/4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
      <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden flex-1 flex flex-col">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface">
              <tr className="border-b border-border">
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Image</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Name</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Category</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Qty</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Min Stock</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider">Location</th>
                <th className="py-4 px-6 font-semibold text-xs text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInventory.map((item) => {
                const statusLabel = item.quantity === 0 ? 'Out of Stock' : item.is_low_stock ? 'Low Stock' : 'In Stock';
                const statusColor = item.quantity === 0 ? 'red' : item.is_low_stock ? 'amber' : 'green';
                return (
                <tr key={item.id} className="hover:bg-surface-container-low transition-colors group">
                  <td className="py-3 px-6">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} className="w-12 h-12 rounded object-cover border border-border bg-surface-container-low" />
                    ) : (
                      <div className="w-12 h-12 rounded bg-surface-container-low flex items-center justify-center">
                        <ImageIcon size={16} className="text-secondary" />
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-6">
                    <div className="font-medium text-on-surface text-sm">{item.name}</div>
                    <div className="text-xs text-secondary mt-0.5">{item.category_name}</div>
                  </td>
                  <td className="py-3 px-6">
                    <span className="inline-flex items-center px-2 py-1 rounded text-[10px] font-bold bg-surface-container-low border border-border text-on-surface uppercase tracking-wider">
                      {item.category_name}
                    </span>
                  </td>
                  <td className="py-3 px-6">
                    <span className={`font-bold ${statusColor === 'red' ? 'text-red-500' : statusColor === 'amber' ? 'text-amber-500' : 'text-on-surface'}`}>
                      {item.quantity}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-secondary font-medium">{item.low_stock_threshold}</td>
                  <td className="py-3 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-${statusColor}-100 text-${statusColor}-700`}>
                      <span className={`w-1.5 h-1.5 rounded-full bg-${statusColor}-500`} />
                      {statusLabel}
                    </span>
                  </td>
                  <td className="py-3 px-6 text-secondary">{item.location || '—'}</td>
                  <td className="py-3 px-6 text-right">
                    <button onClick={() => { setDrawerMode('details'); setIsDrawerOpen(true); }} className="p-2 text-secondary hover:text-on-surface rounded transition-colors">
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-auto px-6 py-4 border-t border-border flex items-center justify-between text-sm text-secondary bg-surface shrink-0">
          <span>Showing {filteredInventory.length} of {inventory.length} items</span>
        </div>
      </div>
      )}

      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={drawerMode === 'add' ? "Add Item" : "Item Details"}
        subtitle="INVENTORY MANAGEMENT"
        footer={
          <>
            <button className="px-4 h-10 rounded-lg text-on-surface font-medium hover:bg-surface-container-low transition-colors text-sm" onClick={() => setIsDrawerOpen(false)}>
              Cancel
            </button>
            <button className="px-4 h-10 bg-primary-container text-on-primary-container rounded-lg font-medium hover:opacity-90 transition-colors shadow-sm text-sm" onClick={() => setIsDrawerOpen(false)}>
              Save Item
            </button>
          </>
        }
      >
        <div className="space-y-6">
          <section className="space-y-2">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Item Image</label>
            <div className="h-40 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center text-center bg-surface-container-low hover:bg-surface transition-colors cursor-pointer">
              <ImageIcon className="text-secondary mb-2 w-8 h-8" />
              <p className="font-medium text-on-surface text-sm">Click to upload or drag & drop</p>
              <p className="text-xs text-secondary mt-1">PNG, JPG up to 5MB</p>
            </div>
          </section>

          <section className="space-y-2">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Item Name</label>
            <input type="text" placeholder="e.g. Raspberry Pi Zero 2 W" className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
          </section>

          <div className="grid grid-cols-2 gap-4">
            <section className="space-y-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Category</label>
              <select className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                <option>Microcontrollers</option>
                <option>Sensors</option>
                <option>Motors</option>
                <option>Boards</option>
              </select>
            </section>
            <section className="space-y-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Status</label>
              <select className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm">
                <option>In Stock</option>
                <option>Low Stock</option>
                <option>Out of Stock</option>
              </select>
            </section>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <section className="space-y-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Current Quantity</label>
              <div className="flex border border-border rounded-lg bg-surface overflow-hidden h-10">
                <button className="w-10 flex items-center justify-center text-secondary hover:bg-surface-container-low transition-colors border-r border-border">
                  <Minus size={16} />
                </button>
                <input type="text" defaultValue="42" className="flex-1 w-full text-center focus:outline-none text-sm font-medium" />
                <button className="w-10 flex items-center justify-center text-secondary hover:bg-surface-container-low transition-colors border-l border-border">
                  <Plus size={16} />
                </button>
              </div>
            </section>
            <section className="space-y-2">
              <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Minimum Stock Level</label>
              <input type="number" defaultValue="10" className="w-full h-10 border border-border rounded-lg px-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm" />
            </section>
          </div>

          <section className="space-y-2">
            <label className="text-xs font-semibold text-secondary uppercase tracking-wider">Internal Notes</label>
            <textarea 
              rows={4} 
              placeholder="Enter stock locations, supplier links, or usage instructions..." 
              className="w-full border border-border rounded-lg p-3 bg-surface focus:outline-none focus:ring-2 focus:ring-primary text-sm resize-none" 
            />
          </section>
        </div>
      </Drawer>
    </div>
  );
}
