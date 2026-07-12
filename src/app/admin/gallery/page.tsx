"use client";

import { useState } from "react";

// Import types from lib/types
import type { GalleryImage, GalleryCreateRequest, Workshop } from "@/lib/types";

// Mock workshop data for dropdown (same as in workshops page)
const mockWorkshops: Workshop[] = [
  {
    id: "1",
    title: "VEX Robotics Masterclass",
    description: "Learn advanced VEX robotics concepts and competition strategies",
    status: "upcoming",
    event_date: "2023-10-28",
    location: "Innovation Lab, Campus A",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYMBxKZMbHoYZQDJBeT1ECSjMtjTL8AYI18dKSG3_I__-mW6mwefTt0ltlr-UiDFJP6GeRTTZHGoNVTwyHuGujExu_X9qSWxAaNBSyrfeVA-l6etl87Kwq-GIeAeIt-TXuYtFyuuXToVccm7ltvTvDSyEQDJYnw6hZUMzVosMhYYbHXaOGZ0ED0I3taoiER_fPEdAqRWUauJlflfwmcN1MIQxikjOldO-RZ8ah9MfDkgANZ5jnSIy3",
    is_published: true,
    gallery_images: [
      "https://example.com/gallery1.jpg",
      "https://example.com/gallery2.jpg",
      "https://example.com/gallery3.jpg"
    ],
    total_registrations: 24,
    created_at: "2023-08-15T10:00:00Z",
    updated_at: "2023-08-20T14:30:00Z"
  },
  {
    id: "2",
    title: "Advanced Kinematics",
    description: "Deep dive into robotic kinematics and motion planning",
    status: "ongoing",
    event_date: "2023-11-04",
    location: "Delta Hall, Engineering Wing",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZn9Nz_v7SJttCa3jZgR91JKBQAR3KrNi-Azrvj75oQPoq3bXgD6aePZolQFBGDJoGglCt17NI55vjcAN5k8u0Mq-FZHbgNb00cooxixJeutNjrAp0bgdoiEUaPXpTStuI0Fpp_HeO0akmLlGbWxL1dOYX1wINBlu218XIfwhCflCcviM_ABiJiZflxSC3vl1Xc_bk00P31PGCL2oDxOrrx7QNh0nmTo8jgmR6pWBjEYqMUPtNAAwF",
    is_published: true,
    gallery_images: [
      "https://example.com/gallery4.jpg",
      "https://example.com/gallery5.jpg"
    ],
    total_registrations: 12,
    created_at: "2023-08-20T09:00:00Z",
    updated_at: "2023-10-15T16:45:00Z"
  }
];

