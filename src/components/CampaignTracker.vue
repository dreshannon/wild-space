<template>
  <v-card flat>
    <v-card-title>{{ campaign.name }}</v-card-title>
    <v-timeline align-top>
      <v-timeline-item>
        <v-card>
          <v-card-title>Timeline item</v-card-title>
          <v-card-text class="text-left">
            Timeline item description
          </v-card-text>
        </v-card>
      </v-timeline-item>
      <v-timeline-item
        v-for="(event, index) in campaign.events"
        :key="'event-' + index"
      >
        <v-card>
          <v-card-title class="d-flex justify-space-between">
            {{ event.title }}
            <v-btn
              icon
              @click="deleteEventFromCampaign(index)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-card-text class="text-left description">
            {{ event.description }}
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-bottom-sheet v-model="showNewEventForm">
      <template v-slot:activator="{ on }">
        <v-btn
          fab
          color="pink"
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-sheet class="pa-5">
        <v-form @submit.prevent="addEventToCampaign()">
          <v-text-field
            v-model="newEvent.title"
            label="Title"
          />
          <v-textarea
            v-model="newEvent.description"
            label="Description"
          />
          <v-btn @click="addEventToCampaign()">
            Add
          </v-btn>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {Campaign, Event} from '../types';
import CookieService from '../services/cookie-service';

@Component
export default class CampaignTracker extends Vue {
  @Prop() campaign!: Campaign;

  showNewEventForm = false;

  newEvent: Event = {
    title: '',
    description: '',
  };

  addEventToCampaign() {
    if (this.newEvent.title) {
      this.campaign.events.push({
        title: this.newEvent.title,
        description: this.newEvent.description,
      });
      this.$store.commit('setCampaignEvents', this.campaign.events);
      this.newEvent.title = '';
      this.newEvent.description = '';
      this.showNewEventForm = false;
      CookieService.setCampaignCookie(this.campaign);
    }
  }

  deleteEventFromCampaign(index: number) {
    this.campaign.events.splice(index, 1);
    this.$store.commit('setCampaignEvents', this.campaign.events);
    CookieService.setCampaignCookie(this.campaign);
  }
}
</script>

<style lang="scss" scoped>
</style>
