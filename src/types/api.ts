import type { ProjectCategory, ProjectMetric, ProjectStatus } from './portfolio';

export interface ProjectInput {
  title: string;
  tagline: string;
  year: string;
  category: ProjectCategory;
  status: ProjectStatus;
  featured?: boolean;
  image?: string;
  imageAlt?: string;
  description: string;
  role: string;
  stack: string[];
  metrics: ProjectMetric[];
  liveUrl?: string;
  codeUrl?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  expiresAt: string;
}

export interface UploadResponse {
  url: string;
}

export interface ApiError {
  error: string;
}

export interface ApiValidationError {
  errors: Record<string, string>;
}
