export interface User {
  id: string;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  role: "student" | "intern" | "admin";
  avatar_url: string;
  created_at: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  user?: User;
  access_token?: string;
  refresh_token?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  role?: "student" | "intern" | "admin";
}

export interface LoginResponse {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface ProfileResponse {
  user: User;
}

export interface RefreshResponse {
  access_token: string;
  refresh_token: string;
}

export type CourseLevel = "school" | "college";

export type MaterialType = "video" | "pdf";

export type EnrollmentStatus =
  | "pending_payment"
  | "payment_verification"
  | "pending_enrollment"
  | "active"
  | "rejected";

export interface Course {
  id: string;
  title: string;
  description: string;
  level: CourseLevel;
  price: string;
  thumbnail_url: string;
  is_published: boolean;
  created_by: string;
  created_at: string;
  updated_at: string;
  materials: Material[];
  announcements: Announcement[];
  feedback: Feedback[];
}

export interface Material {
  id: string;
  course: string;
  type: MaterialType;
  title: string;
  url: string;
  order_index: number;
  created_by: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  course: string;
  title: string;
  content: string;
  created_by: string;
  created_at: string;
}

export interface Feedback {
  id: string;
  course: string;
  student: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface Enrollment {
  id: string;
  student: string;
  course: string;
  course_title: string;
  status: EnrollmentStatus;
  approved_by: string | null;
  approved_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseCreateRequest {
  title: string;
  description: string;
  level: CourseLevel;
  price: string;
  thumbnail_url?: string;
  is_published?: boolean;
}