// Mock gallery data shaped to API types
const mockGalleryImages: GalleryImage[] = [
  {
    id: "1",
    title: "Robotics Workshop Q3",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAbeyTEZiW0BjJQxiGYM6V4q4IC8ymD-uUAGMv1Ium53wSQi_v8gsNq7n2YV_sMwGwzXKrN-Yi2felYMe4RJSLILcpJxWqLwvRwvfee3ElwbAM25cUo1tQMcwdS4Q4X5rr0q1wv0LG3Tw3lvkZFdRFnM_fOlfPB0QEQaHlMYOBz-aPxCB8e-qGngf3Fvefeq6p91Zxm_0DhYF5JpHhYMRwBYG28qsSawZ_rtpPBZCW9_PijAXRhI_VG",
    workshop: "1",
    uploaded_by: "admin@example.com",
    created_at: "2023-10-12T14:30:00Z"
  },
  {
    id: "2",
    title: "Course Introduction Slide",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZLutIKguSgjuQDSRpnA9n8OMGhgq0J1Fok8v5xVVz_TzXnRNBbK0_Oa8BVIpuiIQgjixKbDG76QVQWZEAWzh5Cpxze5tr0jCxbQ3cmw_SMjaL3CPtQRqxogGm461PO-oZD1cdiF7UZhF1Il8MHYYs0zmzLQWlZEhcNBkmIem3uBWu8hnyUMlj_EOmCRS1AeBtLw-ti0OPT1eVp8m3kOvCAczTfBSuUk_iZK2ujgD43UpKa7-n0vb4",
    workshop: "2",
    uploaded_by: "instructor@example.com",
    created_at: "2023-09-05T09:15:00Z"
  },
  {
    id: "3",
    title: "Annual Competition Banner",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDkvNSzR-hrrKabf9sdQMT8sGvwpI4bfLGyo2eUwAid1BijCu8yASFq2iPvBS124QeW1ZX3tgwpulRtL_Q13hZ9D3N8Oqv4AYcQysUYLNjSjBPIcvQO9fK6RAccmzrtx2Z-Yy9bmBxhElb4FlYXWBIBY_tR4wT0NwD4ERr-9pzV5jL3rfEGxORW51jksnMH_TpvRXaoQfkemWVaE0pCm3qI-KUc1D3bhtUQXakEu2sQgtUfQNozwmGY",
    workshop: null,
    uploaded_by: "admin@example.com",
    created_at: "2023-08-20T16:45:00Z"
  },
  {
    id: "4",
    title: "Lab Equipment Closeup",
    image_url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAaz8KMHziWT4ZGcoyfpzXHNoBFvDUxaJ6Hs_OMKqpXGwNDLNinS20aOgdRSWU3n4t4fRZ9W1Kr0dsVSrilZCex9dmKLJyFHGbZZLFjwDWxZYfB_ZAnw5aVOlCbW8sdhs5j4cyrYKm3Zl8iZkMqzk7A-RekTHyfAbg6WDA4RyLHtsk_qb7kBMYOkEjucqXbfgxjOy7MsOUwkjy3FQttHlDla9bgUCyCshsBpFhzOMYxnJTrN3dS-gJn",
    workshop: null,
    uploaded_by: "labtech@example.com",
    created_at: "2023-07-11T11:30:00Z"
  }
];

