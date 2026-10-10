import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef } from 'react';
import type { Project } from '../types/portfolio';
import type { ProjectInput } from '../types/api';
import {
  useCreateProjectMutation,
  useDeleteProjectMutation,
  useProjectsQuery,
  useUpdateProjectMutation,
} from '../hooks/useProjectsQuery';
import { defaultTestProject } from '../data/projects';
import { useAuthStore } from './authStore';

export interface ProjectsContextValue {
  projects: Project[];
  isLoading: boolean;
  isError: boolean;
  saveProject: (project: Project) => Promise<Project | void>;
  deleteProject: (id: string) => Promise<void>;
  resetProjects: () => Promise<void>;
  refetchProjects: () => void;
}

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: { children: React.ReactNode }) {
  const { data: apiProjects, isLoading, isError, refetch } = useProjectsQuery();
  const createMutation = useCreateProjectMutation();
  const updateMutation = useUpdateProjectMutation();
  const deleteMutation = useDeleteProjectMutation();
  const autoCreatedRef = useRef(false);

  // Directly consume live data from the backend endpoint
  const projects = useMemo(() => apiProjects ?? [], [apiProjects]);

  // If the backend has 0 projects and admin is logged in, optionally create an initial project
  useEffect(() => {
    if (!isLoading && apiProjects && apiProjects.length === 0 && !autoCreatedRef.current) {
      autoCreatedRef.current = true;
      const token = useAuthStore.getState().token;
      if (token) {
        createMutation.mutateAsync(defaultTestProject).catch((err) => {
          console.error('Failed to create initial test project:', err);
        });
      }
    }
  }, [isLoading, apiProjects, createMutation]);

  // Purge any legacy localStorage mock projects cache
  useEffect(() => {
    try {
      window.localStorage.removeItem('portfolio.projects.v2');
    } catch {
      // Ignore
    }
  }, []);

  const saveProject = useCallback(
    async (project: Project) => {
      const input: ProjectInput = {
        title: project.title,
        tagline: project.tagline,
        year: project.year,
        category: project.category,
        status: project.status,
        featured: project.featured ?? false,
        image: project.image || undefined,
        imageAlt: project.imageAlt || undefined,
        description: project.description,
        role: project.role,
        stack: project.stack || [],
        metrics: project.metrics || [],
        liveUrl: project.liveUrl || undefined,
        codeUrl: project.codeUrl || undefined,
      };

      const isExistingOnServer = apiProjects?.some((p) => p.id === project.id);

      if (isExistingOnServer) {
        return await updateMutation.mutateAsync({ id: project.id, input });
      } else {
        return await createMutation.mutateAsync(input);
      }
    },
    [apiProjects, createMutation, updateMutation]
  );

  const deleteProject = useCallback(
    async (id: string) => {
      await deleteMutation.mutateAsync(id);
    },
    [deleteMutation]
  );

  const resetProjects = useCallback(async () => {
    try {
      const token = useAuthStore.getState().token;
      if (!token) {
        throw new Error('Authentication required to reset projects');
      }

      // Delete all current projects on the backend
      for (const p of projects) {
        await deleteMutation.mutateAsync(p.id);
      }

      // Create a fresh test project on the backend
      await createMutation.mutateAsync(defaultTestProject);
    } catch (err) {
      console.error('Failed to reset backend projects:', err);
      throw err;
    }
  }, [projects, deleteMutation, createMutation]);

  return (
    <ProjectsContext.Provider
      value={{
        projects,
        isLoading,
        isError,
        saveProject,
        deleteProject,
        resetProjects,
        refetchProjects: refetch,
      }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects must be used inside ProjectsProvider');
  return ctx;
}
