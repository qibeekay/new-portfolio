import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, KeyRoundIcon, LockIcon, ShieldCheckIcon } from "lucide-react";
import { toast } from "sonner";
import { profile } from "../../data/profile";
import { useAuthStore } from "../../store/authStore";
import { useAdminLoginMutation } from "../../hooks/useProjectsQuery";

export function AdminLoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const loginMutation = useAdminLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // If already authenticated, redirect straight to the admin dashboard
  if (isAuthenticated) {
    return <Navigate to="/admin-path/admin" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setErrorMsg("Please provide both email and password.");
      return;
    }

    try {
      await loginMutation.mutateAsync({ email: trimmedEmail, password });
      toast.success("Authenticated successfully");
      navigate("/admin-path/admin", { replace: true });
    } catch (err: any) {
      const serverMsg =
        err.response?.data?.error || err.message || "Invalid credentials or authentication error";
      setErrorMsg(serverMsg);
      toast.error(serverMsg);
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-between bg-ink text-paper">
      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b border-paper/10 px-6 md:px-12 bg-ink/80 backdrop-blur-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2 font-mono text-xs text-paper/60 transition-colors hover:text-paper"
        >
          <ArrowLeftIcon className="size-3.5" /> Back to Portfolio
        </Link>
        <span className="font-display text-lg tracking-tight text-paper/90">
          {profile.name}
        </span>
      </header>

      {/* Login Card */}
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-paper/10 bg-paper/[0.03] p-8 backdrop-blur-xl shadow-2xl">
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl border border-accent/25 bg-accent/15 text-accent shadow-inner">
              <LockIcon className="size-6" />
            </div>
            <h1 className="font-display text-2xl tracking-tight text-paper">
              Administrator Access
            </h1>
            <p className="mt-1 text-xs text-paper/60">
              Enter your administrative credentials to manage projects.
            </p>
          </div>

          {errorMsg && (
            <div className="mb-6 rounded-lg border border-red-500/25 bg-red-500/10 px-4 py-3 text-xs text-red-400">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-email"
                className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-paper/70"
              >
                Admin Email
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errorMsg) setErrorMsg(null);
                }}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-paper/15 bg-ink/80 px-4 py-2.5 text-sm text-paper placeholder-paper/25 transition-colors focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="admin-password"
                className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-paper/70"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="admin-password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (errorMsg) setErrorMsg(null);
                  }}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-paper/15 bg-ink/80 px-4 py-2.5 pr-10 text-sm text-paper placeholder-paper/25 transition-colors focus:border-accent focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-paper/40 transition-colors hover:text-paper/80"
                >
                  {showPassword ? (
                    <EyeOffIcon className="size-4" />
                  ) : (
                    <EyeIcon className="size-4" />
                  )}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-2.5 text-sm font-semibold text-ink transition-all hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
            >
              {loginMutation.isPending ? (
                <>
                  <div className="size-4 animate-spin rounded-full border-2 border-ink border-t-transparent" />
                  <span>Authenticating…</span>
                </>
              ) : (
                <>
                  <KeyRoundIcon className="size-4" />
                  <span>Enter Dashboard</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 border-t border-paper/10 pt-4 font-mono text-[11px] text-paper/40">
            <ShieldCheckIcon className="size-3.5 text-accent/70" />
            <span>Encrypted Session • Protected Portal</span>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-paper/10 px-6 py-4 text-center font-mono text-xs text-paper/40">
        © 2026 {profile.name}
      </footer>
    </div>
  );
}

export default AdminLoginPage;
