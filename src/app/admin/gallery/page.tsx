"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import type { GalleryImage, GalleryCreateRequest, Workshop } from "@/lib/types";

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [workshopFilter, setWorkshopFilter] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const [formTitle, setFormTitle] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formWorkshop, setFormWorkshop] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const [imagesData, workshopsData] = await Promise.all([
        api.gallery.list(),
        api.workshops.list(),
      ]);
      setImages(imagesData);
      setWorkshops(workshopsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load gallery");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormTitle("");
    setFormUrl("");
    setFormWorkshop("");
  }

  function openUploadDrawer() {
    setSelectedImage(null);
    resetForm();
    setIsDrawerOpen(true);
  }

  function openEditDrawer(image: GalleryImage) {
    setSelectedImage(image);
    setFormTitle(image.title);
    setFormUrl(image.image_url);
    setFormWorkshop(image.workshop || "");
    setIsEditDrawerOpen(true);
  }

  async function handleCreate() {
    setSaving(true);
    try {
      const payload: GalleryCreateRequest = {
        title: formTitle,
        image_url: formUrl,
        workshop: formWorkshop || null,
      };
      await api.gallery.create(payload);
      setIsDrawerOpen(false);
      resetForm();
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload image");
    } finally {
      setSaving(false);
    }
  }

  async function handleUpdate() {
    if (!selectedImage) return;
    setSaving(true);
    try {
      const payload: GalleryCreateRequest = {
        title: formTitle,
        image_url: formUrl,
        workshop: formWorkshop || null,
      };
      await api.gallery.update(selectedImage.id, payload);
      setIsEditDrawerOpen(false);
      setSelectedImage(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update image");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteConfirm() {
    if (!imageToDelete) return;
    try {
      await api.gallery.delete(imageToDelete);
      setIsDeleteConfirmOpen(false);
      setImageToDelete(null);
      await loadData();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete image");
    }
  }

  const filteredImages = images.filter((image) => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWorkshop = !workshopFilter || (image.workshop && image.workshop === workshopFilter);
    return matchesSearch && matchesWorkshop;
  });

  if (loading) {
    return (
      <div className="flex-1 min-h-screen bg-white">
        <div className="p-container-padding max-w-7xl mx-auto">
          <div className="h-8 w-32 bg-surface-container-high rounded animate-pulse mb-8" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-48 bg-surface-container-high rounded-xl animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error && images.length === 0) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-danger">{error}</p>
          <button onClick={() => loadData()} className="mt-4 px-4 py-2 bg-primary text-white rounded-lg">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex-1 min-h-screen bg-white">
        <div className="p-container-padding max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Gallery</h1>
              <p className="text-secondary font-body-md">{images.length} images</p>
            </div>
            <button
              className="px-5 py-2.5 bg-primary-container text-white font-body-md-bold rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
              onClick={openUploadDrawer}
            >
              <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
              Upload Images
            </button>
          </div>

          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex w-full md:w-auto items-center gap-4">
                <input
                  type="text"
                  placeholder="Search images..."
                  className="h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none transition-all w-64"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select
                  className="h-11 px-4 pr-8 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container outline-none appearance-none"
                  value={workshopFilter ?? ""}
                  onChange={(e) => setWorkshopFilter(e.target.value || null)}
                >
                  <option value="">All Workshops</option>
                  {workshops.map((w) => (
                    <option key={w.id} value={w.id}>{w.title}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.length === 0 ? (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <span className="material-symbols-outlined text-4xl text-secondary mb-4">image</span>
                <p className="text-center text-secondary">No images found</p>
              </div>
            ) : (
              filteredImages.map((image) => (
                <div
                  key={image.id}
                  className="rounded-xl border border-border overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-surface-container-lowest"
                  onClick={() => { setSelectedImage(image); setIsLightboxOpen(true); }}
                >
                  <img className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" alt={image.title} src={image.image_url} />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <div className="flex justify-between items-end">
                      <div>
                        <span className={`px-2 py-1 text-xs font-label-sm rounded mb-2 inline-block ${image.workshop ? "bg-primary/20 text-primary" : "bg-surface-container text-primary-container"}`}>
                          {image.workshop ? "Workshop" : "General"}
                        </span>
                        <h3 className="text-white font-headline-sm line-clamp-2">{image.title}</h3>
                      </div>
                      <div className="flex gap-1">
                        <button className="p-1 text-white hover:text-primary/80" onClick={(e) => { e.stopPropagation(); openEditDrawer(image); }}>
                          <span className="material-symbols-outlined">edit</span>
                        </button>
                        <button className="p-1 text-white hover:text-primary/80" onClick={(e) => { e.stopPropagation(); setImageToDelete(image.id); setIsDeleteConfirmOpen(true); }}>
                          <span className="material-symbols-outlined">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 bg-black/20 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsDrawerOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[70] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 flex flex-col border-l border-border ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-border flex justify-between items-center bg-surface-container-lowest">
          <h2 className="font-headline-md text-headline-md text-on-surface">Upload Images</h2>
          <button className="text-secondary hover:text-on-surface p-2 rounded-full hover:bg-surface-container-low transition-colors" onClick={() => setIsDrawerOpen(false)}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Title</label>
            <input className="w-full h-[40px] px-3 rounded-lg border border-border text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} placeholder="Enter image title..." />
          </div>
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Image URL</label>
            <input className="w-full h-[40px] px-3 rounded-lg border border-border text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container" value={formUrl} onChange={(e) => setFormUrl(e.target.value)} placeholder="Enter image URL..." />
          </div>
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Workshop (Optional)</label>
            <select className="w-full h-[40px] px-3 rounded-lg border border-border text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container appearance-none" value={formWorkshop} onChange={(e) => setFormWorkshop(e.target.value)}>
              <option value="">No Workshop (General)</option>
              {workshops.map((w) => (
                <option key={w.id} value={w.id}>{w.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-6 border-t border-border bg-surface-container-lowest flex justify-end gap-3">
          <button className="px-5 py-2.5 bg-white border border-border text-on-surface font-body-md-bold rounded-lg hover:bg-surface-container-low transition-colors" onClick={() => setIsDrawerOpen(false)}>Cancel</button>
          <button className="px-5 py-2.5 bg-primary-container text-white font-body-md-bold rounded-lg hover:bg-primary transition-colors disabled:opacity-50" onClick={handleCreate} disabled={saving || !formTitle || !formUrl}>
            {saving ? "Uploading..." : "Upload Files"}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-[60] transition-opacity duration-300 bg-black/20 ${isEditDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} onClick={() => setIsEditDrawerOpen(false)} />
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[70] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 flex flex-col border-l border-border ${isEditDrawerOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="p-6 border-b border-border flex justify-between items-center bg-surface-container-lowest">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">Edit Image</h2>
            <p className="text-secondary text-sm">Modify image details</p>
          </div>
          <button className="text-secondary hover:text-on-surface p-2 rounded-full hover:bg-surface-container-low transition-colors" onClick={() => { setIsEditDrawerOpen(false); setSelectedImage(null); }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Title</label>
            <input className="w-full h-[40px] px-3 rounded-lg border border-border text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container" value={formTitle} onChange={(e) => setFormTitle(e.target.value)} />
          </div>
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Image URL</label>
            <input className="w-full h-[40px] px-3 rounded-lg border border-border text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container" value={formUrl} onChange={(e) => setFormUrl(e.target.value)} />
          </div>
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Workshop (Optional)</label>
            <select className="w-full h-[40px] px-3 rounded-lg border border-border text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container appearance-none" value={formWorkshop} onChange={(e) => setFormWorkshop(e.target.value)}>
              <option value="">No Workshop (General)</option>
              {workshops.map((w) => (
                <option key={w.id} value={w.id}>{w.title}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="p-6 border-t border-border bg-surface-container-lowest flex justify-end gap-3">
          <button className="px-5 py-2.5 bg-white border border-border text-on-surface font-body-md-bold rounded-lg hover:bg-surface-container-low transition-colors" onClick={() => { setIsEditDrawerOpen(false); setSelectedImage(null); }}>Cancel</button>
          <button className="px-5 py-2.5 bg-primary-container text-white font-body-md-bold rounded-lg hover:bg-primary transition-colors disabled:opacity-50" onClick={handleUpdate} disabled={saving || !formTitle || !formUrl}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      <div className={`fixed inset-0 z-[100] items-center justify-center p-4 sm:p-8 ${isLightboxOpen ? "flex" : "hidden"}`}>
        <div className="absolute inset-0 bg-on-surface/90 backdrop-blur-md" onClick={() => setIsLightboxOpen(false)} />
        <div className="relative z-10 w-full max-w-5xl bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
          <div className="flex-1 bg-black relative flex items-center justify-center min-h-[300px]">
            {selectedImage && <img alt="Lightbox View" className="max-w-full max-h-full object-contain" src={selectedImage.image_url} />}
          </div>
          <div className="w-full md:w-[320px] bg-surface-container-lowest flex flex-col border-l border-border shrink-0">
            <div className="p-4 border-b border-border justify-between items-center hidden md:flex">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Image Details</h3>
              <button className="text-secondary hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container-low transition-colors" onClick={() => setIsLightboxOpen(false)}>
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              {selectedImage ? (
                <>
                  <span className={`px-2.5 py-1 text-xs font-label-sm rounded inline-block mb-3 ${selectedImage.workshop ? "bg-primary/20 text-primary" : "bg-surface-container text-primary-container"}`}>
                    {selectedImage.workshop ? "Workshop" : "General"}
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{selectedImage.title}</h2>
                  <p className="text-secondary text-sm mb-6">
                    {new Date(selectedImage.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-body-md-bold text-on-surface mb-1 text-sm">Uploaded By</h4>
                      <span className="text-sm text-secondary">{selectedImage.uploaded_by}</span>
                    </div>
                  </div>
                </>
              ) : null}
            </div>
            <div className="p-6 border-t border-border bg-bg-alt mt-auto">
              <button className="w-full py-2.5 bg-white border border-danger text-danger font-body-md-bold rounded-lg hover:bg-error-container transition-colors flex items-center justify-center gap-2" onClick={() => { if (selectedImage) { setImageToDelete(selectedImage.id); setIsDeleteConfirmOpen(true); } setIsLightboxOpen(false); }}>
                <span className="material-symbols-outlined text-[20px]">delete</span> Delete Image
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={`fixed inset-0 z-[80] flex items-center justify-center bg-black/20 ${isDeleteConfirmOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`} />
      <div className={`fixed z-[90] bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl ${isDeleteConfirmOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} transition-all duration-300`}>
        <h3 className="font-headline-md text-headline-md mb-4">Delete Image</h3>
        <p className="text-body-md mb-6">Are you sure you want to delete this image? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button className="flex-1 px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors" onClick={() => { setIsDeleteConfirmOpen(false); setImageToDelete(null); }}>Cancel</button>
          <button className="flex-1 px-6 py-2.5 bg-error text-white rounded-lg font-body-md-bold hover:bg-error/80 transition-colors shadow-sm" onClick={handleDeleteConfirm}>Delete Image</button>
        </div>
      </div>
    </>
  );
}
