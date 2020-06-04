import Vue from 'vue';
import Vuex from 'vuex';
import CookieService from '../services/cookie-service';
import {Event, Campaign, Character} from '@/types';
import fb from '../firebaseConfig';

Vue.use(Vuex);

const currentUser: any | null = null;
const campaign: Campaign = {
  name: 'Wild Space',
  events: [],
  notes: '',
};
const character: Character = {
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
  inventory: '',
  background: '',
  personality: '',
  picture: '',
};

export const store = new Vuex.Store({
  state: {
    currentUser,
    userProfile: {},
    campaign,
    character,
    notes: CookieService.getCampaignNotes(),
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      console.log(`#setUserProfile:\nuser: ${val}`);
      state.userProfile = val;
    },
    setCampaign(state, val) {
      state.campaign = val;
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
    clearData({commit}) {
      commit('setCurrentUser', null);
      commit('setUserProfile', {});
    },
    fetchUserProfile({commit, state}) {
      fb.usersCollection.doc(state.currentUser.uid).get()
        .then((res) => {
          commit('setUserProfile', res.data());
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchCampaign({commit, state}) {
      fb.campaignsCollection.doc(state.currentUser.uid).onSnapshot((querySnapshot) => {
        commit('setCampaign', querySnapshot.data());
      });
    },
  },
  modules: {
  },
});

fb.auth.onAuthStateChanged((user: any) => {
  if (user) {
    store.commit('setCurrentUser', user);
    store.dispatch('fetchCampaign');
  }
});
