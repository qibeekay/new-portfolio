export interface RouteDefinition {
  path: string;
  name: string;
  comicSlug?: string;
  workspaceChannel?: string;
}

export const PORTFOLIO_ROUTES: RouteDefinition[] = [
  { path: '/', name: 'Overview / Cover', comicSlug: 'cover', workspaceChannel: 'intro' },
  { path: '/origin', name: 'Origin Story', comicSlug: 'origin', workspaceChannel: 'origin' },
  { path: '/powers', name: 'Powers & Stack', comicSlug: 'powers', workspaceChannel: 'powers' },
  { path: '/case-files', name: 'Case Files & Projects', comicSlug: 'case-files', workspaceChannel: 'case-files' },
  { path: '/chronicles', name: 'Chronicles & Career', comicSlug: 'chronicles', workspaceChannel: 'chronicles' },
  { path: '/signal', name: 'Send the Signal', comicSlug: 'signal', workspaceChannel: 'signal' },
];
