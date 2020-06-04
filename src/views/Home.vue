<template>
  <v-row>
    <v-col
      cols="4"
      xl="4"
      lg="5"
      sm="6"
    >
      <campaign-tracker />
    </v-col>
    <v-col
      cols="8"
      xl="8"
      lg="7"
      sm="6"
    >
      <character-sheet :character="character" />
    </v-col>
    <v-col>
      <campaign-notes />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Character, Campaign} from '../types';
import CampaignTracker from '../components/CampaignTracker.vue';
import CharacterSheet from '../components/CharacterSheet.vue';
import CampaignNotes from '../components/CampaignNotes.vue';

@Component({
  components: {
    CampaignTracker,
    CharacterSheet,
    CampaignNotes,
  },
})
export default class Home extends Vue {
  campaign: Campaign = {
    name: '',
    events: [],
    notes: '',
  };
  character: Character = {
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

  async mounted() {
    this.campaign = this.$store.state.campaign;
    this.character = this.$store.state.character;
  }
}
</script>
