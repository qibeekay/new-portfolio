import type { Role } from "../types/portfolio";

export const experience: Role[] = [
  {
    id: "northwind",
    company: "Northwind Studio",
    title: "Senior Frontend Engineer",
    period: "2023 — Now",
    location: "Ibadan· Remote",
    summary:
      "Leading frontend for a 14-person product studio, owning architecture, motion and performance across client builds.",
    highlights: [
      "Built the studio's motion system, now used across 11 client products",
      "Cut median LCP from 3.4s to 1.1s on a flagship e-commerce rebuild",
      "Mentor four engineers and run the weekly craft review",
    ],

    stack: ["React", "TypeScript", "Framer Motion", "Three.js", "Node.js"],
  },
  {
    id: "fieldwork",
    company: "Fieldwork Labs",
    title: "Creative Developer",
    period: "2020 — 2023",
    location: "Berlin",
    summary:
      "Built immersive campaign sites and interactive installations for sportswear, music and culture brands.",
    highlights: [
      "Shipped nine campaign sites, two awarded Awwwards Site of the Day",
      "Wrote the in-house WebGL toolkit for particle and fluid scenes",
      "Prototyped a WebXR try-on experience for a sportswear client",
    ],

    stack: ["Three.js", "GLSL", "GSAP", "WebXR", "Vue"],
  },
  {
    id: "parcel",
    company: "Parcel & Co",
    title: "Full-stack Engineer",
    period: "2018 — 2020",
    location: "Porto",
    summary:
      "Early engineer at a logistics startup, splitting time between the merchant dashboard and the tracking API.",
    highlights: [
      "Designed the shipment tracking API serving 2M requests a day",
      "Built the merchant dashboard in React, from zero to 6k monthly users",
      "Introduced end-to-end tests that cut release regressions by 60%",
    ],

    stack: ["React", "Node.js", "PostgreSQL", "Redis", "AWS"],
  },
  {
    id: "freelance",
    company: "Independent",
    title: "Web Developer",
    period: "2016 — 2018",
    location: "Lisbon",
    summary:
      "Freelance sites for studios, restaurants and musicians — where I learned to ship, invoice and listen.",
    highlights: [
      "Delivered 20+ sites end to end, from design to hosting",
      "Built a booking system still used by three Ibadanrestaurants",
    ],

    stack: ["JavaScript", "PHP", "CSS", "WordPress"],
  },
];
