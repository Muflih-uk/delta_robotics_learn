import { AUTH_KEYS } from "@/constants/auth";
import type {
  ApiResponse,
  LoginRequest,
  RegisterRequest,
  LoginResponse,
  RegisterResponse,
  ProfileResponse,
  RefreshResponse,
  Course,
  Material,
  Announcement,
  Enrollment,
  CourseCreateRequest,
  InventoryItem,
  InventoryLog,
  InventoryCreateRequest,
  Workshop,
  WorkshopCreateRequest,
  WorkshopRegistration,
  GalleryImage,
  GalleryCreateRequest,
} from "../types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "https://delta-backend-ohze.onrender.com/api").replace(/\/+$/, "");

function getTokens(): { access: string | null; refresh: string | null } {
  if (typeof window === "undefined") return { access: null, refresh: null };
  return {
    access: localStorage.getItem(AUTH_KEYS.ACCESS_TOKEN),
    refresh: localStorage.getItem(AUTH_KEYS.REFRESH_TOKEN),
  };
}

function setTokens(access: string, refresh: string) {
  localStorage.setItem(AUTH_KEYS.ACCESS_TOKEN, access);
  localStorage.setItem(AUTH_KEYS.REFRESH_TOKEN, refresh);
}

function clearTokens() {
  localStorage.removeItem(AUTH_KEYS.ACCESS_TOKEN);
  localStorage.removeItem(AUTH_KEYS.REFRESH_TOKEN);
}

class ApiError extends Error {
  status: number;
  body: { success: boolean; message: string };

