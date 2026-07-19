"use client";

import { useState, useEffect } from "react";
import { api, getTokens } from "@/lib/api";

export default function SettingsPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    api.getProfile().then((res) => {
      if (res.data?.user) {
        setFirstName(res.data.user.first_name);
        setLastName(res.data.user.last_name);
        setEmail(res.data.user.email);
        setPhone(res.data.user.phone);
        setAvatarUrl(res.data.user.avatar_url || "");
      }
    }).catch(() => {});
  }, []);

  async function handleSaveProfile() {
    setSaving(true);
    setMessage(null);
    try {
      const res = await api.updateProfile({ first_name: firstName, last_name: lastName, phone, avatar_url: avatarUrl || undefined });
      if (res.success) {
        setMessage({ type: "success", text: "Profile updated successfully" });
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to update profile" });
    } finally {
      setSaving(false);
    }
  }

  async function handleChangePassword() {
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      return;
    }
    const { refresh } = getTokens();
    if (!refresh) {
      setMessage({ type: "error", text: "No refresh token found. Please log in again." });
      return;
    }
    setChangingPassword(true);
    setMessage(null);
    try {
      const res = await api.resetPassword(newPassword, refresh);
      if (res.success) {
        setMessage({ type: "success", text: "Password updated successfully" });
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch (err) {
      setMessage({ type: "error", text: err instanceof Error ? err.message : "Failed to change password" });
    } finally {
      setChangingPassword(false);
    }
  }

  return (
    <div className="flex-1 overflow-auto p-container-padding bg-surface-container-lowest">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Settings</h2>
          <p className="text-secondary font-body-md max-w-2xl">
            Manage your account preferences, platform configurations, and security settings.
          </p>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg border ${message.type === "success" ? "bg-green-50 border-green-200 text-success" : "bg-red-50 border-red-200 text-danger"}`}>
            {message.text}
          </div>
        )}

        <div className="space-y-8">
          <section className="bg-surface-container-lowest border border-border rounded-xl shadow-sm p-[24px]">
            <h3 className="font-headline-md text-headline-md text-on-surface border-b border-border pb-4 mb-6 flex items-center space-x-2">
              <span className="material-symbols-outlined text-primary-container">account_circle</span>
              <span>Profile Settings</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center justify-start space-y-4">
                <div className="relative group cursor-pointer">
                  <img
                    className="w-32 h-32 rounded-full object-cover border-4 border-bg-alt shadow-sm"
                    alt="Avatar"
                    src={avatarUrl || "https://placehold.co/128x128/1a1a2e/ffffff?text=User"}
                  />
                  <div className="absolute inset-0 bg-on-surface/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white">photo_camera</span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">First Name</label>
                    <input className="w-full h-[40px] px-3 rounded-lg border border-border bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none font-body-md" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Last Name</label>
                    <input className="w-full h-[40px] px-3 rounded-lg border border-border bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none font-body-md" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Email Address</label>
                    <input className="w-full h-[40px] px-3 rounded-lg border border-border bg-bg-alt text-secondary outline-none font-body-md cursor-not-allowed" readOnly value={email} />
                  </div>
                  <div className="space-y-2">
                    <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Phone</label>
                    <input className="w-full h-[40px] px-3 rounded-lg border border-border bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none font-body-md" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <button className="px-5 py-2 bg-primary-container text-on-primary rounded-lg font-body-md-bold hover:bg-primary transition-colors shadow-sm disabled:opacity-50" onClick={handleSaveProfile} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-surface-container-lowest border border-border rounded-xl shadow-sm p-[24px] border-l-4 border-l-warning">
            <h3 className="font-headline-md text-headline-md text-on-surface border-b border-border pb-4 mb-6 flex items-center space-x-2">
              <span className="material-symbols-outlined text-warning">shield_lock</span>
              <span>Security &amp; Access</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div className="space-y-4">
                <p className="font-body-md text-secondary">
                  Ensure your account is using a long, random password to stay secure. We recommend using a password manager.
                </p>
              </div>
              <div className="space-y-6 bg-bg-alt p-6 rounded-lg border border-border">
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">New Password</label>
                  <input className="w-full h-[40px] px-3 rounded-lg border border-border bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none font-body-md" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Min 8 characters" />
                </div>
                <div className="space-y-2">
                  <label className="font-label-sm text-label-sm text-secondary uppercase tracking-wider block">Confirm New Password</label>
                  <input className="w-full h-[40px] px-3 rounded-lg border border-border bg-surface-container-lowest text-on-surface focus:border-primary-container focus:ring-1 focus:ring-primary-container outline-none font-body-md" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="pt-2">
                  <button className="w-full px-5 py-2 bg-surface-container-lowest border border-border text-on-surface rounded-lg font-body-md-bold hover:border-primary-container hover:text-primary-container transition-colors shadow-sm disabled:opacity-50" onClick={handleChangePassword} disabled={changingPassword || !newPassword || !confirmPassword}>
                    {changingPassword ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
