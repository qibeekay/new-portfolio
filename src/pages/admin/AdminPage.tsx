import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowUpRightIcon, CheckCircle2Icon, LogOutIcon, RotateCcwIcon } from "lucide-react";
import { toast } from "sonner";
import { useProjects } from "../../contexts/ProjectsContext";
import { AdminProjectList } from "../../components/admin/AdminProjectList";
import { ProjectForm } from "../../components/admin/ProjectForm";
import { profile } from "../../data/profile";
import { useAuthStore } from "../../store/authStore";

export function AdminPage() {
  const navigate = useNavigate();
  const { projects, isLoading, saveProject, deleteProject, resetProjects } = useProjects();
  const { isAuthenticated, email, clearAuth } = useAuthStore();

  const [selectedId, setSelectedId] = useState<string>(
    projects[0]?.id ?? "new",
  );
  const [confirmReset, setConfirmReset] = useState(false);
  const selected = projects.find((p) => p.id === selectedId) ?? null;
  const formKey = selected ? selected.id : "new";

  // Strict route protection: redirect unauthenticated users to secure login
  if (!isAuthenticated) {
    return <Navigate to="/admin-path/login" replace />;
  }

  const handleLogout = () => {
    clearAuth();
    toast("Logged out of admin session");
    navigate("/admin-path/login", { replace: true });
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
            {email && (
              <span className="hidden items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-0.5 font-mono text-[11px] text-accent sm:inline-flex">
                <CheckCircle2Icon className="size-3" /> {email}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-full border border-paper/15 px-3 py-1.5 text-xs text-paper/70 transition-colors hover:border-paper/40 hover:text-paper"
            >
              <LogOutIcon className="size-3.5" /> Logout
            </button>

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
