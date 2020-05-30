import Cookies from 'js-cookie';
import {Character, Campaign} from '@/types';

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

function setCampaignCookie(campaign: Campaign) {
  Cookies.set('campaign', JSON.stringify(campaign));
}

function getCampaignCookie(): Campaign {
  const campaign = Cookies.get('campaign');

  if (campaign) {
    return JSON.parse(campaign);
  } else {
    return {
      name: 'Wild Space',
      events: [],
    };
  }
}

export default {
  setCharacterCookie,
  getCharacterCookie,
  setCampaignCookie,
  getCampaignCookie,
};
