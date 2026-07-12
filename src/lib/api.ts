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
} from "./types";

const API_BASE = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api").replace(/\/+$/, "");

function getTokens(): { access: string | null; refresh: string | null } {
  if (typeof window === "undefined") return { access: null, refresh: null };
  return {
    access: localStorage.getItem("access_token"),
    refresh: localStorage.getItem("refresh_token"),
  };
}

function setTokens(access: string, refresh: string) {
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);
}

function clearTokens() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
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
    }
  }

  const body = await res.json().catch(() => ({ success: false, message: res.statusText }));

  if (!res.ok) {
    clearTokens();
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

function cleanAuthResponse(body: ApiResponse): ApiResponse {
  if (!body.success && body.message) {
    if (body.message.includes("Invalid token") || body.message.includes("not found")) {
      clearTokens();
    }
  }
  return body;
}

export const api = {
  login(data: LoginRequest) {
    return request<ApiResponse<LoginResponse>>("/accounts/login/", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  register(data: RegisterRequest) {
    return request<ApiResponse<RegisterResponse>>("/accounts/register/", {
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
    return request<ApiResponse<{ user: import("./types").User }>>("/accounts/verify-token/", {
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
};

export { setTokens, clearTokens, getTokens, ApiError };
