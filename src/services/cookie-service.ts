import Cookies from 'js-cookie';
import {Character} from '@/types';

function setCharacterCookie(character: Character) {
  Cookies.set('character', JSON.stringify(character));
}

function getCharacterCookie(): Character {
  const character = Cookies.get('character');

  if (character) {
    return JSON.parse(character);
  } else {
    return {
      name: '',
      race: '',
      traits: {
        strength: 0,
        dexterity: 0,
        relations: 0,
        culture: 0,
        biology: 0,
        engineering: 0,
      },
      skills: [],
      health: 0,
      currentHealth: 0,
      languages: [],
      background: '',
      personality: '',
      picture: '',
    };
  }
}

export default {
  setCharacterCookie,
  getCharacterCookie,
};