export default function GalleryPage() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>(mockGalleryImages);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [imageToDelete, setImageToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [workshopFilter, setWorkshopFilter] = useState<string | null>(null);

  // Filter gallery images based on search and workshop filter
  const filteredImages = galleryImages.filter(image => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesWorkshop = !workshopFilter || (image.workshop && image.workshop === workshopFilter);
    return matchesSearch && matchesWorkshop;
  });

  // Handle opening lightbox
  const openLightbox = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  // Handle opening edit drawer
  const openEditDrawer = (image: GalleryImage) => {
    setSelectedImage(image);
    setIsEditDrawerOpen(true);
  };

  // Handle delete confirmation
  const openDeleteConfirm = (id: string) => {
    setImageToDelete(id);
    setIsDeleteConfirmOpen(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (imageToDelete) {
      setGalleryImages(prev => prev.filter(img => img.id !== imageToDelete));
      setIsDeleteConfirmOpen(false);
      setImageToDelete(null);
    }
  };

  return (
    <>
      <div className="flex-1 min-h-screen bg-white">
        <div className="p-container-padding max-w-7xl mx-auto">
          {/* Page Header & Stats */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <h1 className="font-headline-lg text-headline-lg text-on-surface mb-2">Gallery</h1>
              <p className="text-secondary font-body-md">
                {galleryImages.length} images • Managing visual assets for workshops and events
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button
                className="px-5 py-2.5 bg-primary-container text-white font-body-md-bold rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2 shadow-sm shrink-0"
                onClick={() => {
                  setSelectedImage(null);
                  setIsDrawerOpen(true);
                }}
              >
                <span className="material-symbols-outlined text-[20px]">cloud_upload</span>
                Upload Images
              </button>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="flex w-full md:w-auto items-center gap-4">
                {/* Search */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-secondary px-2">Search:</span>
                  <input
                    type="text"
                    placeholder="Search images..."
                    className="h-11 px-4 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all w-64"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                {/* Workshop Filter */}
                <div className="relative">
                  <label className="block text-sm font-semibold text-on-surface mb-1">Workshop:</label>
                  <select
                    className="w-full h-11 px-4 pr-10 border border-border rounded-lg text-body-md focus:ring-2 focus:ring-primary-container focus:border-primary-container outline-none transition-all appearance-none"
                    value={workshopFilter ?? ""}
                    onChange={(e) => setWorkshopFilter(e.target.value || null)}
                  >
                    <option value="">All Workshops</option>
                    {mockWorkshops.map(workshop => (
                      <option key={workshop.id} value={workshop.id}>
                        {workshop.title}
                      </option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-secondary pointer-events-none">expand_more</span>
                </div>
              </div>

              {/* Sort/View Options */}
              <div className="flex items-center gap-3">
                <button className="p-2 text-secondary hover:bg-bg-alt rounded-lg transition-colors">
                  <span className="material-symbols-outlined">view_list</span>
                </button>
                <button className="p-2 text-secondary hover:bg-bg-alt rounded-lg transition-colors">
                  <span className="material-symbols-outlined">grid_view</span>
                </button>
                <button className="p-2 text-secondary hover:bg-bg-alt rounded-lg transition-colors">
                  <span className="material-symbols-outlined">filter_list</span>
                </button>
              </div>
            </div>
          </div>

          {/* Bento Grid Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter auto-rows-[200px]">
            {filteredImages.map(image => (
              <div
                key={image.id}
                className="rounded-xl border border-border overflow-hidden relative group cursor-pointer shadow-sm hover:shadow-md transition-shadow bg-surface-container-lowest"
                onClick={() => openLightbox(image)}
              >
                <img
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  alt={image.title}
                  src={image.image_url}
                />
                <div className="absolute inset-absolute inset-0 bg-gradient/60 via-transparent to-transparent opacity-0 group-hover:0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      {image.workshop ? (
                        <span className="px-2 py-1 bg-primary/20 text-primary text-xs font-label-sm rounded mb-2 inline-block">
                          Workshop
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-surface-container text-primary-container text-xs font-label-sm rounded mb-2 inline-block">
                          General
                        </span>
                      )}
                      <h3 className="text-white font-headline-sm line-clamp-2">{image.title}</h3>
                      <p className="text-white/80 text-xs mt-1">
                        {new Date(image.created_at).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric"
                        })}
                      </p>
                    </div>
                    <button
                      className="p-1 hover:text-primary/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditDrawer(image);
                      }}
                    >
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button
                      className="p-1 hover:text-primary/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        openDeleteConfirm(image.id);
                      }}
                    >
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Empty State */}
            {filteredImages.length === 0 && (
              <div className="col-span-full flex flex-col items-center justify-center py-12">
                <span className="material-symbols-outlined text-xl text-secondary mb-4">image</span>
                <p className="text-center text-secondary">No images match your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upload Drawer */}
      <div
        className={`fixed inset-0 z-[60] drawer-overlay transition-opacity duration-300 bg-black/20 ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsDrawerOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[70] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out flex flex-col border-l border-border ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-surface-container-lowest">
          <h2 className="font-headline-md text-headline-md text-on-surface">Upload Images</h2>
          <button
            className="text-secondary hover:text-on-surface p-2 rounded-full hover:bg-surface-container-low transition-colors"
            onClick={() => setIsDrawerOpen(false)}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Dropzone */}
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Media Files</label>
            <div className="border-2 border-dashed border-border rounded-xl p-8 flex flex-col items-center justify-center text-center bg-bg-alt hover:bg-surface-container-low transition-colors cursor-pointer group">
              <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-primary-container text-[24px]">cloud_upload</span>
              </div>
              <p className="font-body-md-bold text-on-surface">Click to upload or drag and drop</p>
              <p className="text-secondary font-body-md mt-1 text-sm">SVG, PNG, JPG or GIF (max. 800x400px)</p>
            </div>
          </div>
          {/* Title */}
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Title</label>
            <input
              className="w-full h-[40px] px-3 rounded-lg border border-border bg-white text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
              placeholder="Enter image title..."
            />
          </div>
          {/* Image URL */}
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Image URL</label>
            <input
              className="w-full h-[40px] px-3 rounded-lg border border-border bg-white text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
              placeholder="Enter image URL..."
            />
          </div>
          {/* Workshop (Optional) */}
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Workshop (Optional)</label>
            <div className="relative">
              <select
                className="w-full h-[40px] px-3 pr-10 rounded-lg border border-border bg-white text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container appearance-none"
              >
                <option value="">No Workshop (General)</option>
                {mockWorkshops.map(workshop => (
                  <option key={workshop.id} value={workshop.id}>
                    {workshop.title}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-secondary pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-border bg-surface-container-lowest flex justify-end gap-3">
          <button
            className="px-5 py-2.5 bg-white border border-border text-on-surface font-body-md-bold rounded-lg hover:bg-surface-container-low transition-colors"
            onClick={() => setIsDrawerOpen(false)}
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 bg-primary-container text-white font-body-md-bold rounded-lg hover:bg-primary transition-colors">
            Upload Files
          </button>
        </div>
      </div>

      {/* Edit Drawer */}
      <div
        className={`fixed inset-0 z-[60] drawer-overlay transition-opacity duration-300 bg-black/20 ${isEditDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsEditDrawerOpen(false)}
      ></div>
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-[480px] bg-white z-[70] shadow-[-4px_0_24px_rgba(0,0,0,0.1)] transition-transform duration-300 ease-in-out flex flex-col border-l border-border ${isEditDrawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-border flex justify-between items-center bg-surface-container-lowest">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              {selectedImage ? "Edit Image" : "Add Image"}
            </h2>
            <p className="text-secondary text-sm">
              {selectedImage ? "Modify image details" : "Add a new image to the gallery"}
            </p>
          </div>
          <button
            className="text-secondary hover:text-on-surface p-2 rounded-full hover:bg-surface-container-low transition-colors"
            onClick={() => {
              setIsEditDrawerOpen(false);
              setSelectedImage(null);
            }}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {/* Title */}
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Title</label>
            <input
              className="w-full h-[40px] px-3 rounded-lg border border-border bg-white text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
              defaultValue={selectedImage?.title || ""}
              placeholder="Enter image title..."
            />
          </div>
          {/* Image URL */}
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Image URL</label>
            <input
              className="w-full h-[40px] px-3 rounded-lg border border-border bg-white text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container"
              defaultValue={selectedImage?.image_url || ""}
              placeholder="Enter image URL..."
            />
          </div>
          {/* Workshop (Optional) */}
          <div>
            <label className="block font-body-md-bold text-on-surface mb-2">Workshop (Optional)</label>
            <div className="relative">
              <select
                className="w-full h-[40px] px-3 pr-10 rounded-lg border border-border bg-white text-body-md focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container appearance-none"
                defaultValue={selectedImage?.workshop || ""}
              >
                <option value="">No Workshop (General)</option>
                {mockWorkshops.map(workshop => (
                  <option key={workshop.id} value={workshop.id}>
                    {workshop.title}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-3 top-2.5 text-secondary pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-border bg-surface-container-lowest flex justify-end gap-3">
          <button
            className="px-5 py-2.5 bg-white border border-border text-on-surface font-body-md-bold rounded-lg hover:bg-surface-container-low transition-colors"
            onClick={() => {
              setIsEditDrawerOpen(false);
              setSelectedImage(null);
            }}
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 bg-primary-container text-white font-body-md-bold rounded-lg hover:bg-primary transition-colors">
            Save Changes
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      <div
        className={`fixed inset-0 z-[100] items-center justify-center p-4 sm:p-8 ${isLightboxOpen ? "flex" : "hidden"}`}
      >
        <div
          className="absolute inset-0 bg-on-surface/90 backdrop-blur-md"
          onClick={() => setIsLightboxOpen(false)}
        ></div>
        <div className="relative z-10 w-full max-w-5xl bg-surface-container-lowest rounded-xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[921px] transition-all duration-200">
          {/* Image Area */}
          <div className="flex-1 bg-black relative flex items-center justify-center min-h-[300px]">
            <button
              className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/80 text-white rounded-full backdrop-blur-sm transition-colors z-20 md:hidden"
              onClick={() => setIsLightboxOpen(false)}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            {selectedImage ? (
              <img
                alt="Lightbox View"
                className="max-w-full max-h-full object-contain"
                src={selectedImage.image_url}
              />
            ) : null}
          </div>
          {/* Details Sidebar */}
          <div className="w-full md:w-[320px] bg-surface-container-lowest flex flex-col border-l border-border shrink-0">
            <div className="p-4 border-b border-border justify-between items-center hidden md:flex">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Image Details</h3>
              <button
                className="text-secondary hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container-low transition-colors"
                onClick={() => setIsLightboxOpen(false)}
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            <div className="p-6 flex-1 overflow-y-auto">
              {selectedImage ? (
                <>
                  <span className="px-2.5 py-1 bg-surface-container text-primary-container text-xs font-label-sm rounded inline-block mb-3">
                    {selectedImage.workshop ? (
                      <span>Workshop</span>
                    ) : (
                      <span>General</span>
                    )}
                  </span>
                  <h2 className="font-headline-md text-headline-md text-on-surface mb-2">{selectedImage.title}</h2>
                  <p className="text-secondary text-sm mb-6 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px]">calendar_today</span>
                    <span>
                      {new Date(selectedImage.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                    </span>
                  </p>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-body-md-bold text-on-surface mb-1 text-sm">Workshop</h4>
                      <p className="text-secondary text-sm">
                        {selectedImage.workshop ? (
                          <>
                            <span className="material-symbols-outlined text-[16px] mr-1">school</span>
                            {mockWorkshops.find(w => w.id === selectedImage.workshop)?.title || "Unknown Workshop"}
                          </>
                        ) : (
                          <span className="text-secondary">Not assigned to a workshop</span>
                        )}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-body-md-bold text-on-surface mb-1 text-sm">Uploaded By</h4>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-6 h-6 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center text-xs font-bold">
                          {selectedImage.uploaded_by?.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm text-secondary">{selectedImage.uploaded_by}</span>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-body-md-bold text-on-surface mb-1 text-sm">Image URL</h4>
                      <p className="text-secondary text-sm break-all truncate max-w-[200px]">
                        {selectedImage.image_url}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8">
                  <span className="material-symbols-outlined text-xl text-secondary mb-4">image</span>
                  <p className="text-center text-secondary">Select an image to view details</p>
                </div>
              )}
            </div>
            <div className="p-6 border-t border-border bg-bg-alt mt-auto">
              <button
                className="w-full py-2.5 bg-white border border-danger text-danger font-body-md-bold rounded-lg hover:bg-error-container transition-colors flex items-center justify-center gap-2"
                onClick={() => {
                  if (selectedImage) {
                    openDeleteConfirm(selectedImage.id);
                  }
                  setIsLightboxOpen(false);
                }}
              >
                <span className="material-symbols-outlined text-[20px]">delete</span> Delete Image
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <div
        className={`fixed inset-0 z-[80] dialog-overlay flex items-center justify-center bg-black/20 ${isDeleteConfirmOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      ></div>
      <div
        className={`fixed z-[90] bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl ${isDeleteConfirmOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"} transition-all duration-300`}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-headline-md text-headline-md">Delete Image</h3>
            <button
              className="p-2 hover:bg-bg-alt rounded-full text-secondary transition-colors"
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                setImageToDelete(null);
              }}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <p className="text-body-md text-center">
            Are you sure you want to delete this image? This action cannot be undone.
          </p>

          <div className="flex justify-center gap-4">
            <button
              className="flex-1 px-6 py-2.5 border border-border rounded-lg text-on-surface font-body-md-bold hover:bg-bg-alt transition-colors"
              onClick={() => {
                setIsDeleteConfirmOpen(false);
                setImageToDelete(null);
              }}
            >
              Cancel
            </button>
            <button
              className="flex-1 px-6 py-2.5 bg-error text-white rounded-lg font-body-md-bold hover:bg-error/80 transition-colors shadow-sm"
              onClick={handleDeleteConfirm}
            >
              Delete Image
            </button>
          </div>
        </div>
      </div>
    </>
  );
}