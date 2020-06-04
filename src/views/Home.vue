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
      <character-sheet />
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
}
</script>
