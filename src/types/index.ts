export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  venueType: "conference" | "journal";
  year: number;
  abstract?: string;
  doi?: string;
  url?: string;
  tags: string[];
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string[];
  skills?: string[];
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  institution: string;
  startDate: string;
  endDate: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface NavItem {
  label: string;
  href: string;
}
