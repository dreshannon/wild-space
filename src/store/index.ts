import Vue from 'vue';
import Vuex from 'vuex';
import CookieService from '../services/cookie-service';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    character: CookieService.getCharacterCookie(),
  },
  mutations: {
    setCharacterRace(state, race: string) {
      state.character.race = race;
    },
    setCharacterName(state, name: string) {
      state.character.name = name;
    },
    setCharacterTraits(state, traits) {
      state.character.traits = traits;
    },
    setCharacterHealth(state, health: number) {
      state.character.health = health;
    },
    setCharacterCurrentHealth(state, health: number) {
      state.character.currentHealth = health;
    },
    setCharacterSkills(state, skills) {
      state.character.skills = skills;
    },
    setCharacterLanguages(state, languages: string[]) {
      state.character.languages = languages;
    },
    setCharacterPersonality(state, personality: string) {
      state.character.personality = personality;
    },
    setCharacterBackground(state, background) {
      state.character.background = background;
    },
  },
  actions: {
  },
  modules: {
  },
});
