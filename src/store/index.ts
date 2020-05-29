import Vue from 'vue';
import Vuex from 'vuex';
import {Character} from '../types';

Vue.use(Vuex);

const character: Character = {
  name: '',
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

export default new Vuex.Store({
  state: {
    character,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  },
});
