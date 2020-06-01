<template>
  <v-card flat>
    <v-card-title>Notes</v-card-title>
    <v-card-subtitle class="text-left">
      For the stuff that needs remembering. <strong>To save, click the button at the bottom right.</strong>
    </v-card-subtitle>
    <v-card-text>
      <v-textarea
        v-model="notes"
        @change="save()"
      />
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn @click="save()">
        Save notes
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import CookieService from '../services/cookie-service';

@Component
export default class CampaignNotes extends Vue {
  notes = '';

  created() {
    this.notes = this.$store.state.notes;
  }

  save() {
    console.log(`#save: triggered`);
    this.$store.commit('setCampaignNotes', this.notes);
    CookieService.setCampaignNotesCookie(this.notes);
  }
}
</script>

<style lang="scss" scoped>
</style>