  constructor(status: number, body: { success: boolean; message: string }) {
    super(body.message || "Request failed");
    this.status = status;
    this.body = body;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit & { auth?: boolean } = {}
): Promise<T> {
  const { auth = false, ...fetchOptions } = options;
  const url = `${API_BASE}${endpoint}`;

  const { access } = getTokens();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (auth && access) {
    headers["Authorization"] = `Bearer ${access}`;
  }

  let res = await fetch(url, { ...fetchOptions, headers });

  if (res.status === 401 && auth) {
    const refreshed = await attemptRefresh();
    if (refreshed) {
      const { access: newAccess } = getTokens();
      headers["Authorization"] = `Bearer ${newAccess}`;
      res = await fetch(url, { ...fetchOptions, headers });
    } else {
      clearTokens();
    }
  }

  const body = await res.json().catch(() => ({
    success: false,
    message: res.statusText || "An unexpected error occurred"
  }));

  if (!res.ok) {
    throw new ApiError(res.status, body);
  }

  return body as T;
}

async function attemptRefresh(): Promise<boolean> {
  const { refresh } = getTokens();
  if (!refresh) return false;

  try {
    const res = await fetch(`${API_BASE}/accounts/refresh-token/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: refresh }),
    });

    if (!res.ok) {
      clearTokens();
      return false;
    }

    const data: RefreshResponse = await res.json();
    setTokens(data.access_token, data.refresh_token);
    return true;
  } catch {
    clearTokens();
    return false;
  }
}



export const api = {
  login(data: LoginRequest) {
    return request<LoginResponse>("/accounts/login/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  register(data: RegisterRequest) {
    return request<RegisterResponse>("/accounts/register/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  logout() {
    return request<ApiResponse>("/accounts/logout/", {
      method: "POST",
      auth: true,
    });
  },

  verifyToken() {
    return request<ApiResponse<{ user: import("../types").User }>>("/accounts/verify-token/", {
      auth: true,
    });
  },

  refreshToken(refresh_token: string) {
    return request<ApiResponse<RefreshResponse>>("/accounts/refresh-token/", {
      method: "POST",
      body: JSON.stringify({ refresh_token }),
    });
  },

  forgotPassword(email: string) {
    return request<ApiResponse>("/accounts/forgot-password/", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },

  resetPassword(password: string, refresh_token: string) {
    return request<ApiResponse>("/accounts/reset-password/", {
      method: "POST",
      auth: true,
      body: JSON.stringify({ password, refresh_token }),
    });
  },

  getProfile() {
    return request<ApiResponse<ProfileResponse>>("/accounts/profile/", {
      auth: true,
    });
  },

  updateProfile(data: Partial<{ first_name: string; last_name: string; phone: string; avatar_url: string }>) {
    return request<ApiResponse<ProfileResponse>>("/accounts/profile/update/", {
      method: "PUT",
      auth: true,
      body: JSON.stringify(data),
    });
  },

  deleteAccount() {
    return request<ApiResponse>("/accounts/profile/delete/", {
      method: "DELETE",
      auth: true,
    });
  },

  courses: {
    list() {
      return request<Course[]>("/courses/", { auth: true });
    },

    get(id: string) {
      return request<Course>(`/courses/${id}/`, { auth: true });
    },

    create(data: CourseCreateRequest) {
      return request<Course>("/courses/", {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    update(id: string, data: Partial<CourseCreateRequest>) {
      return request<{ message: string }>(`/courses/${id}/`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    delete(id: string) {
      return request<void>(`/courses/${id}/`, {
        method: "DELETE",
        auth: true,
      });
    },
  },

  materials: {
    list() {
      return request<Material[]>("/materials/", { auth: true });
    },

    create(data: Partial<Material>) {
      return request<Material>("/materials/", {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    update(id: string, data: Partial<Material>) {
      return request<Material>(`/materials/${id}/`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    delete(id: string) {
      return request<void>(`/materials/${id}/`, {
        method: "DELETE",
        auth: true,
      });
    },
  },

  announcements: {
    list() {
      return request<Announcement[]>("/announcements/", { auth: true });
    },

    create(data: Partial<Announcement>) {
      return request<Announcement>("/announcements/", {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    update(id: string, data: Partial<Announcement>) {
      return request<Announcement>(`/announcements/${id}/`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    delete(id: string) {
      return request<void>(`/announcements/${id}/`, {
        method: "DELETE",
        auth: true,
      });
    },
  },

  enrollments: {
    enroll(courseId: string) {
      return request<Enrollment>(`/courses/${courseId}/enroll/`, {
        method: "POST",
        auth: true,
      });
    },

    myEnrollments() {
      return request<Enrollment[]>("/my-enrollments/", { auth: true });
    },
  },

  inventory: {
    list() {
      return request<InventoryItem[]>("/inventory/", { auth: true });
    },

    get(id: string) {
      return request<InventoryItem>(`/inventory/${id}/`, { auth: true });
    },

    create(data: InventoryCreateRequest) {
      return request<InventoryItem>("/inventory/", {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    update(id: string, data: InventoryCreateRequest) {
      return request<InventoryItem>(`/inventory/${id}/`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    patch(id: string, data: Partial<InventoryCreateRequest & { quantity: number }>) {
      return request<InventoryItem>(`/inventory/${id}/`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    delete(id: string) {
      return request<void>(`/inventory/${id}/`, {
        method: "DELETE",
        auth: true,
      });
    },
  },

  inventoryLogs: {
    list() {
      return request<InventoryLog[]>("/inventory-logs/", { auth: true });
    },

    get(id: string) {
      return request<InventoryLog>(`/inventory-logs/${id}/`, { auth: true });
    },
  },

  workshops: {
    list() {
      return request<Workshop[]>("/workshops/", { auth: true });
    },

    get(id: string) {
      return request<Workshop>(`/workshops/${id}/`, { auth: true });
    },

    create(data: WorkshopCreateRequest) {
      return request<Workshop>("/workshops/", {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    update(id: string, data: WorkshopCreateRequest) {
      return request<Workshop>(`/workshops/${id}/`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    patch(id: string, data: Partial<WorkshopCreateRequest>) {
      return request<Workshop>(`/workshops/${id}/`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    delete(id: string) {
      return request<void>(`/workshops/${id}/`, {
        method: "DELETE",
        auth: true,
      });
    },

    registrations(id: string) {
      return request<WorkshopRegistration[]>(`/workshops/${id}/registrations/`, { auth: true });
    },
  },

  gallery: {
    list() {
      return request<GalleryImage[]>("/gallery/", { auth: true });
    },

    get(id: string) {
      return request<GalleryImage>(`/gallery/${id}/`, { auth: true });
    },

    create(data: GalleryCreateRequest) {
      return request<GalleryImage>("/gallery/", {
        method: "POST",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    update(id: string, data: GalleryCreateRequest) {
      return request<GalleryImage>(`/gallery/${id}/`, {
        method: "PUT",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    patch(id: string, data: Partial<GalleryCreateRequest>) {
      return request<GalleryImage>(`/gallery/${id}/`, {
        method: "PATCH",
        auth: true,
        body: JSON.stringify(data),
      });
    },

    delete(id: string) {
      return request<void>(`/gallery/${id}/`, {
        method: "DELETE",
        auth: true,
      });
    },
  },

  workshopRegistrations: {
    register(workshopId: string) {
      return request<WorkshopRegistration>("/workshop-registrations/", {
        method: "POST",
        auth: true,
        body: JSON.stringify({ workshop: workshopId }),
      });
    },

    myRegistrations() {
      return request<WorkshopRegistration[]>("/workshop-registrations/", { auth: true });
    },
  },
};

export { setTokens, clearTokens, getTokens, ApiError };
