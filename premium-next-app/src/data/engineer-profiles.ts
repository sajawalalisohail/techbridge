export interface EngineerProfile {
  slug: string;
  name: string;
  role: string;
  experience: string;
  summary: string;
  highlights: string[];
  stackClusters: string[];
}

export const RAMISH_PROFILE: EngineerProfile = {
  slug: "ramish-r",
  name: "Ramish R",
  role: "Senior AI Engineer",
  experience: "6 years",
  summary:
    "Designed, deployed, and scaled production AI systems across computer vision, analytics, and automation engagements.",
  highlights: [
    "Production AI systems for business workflows, analytics, and automation",
    "Retrieval pipelines, LLM systems, and context-aware application design",
    "Backend and platform engineering that holds up beyond the demo phase",
  ],
  stackClusters: [
    "Python / TypeScript / SQL",
    "LLMs / RAG / NLP / Transformers",
    "Node.js / Next.js / APIs / Microservices",
    "Docker / MLOps / serverless GPU deployment",
    "GCP / Runpod / Replicate / PostgreSQL",
  ],
} as const;
