/**
 * Type definitions for the AI portfolio knowledge base (src/data/sugriv.json).
 * The project is JavaScript, so these live in a .d.ts file for editor
 * IntelliSense and future TypeScript migration.
 */

export interface Profile {
  name: string;
  title: string;
  experience: string;
  location: string;
  summary: string;
  availability: string;
  contact: string;
}

export interface WorkExperience {
  company: string;
  role: string;
  duration: string;
}

export interface Project {
  name: string;
  type: string;
  description: string;
  technologies: string[];
  responsibilities: string[];
  link?: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface SkillGroups {
  frontend: string[];
  backend: string[];
  databases: string[];
  cloudAndDevOps: string[];
  integrations: string[];
  ai: string[];
}

export interface GearXExperience {
  name: string;
  role: string;
  duration: string;
  overview: string;
  technologies: string[];
  responsibilities: string[];
  architecture: string[];
  features: string[];
  performance: string[];
  ai: string[];
  challenges: string[];
}

export interface KnowledgeBase {
  version: string;
  lastUpdated: string;
  profile: Profile;
  skills: SkillGroups;
  experience: WorkExperience[];
  gearX?: GearXExperience;
  projects: Project[];
  engineeringHighlights: string[];
  faq: FaqItem[];
}

/**
 * Abstraction over the knowledge source. v1 is JsonKnowledgeProvider
 * (single JSON file injected into the session). A future
 * VectorKnowledgeProvider can implement the same surface
 * (getSystemPrompt/search) without touching the voice UI.
 */
export interface KnowledgeProvider {
  getKnowledge(): KnowledgeBase;
  getSystemPrompt(): string;
}
