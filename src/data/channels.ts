export interface Channel {
  id: string;
  name: string;
  path: string;
  topic: string;
  members: number;
  badge?: number;
}

export const channels: Channel[] = [
  {
    id: "intro",
    name: "intro",
    path: "/",
    topic: "Start here — who I am and what I build",
    members: 412,
  },
  {
    id: "origin-story",
    name: "origin-story",
    path: "/origin",
    topic: "How a modding forum turned into a career",
    members: 118,
  },
  {
    id: "skills",
    name: "skills",
    path: "/powers",
    topic: "The stack, honestly rated",
    members: 214,
    badge: 3,
  },
  {
    id: "projects",
    name: "projects",
    path: "/case-files",
    topic: "Four builds, what broke, what fixed it",
    members: 309,
    badge: 4,
  },
  {
    id: "experience",
    name: "experience",
    path: "/chronicles",
    topic: "Nine years, four teams",
    members: 96,
  },
  {
    id: "contact",
    name: "contact",
    path: "/signal",
    topic: "Open to staff & lead roles — say hello",
    members: 2,
  },
];

export const workspaceMeta = {
  name: "qibeekay.dev",
  person: "Anugo Mokwe",
  handle: "alex",
  role: "Staff Software Engineer",
  status: "Shipping · Ibadan(CET)",
};
