export interface Campaign {
  name: string;
  events: Event[];
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
  background: string;
  personality: string;
  picture: string;
}

export interface Skill {
  name: string;
  description: string;
  trait: string;
}
