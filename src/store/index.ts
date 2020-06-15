import Vue from 'vue';
import Vuex from 'vuex';
import {Campaign, Character, OrganizationSettings, CharacterNote} from '@/types';
import fb from '../firebaseConfig';
import SettingsService from '../services/settings-service';

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
  currency: {
    imperialAurei: 0,
    federalDollars: 0,
    republicCredits: 0,
  },
  inspiration: false,
};
const organizationSettings: OrganizationSettings = {
  campaignTracker: {
    size: 4,
    position: 1,
  },
  characterSheet: {
    size: 8,
    position: 2,
  },
  notes: {
    size: 12,
    position: 3,
  },
  characterNotes: {
    size: 12,
    position: 4,
  },
};
const characterNotes: CharacterNote[] = [];

export const store = new Vuex.Store({
  state: {
    currentUser,
    userProfile: {
      name: '',
      role: '',
    },
    campaign,
    character,
    organizationSettings,
    characterNotes: {
      characterNotes,
    },
  },
  getters: {
    tags(state) {
      const tags = new Set();
      state.characterNotes.characterNotes.map((note) => {
        note.tags.map((tag) => {
          tags.add(tag);
        });
      });
      return ['All', ...tags];
    },
    characterNotes(state) {
      return (tag: string) => {
        if (tag == 'All') {
          return state.characterNotes.characterNotes;
        } else {
          return state.characterNotes.characterNotes.filter((note) => {
            return note.tags.includes(tag);
          });
        }
      };
    },
  },
  mutations: {
    setCurrentUser(state, val) {
      state.currentUser = val;
    },
    setUserProfile(state, val) {
      state.userProfile = val;
    },
    setCampaign(state, val) {
      state.campaign = val;
    },
    setCharacter(state, val) {
      state.character = val;
    },
    setOrganizationSettings(state, val) {
      state.organizationSettings = val;
    },
    setCharacterNotes(state, val) {
      state.characterNotes = val;
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
          if (res.data()) {
            commit('setUserProfile', res.data());
          } else {
            commit('setUserProfile', {
              name: '',
              role: '',
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    fetchCampaign({commit, state}) {
      fb.campaignsCollection.doc(state.currentUser.uid).onSnapshot((querySnapshot) => {
        if (querySnapshot.data()) {
          commit('setCampaign', querySnapshot.data());
        } else {
          commit('setCampaign', {
            name: 'Wild Space',
            events: [],
            notes: '',
          });
        }
      });
    },
    fetchCharacter({commit, state}) {
      fb.charactersCollection.doc(state.currentUser.uid).onSnapshot((querySnapshot) => {
        if (querySnapshot.data()) {
          commit('setCharacter', querySnapshot.data());
        } else {
          commit('setCharacter', {
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
            currency: {
              imperialAurei: 0,
              federalDollars: 0,
              republicCredits: 0,
            },
            inspiration: false,
          });
        }
      });
    },
    updateProfile({state}, data) {
      const name = data.name;
      const role = data.role;

      fb.usersCollection.doc(state.currentUser.uid).update({name, role})
        .catch((err) => {
          console.log(err);
        });
    },
    fetchOrganizationSettings({commit}) {
      const settings = SettingsService.getOrganization();
      commit('setOrganizationSettings', settings);
    },
    fetchCharacterNotes({commit, state}) {
      fb.characterNotesCollection.doc(state.currentUser.uid).get()
        .then((res) => {
          if (res.data()) {
            commit('setCharacterNotes', res.data());
          }
        });
    },
  },
  modules: {
  },
});

fb.auth.onAuthStateChanged((user: any) => {
  if (user) {
    store.commit('setCurrentUser', user);
    store.dispatch('fetchUserProfile');
    store.dispatch('fetchCampaign');
    store.dispatch('fetchCharacter');
    store.dispatch('fetchOrganizationSettings');
    store.dispatch('fetchCharacterNotes');
    fb.usersCollection.doc(user.uid).onSnapshot((doc) => {
      if (doc.data()) {
        store.commit('setUserProfile', doc.data());
      }
    });
  }
});
