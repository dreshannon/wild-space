<template>
  <v-row>
    <v-col cols="4">
      <campaign-tracker />
    </v-col>
    <v-col cols="8">
      <character-sheet :character="character" />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Character} from '../types';
import CampaignTracker from '../components/CampaignTracker.vue';
import CharacterSheet from '../components/CharacterSheet.vue';

@Component({
  components: {
    CampaignTracker,
    CharacterSheet,
  },
})
export default class Home extends Vue {
  character: Character | undefined = undefined;

  created() {
    this.character = this.$store.state.character;
  }
}
</script>
