import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  adminLoginApi,
  createProjectApi,
  deleteProjectApi,
  getProjectById,
  getProjects,
  updateProjectApi,
  uploadImageApi,
} from '../api/projects';
import type { LoginRequest, ProjectInput } from '../types/api';
import type { Project } from '../types/portfolio';
import { useAuthStore } from '../store/authStore';

export const PROJECTS_QUERY_KEY = ['projects'] as const;

/**
 * Fetch all projects from API
 */
export function useProjectsQuery() {
  return useQuery<Project[]>({
    queryKey: PROJECTS_QUERY_KEY,
    queryFn: getProjects,
  });
}

/**
 * Fetch single project by ID
 */
export function useProjectQuery(id?: string) {
  return useQuery<Project>({
    queryKey: ['project', id],
    queryFn: () => getProjectById(id!),
    enabled: Boolean(id),
  });
}

/**
 * Mutation to create a project
 */
export function useCreateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: ProjectInput) => createProjectApi(input),
    onSuccess: (newProject) => {
      queryClient.setQueryData<Project[]>(PROJECTS_QUERY_KEY, (old = []) => [newProject, ...old]);
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

/**
 * Mutation to update an existing project
 */
export function useUpdateProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: ProjectInput }) => updateProjectApi(id, input),
    onSuccess: (updated) => {
      queryClient.setQueryData<Project[]>(PROJECTS_QUERY_KEY, (old = []) =>
        old.map((p) => (p.id === updated.id ? updated : p))
      );
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: ['project', updated.id] });
    },
  });
}

/**
 * Mutation to delete a project
 */
export function useDeleteProjectMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteProjectApi(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Project[]>(PROJECTS_QUERY_KEY, (old = []) =>
        old.filter((p) => p.id !== deletedId)
      );
      queryClient.invalidateQueries({ queryKey: PROJECTS_QUERY_KEY });
    },
  });
}

/**
 * Mutation to upload image
 */
export function useUploadImageMutation() {
  return useMutation({
    mutationFn: (file: File) => uploadImageApi(file),
  });
}

/**
 * Mutation for admin login
 */
export function useAdminLoginMutation() {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (creds: LoginRequest) => adminLoginApi(creds),
    onSuccess: (res, variables) => {
      setAuth(res.token, res.expiresAt, variables.email);
    },
  });
}
