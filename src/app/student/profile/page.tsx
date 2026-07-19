"use client";

import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth-context";

export default function StudentProfilePage() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState({
    firstName: user?.first_name || "",
    lastName: user?.last_name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    username: user?.username || "",
  });
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [success, setSuccess] = useState("");

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [passwordFeedback, setPasswordFeedback] = useState("");

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.first_name || "",
        lastName: user.last_name || "",
        email: user.email || "",
        phone: user.phone || "",
        username: user.username || "",
      });
    }
  }, [user]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback("");
    setSuccess("");
    try {
      const res = await api.updateProfile({
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        phone: profileData.phone,
      });
      if (res.success) setSuccess("Profile updated successfully.");
      else setFeedback(res.message || "Update failed.");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update profile";
      setFeedback(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordFeedback("Passwords do not match.");
      return;
    }
    setUpdatingPassword(true);
    setPasswordFeedback("");
    try {
      const res = await api.resetPassword(passwordData.newPassword, "");
      if (res.success) {
        setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        setPasswordFeedback("Password updated successfully.");
      } else {
        setPasswordFeedback(res.message || "Password update failed.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password";
      setPasswordFeedback(msg);
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <div className="p-container-padding max-w-[1440px] mx-auto w-full">
      <div className="mb-8">
        <h2 className="font-headline-lg text-headline-lg text-on-surface">Profile Settings</h2>
        <p className="text-on-surface-variant font-body-md text-body-md">
          Manage your account details and security preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Avatar & Basic Info */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white border border-border rounded-xl p-6 shadow-sm flex flex-col items-center text-center">
            <div className="relative mb-4 group cursor-pointer">
              <img
                alt="User Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-surface-container-lowest shadow-sm"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB--e6dnBZNASTTRm6e2EaShxdV78ORhMx3REiS13VoKx7ymregT6J4hLZ6TV3zMgP7D3tcK2uiDlwNzSqDWSsmPif0vyJsNqHX-RokSvba5IlysPlJmtm-GGiNV4DWSoUAYnq_u9zRDp5_-ExlxeGVrGiFk8ctr6eBq6jWguwHJZ_gF4rrhpOP44CQhyp1f-Pbg4IZpz0gF-bQeT0DSalgOCxiY-J70kD2Ga_fHna74MiL3ybiYrQE1A"
              />
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="material-symbols-outlined text-white">photo_camera</span>
              </div>
            </div>
            <h3 className="font-headline-md text-headline-md text-on-surface">
              {profileData.firstName} {profileData.lastName}
            </h3>
            <p className="text-body-md text-on-surface-variant mb-4">@{profileData.username}</p>
            <div className="w-full pt-4 border-t border-border flex justify-between text-sm">
              <span className="text-on-surface-variant">Member Since</span>
              <span className="font-medium text-on-surface">January 2026</span>
            </div>
          </div>
        </div>

        {/* Right Column: Forms */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-surface-container-lowest">
              <h3 className="font-headline-md text-headline-md text-on-surface">Personal Information</h3>
              <p className="text-body-md text-on-surface-variant mt-1">Update your contact details.</p>
            </div>
            <form className="p-6 space-y-6" onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">First Name</label>
                  <input
                    type="text"
                    className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={profileData.firstName}
                    onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">Last Name</label>
                  <input
                    type="text"
                    className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={profileData.lastName}
                    onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">Email Address</label>
                  <input
                    type="email"
                    className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={profileData.email}
                    disabled
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">Phone Number</label>
                  <input
                    type="tel"
                    className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
              </div>
              {feedback && (
                <div className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">error</span>
                  {feedback}
                </div>
              )}
              {success && (
                <div className="p-3 bg-success/10 border border-success/20 rounded-lg text-success text-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">check_circle</span>
                  {success}
                </div>
              )}
              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-lg bg-primary-container text-white font-body-md-bold hover:brightness-110 shadow-sm transition-all disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

          {/* Security */}
          <div className="bg-white border border-border rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border bg-surface-container-lowest">
              <h3 className="font-headline-md text-headline-md text-on-surface">Security</h3>
              <p className="text-body-md text-on-surface-variant mt-1">Update your password to keep your account secure.</p>
            </div>
            <form className="p-6 space-y-6" onSubmit={handleUpdatePassword}>
              <div className="space-y-2 max-w-md">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">Current Password</label>
                <input
                  type="password"
                  className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2 max-w-md">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">New Password</label>
                <input
                  type="password"
                  className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                />
              </div>
              <div className="space-y-2 max-w-md">
                <label className="text-xs font-bold text-on-surface uppercase tracking-wider block">Confirm New Password</label>
                <input
                  type="password"
                  className="w-full h-11 px-4 border border-border rounded-lg bg-surface-container-lowest text-body-md focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                />
              </div>
              {passwordFeedback && (
                <div className={`p-3 rounded-lg text-sm flex items-center gap-2 max-w-md ${
                  passwordFeedback.includes("successfully")
                    ? "bg-success/10 border border-success/20 text-success"
                    : "bg-destructive/10 border border-destructive/20 text-destructive"
                }`}>
                  <span className="material-symbols-outlined text-sm">{passwordFeedback.includes("successfully") ? "check_circle" : "error"}</span>
                  {passwordFeedback}
                </div>
              )}
              <div className="pt-4 flex justify-start">
                <button
                  type="submit"
                  disabled={updatingPassword}
                  className="px-6 py-2.5 rounded-lg border border-border font-body-md-bold text-on-surface hover:bg-surface-container-low transition-all disabled:opacity-50"
                >
                  {updatingPassword ? "Updating..." : "Update Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
