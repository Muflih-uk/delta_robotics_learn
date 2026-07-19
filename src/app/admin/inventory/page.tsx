"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { InventoryItem, InventoryLog, InventoryCreateRequest } from "@/lib/types";

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [logs, setLogs] = useState<InventoryLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"items" | "logs">("items");
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [lowStockOnly, setLowStockOnly] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);
  const [isQtyDialogOpen, setIsQtyDialogOpen] = useState(false);
  const [qtyItem, setQtyItem] = useState<InventoryItem | null>(null);
  const [qtyChange, setQtyChange] = useState(0);
  const [qtyReason, setQtyReason] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [formName, setFormName] = useState("");
  const [formCategory, setFormCategory] = useState("Electronics");
  const [formDescription, setFormDescription] = useState("");
  const [formQuantity, setFormQuantity] = useState(0);
  const [formUnit, setFormUnit] = useState("pcs");
  const [formThreshold, setFormThreshold] = useState(5);
  const [formLocation, setFormLocation] = useState("");
  const [formImage, setFormImage] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [itemsData, logsData] = await Promise.all([
        api.inventory.list(),
        api.inventoryLogs.list(),
      ]);
      setItems(itemsData);
      setLogs(logsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load inventory");
    } finally {
      setLoading(false);
    }
  }

  const categories = [...new Set(items.map((i) => i.category_name))];

  function openCreateDrawer() {
    setEditingItem(null);
    setFormName("");
    setFormCategory("Electronics");
    setFormDescription("");
    setFormQuantity(0);
    setFormUnit("pcs");
    setFormThreshold(5);
    setFormLocation("");
    setFormImage("");
    setIsDrawerOpen(true);
  }

  function openEditDrawer(item: InventoryItem) {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category_name);
    setFormDescription(item.description);
    setFormQuantity(item.quantity);
    setFormUnit(item.unit);
    setFormThreshold(item.low_stock_threshold);
    setFormLocation(item.location);
    setFormImage(item.image_url || "");
    setIsDrawerOpen(true);
  }

  function openQtyDialog(item: InventoryItem) {
    setQtyItem(item);
    setQtyChange(0);
    setQtyReason("");
    setIsQtyDialogOpen(true);
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload: InventoryCreateRequest = {
        name: formName,
        category: formCategory,
        description: formDescription || undefined,
        quantity: formQuantity,
        unit: formUnit || undefined,
        low_stock_threshold: formThreshold,
        location: formLocation || undefined,
        image_url: formImage || undefined,
      };
      if (editingItem) {
        await api.inventory.update(editingItem.id, payload);
      } else {
        await api.inventory.create(payload);
      }
      setIsDrawerOpen(false);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save item");
    } finally {
      setSaving(false);
    }
  }

  async function handleQtyUpdate() {
    if (!qtyItem || qtyChange === 0 || !qtyReason.trim()) return;
    try {
      await api.inventory.patch(qtyItem.id, { quantity: qtyItem.quantity + qtyChange });
      setIsQtyDialogOpen(false);
      setQtyItem(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update quantity");
    }
  }

  async function handleDelete(id: string) {
    try {
      await api.inventory.delete(id);
      setDeleteConfirm(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete item");
    }
  }

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.category_name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "All" || item.category_name === categoryFilter;
    const matchesLowStock = !lowStockOnly || item.is_low_stock || item.quantity === 0;
    return matchesSearch && matchesCategory && matchesLowStock;
  });

  const stats = {
    total: items.length,
    lowStock: items.filter((i) => i.is_low_stock && i.quantity > 0).length,
    outOfStock: items.filter((i) => i.quantity === 0).length,
    categories: new Set(items.map((i) => i.category_name)).size,
  };

  const changeTypeConfig = {
    add: { label: "Added", className: "bg-green-100 text-success border border-green-200" },
    remove: { label: "Removed", className: "bg-red-100 text-danger border border-red-200" },
    adjustment: { label: "Adjusted", className: "bg-blue-100 text-blue-700 border border-blue-200" },
  };

  if (loading) {
    return (
      <div className="p-container-padding flex-1 overflow-y-auto">
        <div className="h-8 w-48 bg-surface-container-high rounded animate-pulse mb-6" />
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-surface-container-high rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (error && items.length === 0) {
    return (
      <div className="p-container-padding flex-1 overflow-y-auto flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button onClick={() => loadData()} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-container-padding flex-1 overflow-y-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface">Inventory Management</h2>
          <p className="text-secondary mt-1">Track and manage robotics components and tools.</p>
        </div>
        {activeTab === "items" && (
          <button
            className="flex items-center gap-2 bg-primary-container text-white px-6 py-2.5 rounded-lg font-bold shadow-sm hover:opacity-90 active:scale-95 transition-all"
            onClick={openCreateDrawer}
          >
            <span className="material-symbols-outlined">add</span>
            Add Item
          </button>
        )}
      </div>

      <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl border border-outline-variant w-fit mb-6">
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "items" ? "bg-white shadow-sm border border-outline-variant text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
          onClick={() => setActiveTab("items")}
        >
          <span className="material-symbols-outlined text-lg">inventory_2</span>
          Items
        </button>
        <button
          className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === "logs" ? "bg-white shadow-sm border border-outline-variant text-primary" : "text-on-surface-variant hover:text-on-surface"}`}
          onClick={() => setActiveTab("logs")}
        >
          <span className="material-symbols-outlined text-lg">history</span>
          Logs
        </button>
      </div>

      {activeTab === "items" ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-surface-container-lowest border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary bg-accent-tint p-2 rounded-lg">inventory_2</span>
                <div>
                  <p className="text-headline-sm font-bold text-on-surface">{stats.total}</p>
                  <p className="text-xs text-secondary">Total Items</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-warning bg-yellow-50 p-2 rounded-lg">warning</span>
                <div>
                  <p className="text-headline-sm font-bold text-on-surface">{stats.lowStock}</p>
                  <p className="text-xs text-secondary">Low Stock</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-danger bg-red-50 p-2 rounded-lg">block</span>
                <div>
                  <p className="text-headline-sm font-bold text-on-surface">{stats.outOfStock}</p>
                  <p className="text-xs text-secondary">Out of Stock</p>
                </div>
              </div>
            </div>
            <div className="bg-surface-container-lowest border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-tertiary bg-blue-50 p-2 rounded-lg">category</span>
                <div>
                  <p className="text-headline-sm font-bold text-on-surface">{stats.categories}</p>
                  <p className="text-xs text-secondary">Categories</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface border border-outline-variant rounded-xl p-4 mb-6 flex flex-wrap items-center gap-4 shadow-sm">
            <div className="flex-1 min-w-[200px] relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm">search</span>
              <input className="w-full pl-9 pr-4 py-2 border border-outline-variant rounded-lg text-sm bg-bg-alt focus:ring-1 focus:ring-primary outline-none" placeholder="Search inventory..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <select className="px-4 py-2 border border-outline-variant rounded-lg text-sm bg-bg-alt focus:ring-1 focus:ring-primary outline-none" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <button
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg text-sm font-bold transition-all ${lowStockOnly ? "bg-warning/10 border-warning text-warning" : "border-outline-variant text-on-surface-variant hover:text-on-surface"}`}
              onClick={() => setLowStockOnly(!lowStockOnly)}
            >
              <span className="material-symbols-outlined text-lg">warning</span>
              Low Stock Only
            </button>
          </div>

          <div className="bg-surface-container-lowest border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-secondary font-label-sm uppercase tracking-wider border-b border-border bg-surface-bright">
                    <th className="p-4 font-semibold">Name</th>
                    <th className="p-4 font-semibold">Category</th>
                    <th className="p-4 font-semibold">Quantity</th>
                    <th className="p-4 font-semibold">Unit</th>
                    <th className="p-4 font-semibold">Location</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 text-right font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-body-md text-on-surface divide-y divide-border">
                  {filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-secondary">
                        <span className="material-symbols-outlined text-3xl mb-2 block">inventory_2</span>
                        <p>No items found</p>
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-bg-alt transition-colors">
                        <td className="p-4 font-medium">{item.name}</td>
                        <td className="p-4 text-secondary">{item.category_name}</td>
                        <td className="p-4">
                          <span className={`font-bold ${item.quantity === 0 ? "text-danger" : item.is_low_stock ? "text-warning" : ""}`}>{item.quantity}</span>
                        </td>
                        <td className="p-4 text-secondary">{item.unit}</td>
                        <td className="p-4 text-secondary">{item.location}</td>
                        <td className="p-4">
                          {item.quantity === 0 ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-danger border border-red-200">Out of Stock</span>
                          ) : item.is_low_stock ? (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-warning border border-yellow-200">Low Stock</span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-success border border-green-200">In Stock</span>
                          )}
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors text-secondary hover:text-primary" title="Update Quantity" onClick={() => openQtyDialog(item)}>
                              <span className="material-symbols-outlined text-lg">edit_note</span>
                            </button>
                            <button className="p-2 hover:bg-surface-container-low rounded-lg transition-colors text-secondary hover:text-primary" title="Edit Item" onClick={() => openEditDrawer(item)}>
                              <span className="material-symbols-outlined text-lg">edit</span>
                            </button>
                            <button className="p-2 hover:bg-red-50 rounded-lg transition-colors text-secondary hover:text-danger" title="Delete Item" onClick={() => setDeleteConfirm(item.id)}>
                              <span className="material-symbols-outlined text-lg">delete</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-surface-container-lowest border border-border rounded-xl shadow-sm overflow-hidden">
          <div className="p-4 border-b border-border bg-surface-bright">
            <h3 className="font-headline-md text-headline-md text-on-surface">Inventory Change Logs</h3>
            <p className="text-xs text-secondary mt-0.5">Automatically recorded whenever item quantities change.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-secondary font-label-sm uppercase tracking-wider border-b border-border bg-surface-bright">
                  <th className="p-4 font-semibold">Item</th>
                  <th className="p-4 font-semibold">Change Type</th>
                  <th className="p-4 font-semibold">Qty Change</th>
                  <th className="p-4 font-semibold">Reason</th>
                  <th className="p-4 font-semibold">Performed By</th>
                  <th className="p-4 font-semibold">Date</th>
                </tr>
              </thead>
              <tbody className="text-body-md text-on-surface divide-y divide-border">
                {logs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-secondary">
                      <span className="material-symbols-outlined text-3xl mb-2 block">history</span>
                      <p>No logs recorded yet</p>
                    </td>
                  </tr>
                ) : (
                  logs.map((log) => {
                    const config = changeTypeConfig[log.change_type];
                    return (
                      <tr key={log.id} className="hover:bg-bg-alt transition-colors">
                        <td className="p-4 font-medium">{log.item_name}</td>
                        <td className="p-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>{config.label}</span>
                        </td>
                        <td className="p-4">
                          <span className={`font-bold ${log.quantity_change > 0 ? "text-success" : "text-danger"}`}>
                            {log.quantity_change > 0 ? `+${log.quantity_change}` : log.quantity_change}
                          </span>
                        </td>
                        <td className="p-4 text-secondary">{log.reason}</td>
                        <td className="p-4 text-secondary">{log.performed_by_name}</td>
                        <td className="p-4 text-secondary">{new Date(log.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit" })}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className={`fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[60] transition-opacity duration-300 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsDrawerOpen(false)}>
        <div className={`absolute right-0 top-0 bottom-0 w-full max-w-[500px] bg-surface shadow-2xl transition-transform duration-500 flex flex-col ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`} onClick={(e) => e.stopPropagation()}>
          <div className="p-6 border-b border-outline-variant flex items-center justify-between bg-surface-bright">
            <div>
              <h3 className="text-headline-md font-bold text-on-surface">{editingItem ? "Edit Item" : "Add Item"}</h3>
              <p className="text-xs text-on-surface-variant">{editingItem ? "Update inventory item details" : "Add a new item to inventory"}</p>
            </div>
            <button className="p-2 hover:bg-surface-container-low rounded-full transition-colors text-on-surface-variant" onClick={() => setIsDrawerOpen(false)}>
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Item Name</label>
              <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Arduino Uno R3" />
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Category</label>
              <select className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" value={formCategory} onChange={(e) => setFormCategory(e.target.value)}>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Description</label>
              <textarea className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" rows={3} value={formDescription} onChange={(e) => setFormDescription(e.target.value)} placeholder="Brief description" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1.5">Quantity</label>
                <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" type="number" value={formQuantity} onChange={(e) => setFormQuantity(Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1.5">Unit</label>
                <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" value={formUnit} onChange={(e) => setFormUnit(e.target.value)} placeholder="pcs, kg, meters" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1.5">Low Stock Threshold</label>
                <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" type="number" value={formThreshold} onChange={(e) => setFormThreshold(Number(e.target.value))} />
              </div>
              <div>
                <label className="block text-xs font-bold text-on-surface mb-1.5">Location</label>
                <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" value={formLocation} onChange={(e) => setFormLocation(e.target.value)} placeholder="e.g. Shelf A" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Image URL</label>
              <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" value={formImage} onChange={(e) => setFormImage(e.target.value)} placeholder="https://..." />
            </div>
          </div>
          <div className="p-6 border-t border-outline-variant bg-surface-bright flex gap-3">
            <button className="flex-1 py-3 border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-bg-alt transition-colors" onClick={() => setIsDrawerOpen(false)}>Cancel</button>
            <button className="flex-1 py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50" onClick={handleSave} disabled={saving || !formName}>
              {saving ? "Saving..." : editingItem ? "Save Changes" : "Add Item"}
            </button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[70] transition-opacity duration-300 ${isQtyDialogOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsQtyDialogOpen(false)}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-surface rounded-xl shadow-2xl border border-outline-variant p-6" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-headline-md font-bold text-on-surface mb-4">Update Quantity</h3>
          {qtyItem && (
            <div className="mb-4 p-3 bg-bg-alt rounded-lg border border-border">
              <p className="font-medium text-on-surface">{qtyItem.name}</p>
              <p className="text-xs text-secondary">Current quantity: <span className="font-bold">{qtyItem.quantity}</span> {qtyItem.unit}</p>
            </div>
          )}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">New Quantity</label>
              <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" type="number" value={qtyItem ? qtyItem.quantity + qtyChange : 0} disabled />
              <p className="text-xs text-secondary mt-1">Use the slider above to adjust. Negative = reduce, Positive = add.</p>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Quantity Change</label>
              <div className="flex gap-2">
                <button className="px-3 py-2 border border-outline-variant rounded-lg text-sm font-bold text-danger hover:bg-red-50 transition-colors" onClick={() => setQtyChange(Math.max(-999, qtyChange - 1))}>-1</button>
                <input className="flex-1 px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white text-center font-bold" type="number" value={qtyChange} onChange={(e) => setQtyChange(Number(e.target.value))} />
                <button className="px-3 py-2 border border-outline-variant rounded-lg text-sm font-bold text-success hover:bg-green-50 transition-colors" onClick={() => setQtyChange(Math.min(999, qtyChange + 1))}>+1</button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold text-on-surface mb-1.5">Reason</label>
              <input className="w-full px-4 py-2.5 border border-outline-variant rounded-lg text-sm focus:ring-1 focus:ring-primary outline-none bg-white" value={qtyReason} onChange={(e) => setQtyReason(e.target.value)} placeholder="e.g. New stock arrival" />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button className="flex-1 py-3 border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-bg-alt transition-colors" onClick={() => setIsQtyDialogOpen(false)}>Cancel</button>
            <button className="flex-1 py-3 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50" disabled={qtyChange === 0 || !qtyReason.trim()} onClick={handleQtyUpdate}>Update Stock</button>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 bg-on-background/40 backdrop-blur-sm z-[70] transition-opacity duration-300 ${deleteConfirm ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setDeleteConfirm(null)}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm bg-surface rounded-xl shadow-2xl border border-outline-variant p-6" onClick={(e) => e.stopPropagation()}>
          <h3 className="text-headline-md font-bold text-on-surface mb-2">Delete Item</h3>
          <p className="text-sm text-secondary mb-6">Are you sure you want to delete this item? This action cannot be undone.</p>
          <div className="flex gap-3">
            <button className="flex-1 py-3 border border-outline-variant rounded-lg text-sm font-bold text-on-surface hover:bg-bg-alt transition-colors" onClick={() => setDeleteConfirm(null)}>Cancel</button>
            <button className="flex-1 py-3 bg-danger text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90 active:scale-[0.98] transition-all" onClick={() => handleDelete(deleteConfirm!)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  );
}
