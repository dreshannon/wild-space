<template>
  <v-card flat>
    <v-card-title
      class="primary headerText--text"
    >
      Notes
    </v-card-title>
    <v-card-subtitle
      class="primary headerText--text"
    >
      For the stuff that needs remembering. <strong>To save, click the button at the bottom right.</strong>
    </v-card-subtitle>
    <v-card-text>
      <v-textarea
        v-model="campaign.notes"
        color="primary"
      />
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        class="white--text"
        color="secondary"
        @click="save()"
      >
        Save notes
      </v-btn>
    </v-card-actions>
    <v-snackbar
      v-model="snackbarSettings.show"
      :color="snackbarSettings.color"
      :timeout="snackbarSettings.timout"
    >
      <div class="headerText--text">
        {{ snackbarSettings.message }}
      </div>
    </v-snackbar>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Campaign} from '../types';
import fb from '../firebaseConfig';

@Component
export default class CampaignNotes extends Vue {
  get campaign(): Campaign {
    return this.$store.state.campaign;
  }

  snackbarSettings = {
    show: false,
    timeout: 2000,
    message: '',
    color: 'primary',
  };

  save() {
    const campaign = this.campaign;
    fb.campaignsCollection.doc(this.$store.state.currentUser.uid).set({
      name: 'Wild Space',
      events: campaign.events,
      notes: campaign.notes,
    })
      .then(() => {
        this.snackbarSettings.message = 'Notes saved.';
        this.snackbarSettings.color = 'primary';
        this.snackbarSettings.show = true;
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
