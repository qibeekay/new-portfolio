import type { Project } from '../types/portfolio';
import type { ProjectInput } from '../types/api';

/**
 * Projects are now fetched dynamically from the Go backend endpoint (/api/projects).
 * Hardcoded mock data has been removed.
 */
export const projects: Project[] = [];

/**
 * Template used to create an initial test project if the backend database is empty.
 */
export const defaultTestProject: ProjectInput = {
  title: 'Hyperion Streaming Engine',
  tagline: 'High-throughput real-time stream processing platform',
  year: '2026',
  category: 'systems',
  status: 'completed',
  featured: true,
  description: 'Engineered an ultra low-latency event processing system capable of processing millions of events per second with microsecond tail latency.',
  role: 'Lead Systems Architect',
  stack: ['Go', 'Raft', 'gRPC', 'Docker'],
  metrics: [
    { value: '2.4M/s', label: 'Throughput' },
    { value: '<1ms', label: 'P99 Latency' },
  ],
  liveUrl: 'https://example.com',
  codeUrl: 'https://github.com/example/hyperion',
};