import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { projects as seedProjects } from '../data/projects';
import type { Project } from '../types/portfolio';

interface ProjectsContextValue {
  projects: Project[];
  saveProject: (project: Project) => void;
  deleteProject: (id: string) => void;
  resetProjects: () => void;
}

const STORAGE_KEY = 'portfolio.projects.v2';

const ProjectsContext = createContext<ProjectsContextValue | null>(null);

export function ProjectsProvider({ children }: {children: React.ReactNode;}) {
  const [projects, setProjects] = useState<Project[]>(loadProjects);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {

      /* storage unavailable — keep working in memory */}
  }, [projects]);

  const saveProject = useCallback((project: Project) => {
    setProjects((list) => {
      const exists = list.some((p) => p.id === project.id);
      return exists ? list.map((p) => p.id === project.id ? project : p) : [project, ...list];
    });
  }, []);

  const deleteProject = useCallback((id: string) => {
    setProjects((list) => list.filter((p) => p.id !== id));
  }, []);

  const resetProjects = useCallback(() => setProjects(seedProjects), []);

  return (
    <ProjectsContext.Provider value={{ projects, saveProject, deleteProject, resetProjects }}>
      {children}
    </ProjectsContext.Provider>);

}

export function useProjects() {
  const ctx = useContext(ProjectsContext);
  if (!ctx) throw new Error('useProjects must be used inside ProjectsProvider');
  return ctx;
}

function loadProjects(): Project[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Project[];
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {

    /* fall back to seed data */}
  return seedProjects;
}