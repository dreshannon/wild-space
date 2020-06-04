import Vue from 'vue';
import Vuex from 'vuex';
import {Campaign, Character} from '@/types';
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
  currency: 0,
  inspiration: false,
};

export const store = new Vuex.Store({
  state: {
    currentUser,
    userProfile: {},
    campaign,
    character,
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
    setCharacter(state, val) {
      state.character = val;
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
            currency: 0,
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
    fb.usersCollection.doc(user.uid).onSnapshot((doc) => {
      if (doc.data()) {
        store.commit('setUserProfile', doc.data());
      }
    });
  }
});
