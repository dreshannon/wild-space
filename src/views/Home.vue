<template>
  <v-row>
    <v-col
      :order="organizationSettings.campaignTracker.position"
      cols="4"
      :lg="organizationSettings.campaignTracker.size"
      sm="12"
    >
      <campaign-tracker />
    </v-col>
    <v-col
      :order="organizationSettings.characterSheet.position"
      cols="8"
      :lg="organizationSettings.characterSheet.size"
      sm="12"
    >
      <character-sheet />
    </v-col>
    <v-col
      :order="organizationSettings.notes.position"
      :lg="organizationSettings.notes.size"
      sm="12"
    >
      <campaign-notes />
    </v-col>
    <v-col
      :order="organizationSettings.characterNotes.position"
      :lg="organizationSettings.characterNotes.size"
      sm="12"
    >
      <character-notes />
    </v-col>
  </v-row>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CampaignTracker from '@/components/CampaignTracker.vue';
import CharacterSheet from '@/components/CharacterSheet.vue';
import CampaignNotes from '@/components/CampaignNotes.vue';
import CharacterNotes from '@/components/CharacterNotes.vue';
import PartyDisplay from '@/components/PartyDisplay.vue';

@Component({
  components: {
    CampaignTracker,
    CharacterSheet,
    CampaignNotes,
    CharacterNotes,
    PartyDisplay,
  },
})
export default class Home extends Vue {
  get organizationSettings() {
    return this.$store.state.organizationSettings;
  }
}
</script>
