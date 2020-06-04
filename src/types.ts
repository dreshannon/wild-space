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
  currency: number;
  inspiration: boolean;
}

export interface Skill {
  name: string;
  description: string;
  trait: string;
}
