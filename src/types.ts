export interface Campaign {
  name: string;
  events: Event[];
  notes: string;
}

export interface Event {
  title: string;
  description: string;
}

export interface Character {
  name: string;
  race: string;
  traits: {
    strength: number;
    dexterity: number;
    relations: number;
    culture: number;
    biology: number;
    engineering: number;
    [key: string]: number;
  };
  skills: Skill[];
  health: number;
  currentHealth: number;
  languages: string[];
  inventory: string;
  background: string;
  personality: string;
  picture: string;
  currency: Currency;
  inspiration: boolean;
}

export interface Skill {
  name: string;
  description: string;
  trait: string;
}

interface Currency {
  imperialAurei: number;
  federalDollars: number;
  republicCredits: number;
}

export interface OrganizationSettings {
  campaignTracker: {
    size: number;
    position: number;
  };
  characterSheet: {
    size: number;
    position: number;
  };
  notes: {
    size: number;
    position: number;
  };
  party: {
    size: number;
    position: number;
  };
}

export interface User {
  name: string;
  role: string;
}

export interface CharacterNote {
  name: string;
  picture: string;
  notes: string;
  tags: string[];
}
