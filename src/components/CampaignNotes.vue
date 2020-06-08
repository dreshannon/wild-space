<template>
  <v-card flat>
    <v-card-title
      class="white--text"
    >
      Notes
    </v-card-title>
    <v-card-subtitle
      class="white--text"
    >
      For the stuff that needs remembering. <strong>To save, click the button at the bottom right.</strong>
    </v-card-subtitle>
    <v-card-text>
      <v-textarea
        v-model="campaign.notes"
      />
    </v-card-text>
    <v-card-actions class="justify-end">
      <v-btn
        class="white--text"
        color="#53208a"
        @click="save()"
      >
        Save notes
      </v-btn>
    </v-card-actions>
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

  save() {
    const campaign = this.campaign;
    fb.campaignsCollection.doc(this.$store.state.currentUser.uid).set({
      name: 'Wild Space',
      events: campaign.events,
      notes: campaign.notes,
    });
  }
}
</script>

<style lang="scss" scoped>
.v-card__title,
.v-card__subtitle {
  background-color: #210e39;
}
</style>
