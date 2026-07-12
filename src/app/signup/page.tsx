"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

const roles = [
  { id: "student", label: "Student", icon: "school" },
  { id: "intern", label: "Intern", icon: "engineering" },
  { id: "admin", label: "Admin", icon: "admin_panel_settings" },
] as const;

export default function SignupPage() {
  const [form, setForm] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [selectedRole, setSelectedRole] = useState("student");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const router = useRouter();

  const update = (field: string, value: string) => setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const user = await register({
        username: form.username,
        email: form.email,
        password: form.password,
        first_name: form.first_name || undefined,
        last_name: form.last_name || undefined,
        phone: form.phone || undefined,
        role: selectedRole as "student" | "intern" | "admin",
      });
      router.push(`/${user.role}/dashboard`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background text-on-background font-body-md antialiased">
      <header className="w-full py-base px-4 md:px-10 bg-surface border-b border-outline-variant flex justify-center items-center h-[72px] gap-3">
        <img src="/logo-48.png" alt="Delta Robotics" className="w-10 h-10 object-contain" />
        <div className="font-headline-md text-headline-md font-bold text-primary">Delta Robotics</div>
      </header>

      <main className="flex-grow flex items-center justify-center p-4 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full border-[40px] border-primary-container blur-3xl"></div>
        </div>

        <div className="bg-surface-container-lowest border border-surface-variant rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] w-full max-w-lg p-6 md:p-12 z-10 relative">
          <div className="text-center mb-12">
            <h1 className="font-headline-lg text-headline-lg mb-xs">Create Account</h1>
            <p className="font-body-md text-body-md text-secondary">Join the Delta Robotics learning community.</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-destructive/10 border border-destructive/20 rounded-lg text-destructive text-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">error</span>
              {error}
            </div>
          )}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block font-label-sm text-label-sm text-on-surface mb-1" htmlFor="username">
                Username
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-3 py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                id="username"
                placeholder="johndoe"
                required
                type="text"
                value={form.username}
                onChange={(e) => update("username", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-1" htmlFor="firstName">
                  First Name
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-3 py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                  id="firstName"
                  placeholder="Ada"
                  type="text"
                  value={form.first_name}
                  onChange={(e) => update("first_name", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-1" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-3 py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                  id="lastName"
                  placeholder="Lovelace"
                  type="text"
                  value={form.last_name}
                  onChange={(e) => update("last_name", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface mb-1" htmlFor="email">
                Email Address
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-3 py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                id="email"
                placeholder="name@deltarobotics.edu"
                required
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
              />
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface mb-1" htmlFor="phone">
                Phone Number <span className="text-on-surface-variant/50">(optional)</span>
              </label>
              <input
                className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-3 py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                id="phone"
                placeholder="+1 (555) 000-0000"
                type="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-1" htmlFor="password">
                  Password
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-3 py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                  id="password"
                  placeholder="Min. 8 characters"
                  required
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
              </div>
              <div>
                <label className="block font-label-sm text-label-sm text-on-surface mb-1" htmlFor="confirmPassword">
                  Confirm Password
                </label>
                <input
                  className="w-full bg-surface-container-lowest border border-surface-variant rounded-lg px-3 py-3 font-body-md text-body-md text-on-background focus:outline-none focus:border-primary-container focus:ring-1 focus:ring-primary-container transition-colors"
                  id="confirmPassword"
                  placeholder="Re-enter password"
                  required
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block font-label-sm text-label-sm text-on-surface-variant mb-3 uppercase tracking-wide">
                I want to join as
              </label>
              <div className="grid grid-cols-3 gap-3">
                {roles.map((role) => {
                  const isActive = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => setSelectedRole(role.id)}
                      className={`border rounded-lg p-3 flex flex-col items-center justify-center text-center h-24 transition-all cursor-pointer ${
                        isActive
                          ? "border-primary-container bg-primary-container/5"
                          : "border-outline-variant hover:border-border hover:bg-surface"
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-3xl mb-1 transition-colors ${
                          isActive ? "text-primary-container" : "text-secondary"
                        }`}
                        style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
                      >
                        {role.icon}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-background font-semibold">
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-3">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-primary font-headline-md text-headline-md font-bold uppercase rounded-lg py-3 hover:opacity-90 transition-opacity flex justify-center items-center gap-1 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Creating Account...
                  </span>
                ) : (
                  <>
                    Create Account <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="mt-12 text-center border-t border-surface-variant pt-6">
            <p className="font-body-md text-body-md text-secondary">
              Already have an account?{" "}
              <Link className="text-primary-container font-semibold hover:underline" href="/login">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 px-4 md:px-10 bg-surface-container flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left h-[80px]">
        <div className="font-body-md text-body-md text-on-secondary-fixed-variant">
          &copy; 2024 Delta Robotics Platforms. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
