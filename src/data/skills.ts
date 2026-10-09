import type { PowerGroup } from '../types/portfolio';

export const powerGroups: PowerGroup[] = [
{
  id: 'frontcraft',
  label: 'Front-of-house craft',
  powers: [
  { id: 'ts', name: 'TypeScript', level: 95, detail: 'Strict mode, generics, type-level guardrails', color: 'red' },
  { id: 'react', name: 'React', level: 93, detail: 'Concurrent rendering, virtualization, a11y', color: 'red' },
  { id: 'css', name: 'CSS & motion', level: 88, detail: 'Tailwind, layout systems, framer-motion', color: 'yellow' }]

},
{
  id: 'backline',
  label: 'Back line',
  powers: [
  { id: 'node', name: 'Node & Go', level: 86, detail: 'Streaming APIs, workers, queue design', color: 'blue' },
  { id: 'sql', name: 'Postgres', level: 84, detail: 'Query plans, partitioning, migrations at scale', color: 'blue' },
  { id: 'infra', name: 'Infra & CI', level: 78, detail: 'Terraform, containers, blue/green deploys', color: 'teal' }]

},
{
  id: 'instincts',
  label: 'Instincts',
  powers: [
  { id: 'perf', name: 'Performance forensics', level: 91, detail: 'Flame graphs, budgets, regression gates', color: 'yellow' },
  { id: 'design', name: 'Product design sense', level: 82, detail: 'Flows, states, writing the copy too', color: 'red' },
  { id: 'mentor', name: 'Mentoring', level: 87, detail: 'Reviews that teach, docs people reread', color: 'teal' }]

}];