import type { Category } from "./schema";

/** The 9 sample categories. Slugs are stable URL segments: /resume/samples/{slug}. */
export const categories: Category[] = [
  { slug: "business-administration", name: "Business Administration", blurb: "Office managers, executive assistants, coordinators.", icon: "briefcase", sampleCount: 3 },
  { slug: "operations", name: "Operations", blurb: "Operations, logistics and supply-chain roles.", icon: "settings", sampleCount: 3 },
  { slug: "architecture-engineering", name: "Architecture & Engineering", blurb: "Architects, civil, mechanical and electrical engineers.", icon: "compass", sampleCount: 3 },
  { slug: "cleaning-grounds-maintenance", name: "Cleaning & Grounds Maintenance", blurb: "Custodians, housekeepers, groundskeepers.", icon: "sprout", sampleCount: 3 },
  { slug: "community-human-services", name: "Community & Human Services", blurb: "Social workers, counsellors, case managers.", icon: "heart-handshake", sampleCount: 3 },
  { slug: "construction-extraction", name: "Construction & Extraction", blurb: "Trades, site supervisors, equipment operators.", icon: "hard-hat", sampleCount: 3 },
  { slug: "education-instruction", name: "Education & Instruction", blurb: "Teachers, tutors, instructional designers.", icon: "graduation-cap", sampleCount: 3 },
  { slug: "finance-accounting", name: "Finance & Accounting", blurb: "Accountants, analysts, bookkeepers, controllers.", icon: "calculator", sampleCount: 3 },
  { slug: "food-beverage", name: "Food & Beverage", blurb: "Chefs, servers, baristas, restaurant managers.", icon: "utensils", sampleCount: 3 },
];
