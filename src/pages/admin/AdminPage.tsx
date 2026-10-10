import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRightIcon, CheckCircle2Icon, LockIcon, LogOutIcon, RotateCcwIcon, ShieldAlertIcon } from "lucide-react";
import { toast } from "sonner";
import { useProjects } from "../../contexts/ProjectsContext";
import { AdminProjectList } from "../../components/admin/AdminProjectList";
import { ProjectForm } from "../../components/admin/ProjectForm";
import { profile } from "../../data/profile";
import { useAuthStore } from "../../store/authStore";
import { useAdminLoginMutation } from "../../hooks/useProjectsQuery";

export function AdminPage() {
  const { projects, isLoading, saveProject, deleteProject, resetProjects } = useProjects();
  const { isAuthenticated, email, clearAuth } = useAuthStore();
  const loginMutation = useAdminLoginMutation();

  const [loginEmail, setLoginEmail] = useState("admin@example.com");
  const [loginPassword, setLoginPassword] = useState("admin123");
  const [selectedId, setSelectedId] = useState<string>(
    projects[0]?.id ?? "new",
  );
  const [confirmReset, setConfirmReset] = useState(false);
  const selected = projects.find((p) => p.id === selectedId) ?? null;
  const formKey = selected ? selected.id : "new";

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await loginMutation.mutateAsync({ email: loginEmail, password: loginPassword });
      toast.success("Logged in to backend successfully");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Login failed");
    }
  };

  const handleDelete = async (id: string) => {
    const removed = projects.find((p) => p.id === id);
    try {
      await deleteProject(id);
      const remaining = projects.filter((p) => p.id !== id);
      setSelectedId(remaining[0]?.id ?? "new");
      toast.success(`${removed?.title ?? "Project"} deleted`);
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed to delete project");
    }
  };

  const handleReset = async () => {
    try {
      toast.loading("Resetting projects on server...", { id: "reset-proj" });
      await resetProjects();
      setConfirmReset(false);
      setSelectedId("new");
      toast.success("Reset to sample test project on server", { id: "reset-proj" });
    } catch {
      toast.error("Failed to reset projects on server", { id: "reset-proj" });
    }
  };

  return (
    <div className="min-h-screen w-full bg-ink text-paper">
      <header className="sticky top-0 z-30 border-b border-paper/10 bg-ink/85 backdrop-blur-md">
        <div className="flex h-16 items-center justify-between gap-4 px-6 md:px-10">
          <div className="flex items-baseline gap-3">
            <Link to="/" className="font-display text-2xl leading-none">
              {profile.name}
            </Link>
            <span className="rounded-full border border-paper/15 px-2 py-0.5 font-mono text-[11px] text-paper/60">
              Admin
            </span>
            {isAuthenticated ? (
              <span className="hidden items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent sm:inline-flex">
                <CheckCircle2Icon className="size-3" /> {email ?? 'Connected'}
              </span>
            ) : (
              <span className="hidden items-center gap-1.5 rounded-full bg-amber-500/10 px-2.5 py-0.5 font-mono text-[11px] text-amber-400 sm:inline-flex">
                <ShieldAlertIcon className="size-3" /> Offline / Guest
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => {
                  clearAuth();
                  toast("Logged out of admin session");
                }}
                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs text-paper/60 transition-colors hover:text-paper"
              >
                <LogOutIcon className="size-3.5" /> Logout
              </button>
            ) : null}

            {confirmReset ? (
              <>
                <button
                  type="button"
                  onClick={() => setConfirmReset(false)}
                  className="rounded-full px-3 py-2 text-sm text-paper/60 hover:text-paper"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="whitespace-nowrap rounded-full border border-accent px-3.5 py-2 text-sm text-accent transition-colors duration-150 hover:bg-accent hover:text-ink"
                >
                  Replace with samples
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmReset(true)}
                className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-paper/15 px-3.5 py-2 text-sm text-paper/70 transition-colors duration-150 hover:text-paper"
              >
                <RotateCcwIcon className="size-3.5" /> Reset
              </button>
            )}
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full bg-paper px-4 py-2 text-sm font-medium text-ink transition-colors duration-150 hover:bg-accent"
            >
              View site <ArrowUpRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </header>

      {!isAuthenticated && (
        <div className="border-b border-paper/10 bg-paper/[0.03] px-6 py-4 md:px-10">
          <form onSubmit={handleLogin} className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex size-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <LockIcon className="size-4" />
              </div>
              <div>
                <p className="text-sm font-medium">Backend Authentication Required for Server Sync</p>
                <p className="text-xs text-paper/50">Log in with the Go backend credentials to create, edit and upload directly to Cloudinary.</p>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <input
                type="email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="Email"
                className="h-9 rounded-lg border border-paper/15 bg-ink px-3 text-xs text-paper focus:border-accent focus:outline-none"
              />
              <input
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="Password"
                className="h-9 rounded-lg border border-paper/15 bg-ink px-3 text-xs text-paper focus:border-accent focus:outline-none"
              />
              <button
                type="submit"
                disabled={loginMutation.isPending}
                className="h-9 rounded-lg bg-accent px-4 text-xs font-semibold text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                {loginMutation.isPending ? "Authenticating…" : "Connect API"}
              </button>
            </div>
          </form>
        </div>
      )}

      <main className="grid gap-10 px-6 py-10 md:px-10 lg:grid-cols-12">
        <aside className="lg:col-span-4 xl:col-span-3">
          <div className="lg:sticky lg:top-24">
            <AdminProjectList
              projects={projects}
              selectedId={selected ? selected.id : "new"}
              onSelect={setSelectedId}
              onNew={() => setSelectedId("new")}
              isLoading={isLoading}
            />
          </div>
        </aside>
        <section
          className="lg:col-span-8 xl:col-span-9"
          aria-label="Project editor"
        >
          <ProjectForm
            key={formKey}
            project={selected}
            onSave={async (p) => {
              try {
                const saved = await saveProject(p);
                if (saved) {
                  setSelectedId(saved.id);
                }
              } catch {
                // error already handled or displayed
              }
            }}
            onDelete={handleDelete}
          />
        </section>
      </main>
    </div>
  );
}

export { AdminPage as Admin };
export default AdminPage;
