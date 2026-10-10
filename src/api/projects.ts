import { apiClient } from './client';
import type { Project } from '../types/portfolio';
import type { LoginRequest, LoginResponse, ProjectInput, UploadResponse } from '../types/api';

/**
 * Public: List all projects
 */
export async function getProjects(): Promise<Project[]> {
  const { data } = await apiClient.get<Project[]>('/api/projects');
  return data;
}

/**
 * Public: Get single project by ID
 */
export async function getProjectById(id: string): Promise<Project> {
  const { data } = await apiClient.get<Project>(`/api/projects/${id}`);
  return data;
}

/**
 * Admin: Create a new project
 */
export async function createProjectApi(input: ProjectInput): Promise<Project> {
  const { data } = await apiClient.post<Project>('/api/admin/projects', input);
  return data;
}

/**
 * Admin: Update existing project
 */
export async function updateProjectApi(id: string, input: ProjectInput): Promise<Project> {
  const { data } = await apiClient.put<Project>(`/api/admin/projects/${id}`, input);
  return data;
}

/**
 * Admin: Delete project
 */
export async function deleteProjectApi(id: string): Promise<void> {
  await apiClient.delete(`/api/admin/projects/${id}`);
}

/**
 * Admin: Upload image to Cloudinary via backend
 */
export async function uploadImageApi(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const { data } = await apiClient.post<UploadResponse>('/api/admin/uploads', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return data.url;
}

/**
 * Admin: Login
 */
export async function adminLoginApi(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await apiClient.post<LoginResponse>('/api/admin/login', credentials);
  return data;
}
