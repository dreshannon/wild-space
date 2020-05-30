<template>
  <v-row>
    <v-col
      cols="4"
      xl="4"
      lg="5"
      sm="6"
    >
      <campaign-tracker :campaign="campaign" />
    </v-col>
    <v-col
      cols="8"
      xl="8"
      lg="7"
      sm="6"
    >
      <character-sheet :character="character" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Character, Campaign} from '../types';
import CampaignTracker from '../components/CampaignTracker.vue';
import CharacterSheet from '../components/CharacterSheet.vue';

@Component({
  components: {
    CampaignTracker,
    CharacterSheet,
  },
})
export default class Home extends Vue {
  campaign: Campaign | undefined = undefined;
  character: Character | undefined = undefined;

  created() {
    this.character = this.$store.state.character;
    this.campaign = this.$store.state.campaign;
  }
}
</script>
