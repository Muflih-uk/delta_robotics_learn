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

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  category_name: string;
  description: string;
  quantity: number;
  unit: string;
  low_stock_threshold: number;
  location: string;
  image_url: string;
  is_low_stock: boolean;
  created_at: string;
  updated_at: string;
}

export interface InventoryLog {
  id: string;
  item: string;
  item_name: string;
  change_type: "add" | "remove" | "adjustment";
  quantity_change: number;
  reason: string;
  performed_by: string;
  performed_by_name: string;
  created_at: string;
}

export interface InventoryCreateRequest {
  name: string;
  category: string;
  description?: string;
  quantity: number;
  unit?: string;
  low_stock_threshold?: number;
  location?: string;
  image_url?: string;
}

export type WorkshopStatus = "upcoming" | "ongoing" | "completed" | "cancelled";

export type RegistrationStatus = "registered" | "attended" | "cancelled";

export interface Workshop {
  id: string;
  title: string;
  description: string;
  status: WorkshopStatus;
  event_date: string;
  location: string;
  image_url: string;
  is_published: boolean;
  gallery_images: string[];
  total_registrations: number;
  created_at: string;
  updated_at: string;
}

export interface WorkshopCreateRequest {
  title: string;
  description?: string;
  status: WorkshopStatus;
  event_date?: string;
  location?: string;
  image_url?: string;
  is_published?: boolean;
}

export interface WorkshopRegistration {
  id: string;
  workshop: string;
  workshop_title: string;
  student: string;
  student_name: string;
  status: "registered" | "attended" | "cancelled";
  created_at: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  image_url: string;
  workshop?: string | null;
  uploaded_by: string;
  created_at: string;
}

export interface GalleryCreateRequest {
  title: string;
  image_url: string;
  workshop?: string | null;
}
