import Vue from 'vue';
import Vuex from 'vuex';
import CookieService from '../services/cookie-service';
import {Event} from '@/types';
import fb from '../firebaseConfig';

Vue.use(Vuex);

const currentUser: any | null = null;

export default new Vuex.Store({
  state: {
    currentUser,
    userProfile: {},
    campaign: CookieService.getCampaignCookie(),
    character: CookieService.getCharacterCookie(),
    notes: CookieService.getCampaignNotes(),
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCharacterInventory(state, inventory: string) {
      state.character.inventory = inventory;
    },
    setCampaignNotes(state, notes: string) {
      state.notes = notes;
    },
    setCampaignEvents(state, events: Event[]) {
      state.campaign.events = events;
    },
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
    fetchUserProfile({commit, state}) {
      fb.usersCollection.doc(state.currentUser.uid).get()
        .then((res) => {
          commit('setUserProfile', res.data());
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  modules: {
  },
});
