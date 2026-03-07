# TechBridge Premium Website - Project Overview

## 🌐 Objective
This repository contains the codebase for `TechBridge`, a high-end, premium SaaS and AI web development agency. The website serves as a highly interactive, fluid, and visually stunning digital portfolio and marketing portal.

## 🛠 Tech Stack
- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS V4
- **Animations:** Framer Motion, GSAP
- **Smooth Scrolling:** `@studio-freight/react-lenis`
- **3D Graphics & Canvas:** Three.js, React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Video Rendering:** Remotion & `@remotion/player`
- **Icons:** Lucide React

## 📂 Architecture & Directory Structure
The architecture relies heavily on composable modular components tailored for specific aesthetic interactions.
- `src/app/`: The Next.js App Router providing routing for `/`, `/websites` (24-Hr Studio), `/services`, `/about`, `/contact`, and `/work`.
- `src/components/home/`: Dedicated UI chunks mapped to sections of the landing page (`Hero`, `CaseStudies`, `Services`, `TechStackMarquee`).
- `src/components/layout/`: Global persistent layouts like `Navbar` and `Footer`.
- `src/components/remotion/`: Programmatically rendered dynamic video components used to display "Live Examples" without relying on bloated MP4s. Key files include `CaseStudyReel.tsx`.
- `src/3d/`: Advanced React Three Fiber components rendering the global aesthetic environment, including `DarkBackground.tsx`, `InteractiveCamera.tsx`, and `PageParticles.tsx`.

## ✨ Core Design Philosophy
- **Premium Aesthetics:** Dark mode standard. Utilization of glassmorphism (frosted glass), deep space blacks, and vibrant violet/indigo accent glows.
- **Immersive Interactions:** Zero harsh cuts. Modals must lock the body scroll, hide main navigational elements, and smoothly ease in/out.
- **Micro-Animations:** Buttons, cards, and images should have weight. We use Spring physics for interactions rather than linear transitions.
