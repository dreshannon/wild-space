<template>
  <v-card flat>
    <v-card-title>Campaign Tracker</v-card-title>
    <v-card-subtitle class="text-left">
      Click the plus button to add a campaign event to the timeline. <strong>Click an event to edit</strong>.
    </v-card-subtitle>
    <v-timeline
      v-if="campaign.events"
      align-top
    >
      <v-timeline-item
        v-for="(event, index) in campaign.events"
        :key="'event-' + index + '-' + event.title"
      >
        <v-card
          @click="editEvent(event, index)"
        >
          <v-card-title>
            {{ event.title }}
          </v-card-title>
          <v-card-text class="text-left description">
            {{ event.description }}
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
    <v-bottom-sheet v-model="showNewEventForm">
      <template v-slot:activator="{ on }">
        <div class="text-center">
          <v-btn
            fab
            color="pink"
            v-on="on"
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </div>
      </template>
      <v-sheet class="pa-5">
        <v-form @submit.prevent="addEvent()">
          <v-text-field
            v-model="newEvent.title"
            label="Title"
          />
          <v-textarea
            v-model="newEvent.description"
            label="Description"
          />
          <div class="d-flex justify-end">
            <v-btn @click="addEvent()">
              Add
            </v-btn>
          </div>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="showEditEventForm">
      <v-sheet class="pa-5">
        <v-form
          v-if="activeEvent"
          @submit.prevent="saveEditedEvent()"
        >
          <v-text-field
            v-model="activeEvent.title"
            label="Title"
          />
          <v-textarea
            v-model="activeEvent.description"
            label="Description"
          />
          <div class="d-flex justify-space-between">
            <v-btn @click="deleteEvent()">
              Delete
            </v-btn>
            <v-btn @click="saveEditedEvent()">
              Save
            </v-btn>
          </div>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Campaign, Event} from '../types';
import fb from '../firebaseConfig';

@Component
export default class CampaignTracker extends Vue {
  get campaign(): Campaign {
    return this.$store.state.campaign;
  }

  showNewEventForm = false;
  showEditEventForm = false;

  newEvent: Event = {
    title: '',
    description: '',
  };
  activeEvent: Event = {
    title: '',
    description: '',
  };
  activeEventIndex: number | undefined = undefined;

  editEvent(event: Event, index: number) {
    this.activeEvent = event;
    this.showEditEventForm = true;
    this.activeEventIndex = index;
  }

  saveEditedEvent() {
    const campaign = this.campaign;
    fb.campaignsCollection.doc(this.$store.state.currentUser.uid).set({
      name: 'Wild Space',
      events: campaign.events,
      notes: campaign.notes,
    });
    this.showEditEventForm = false;
  }

  addEvent() {
    if (this.newEvent.title) {
      const campaign = this.campaign;
      campaign.events.push({
        title: this.newEvent.title,
        description: this.newEvent.description,
      });
      fb.campaignsCollection.doc(this.$store.state.currentUser.uid).set({
        name: 'Wild Space',
        events: campaign.events,
        notes: campaign.notes,
      });
      this.newEvent.title = '';
      this.newEvent.description = '';
      this.showNewEventForm = false;
    }
  }

  deleteEvent() {
    if (this.activeEventIndex) {
      const campaign = this.campaign;
      campaign.events.splice(this.activeEventIndex, 1);
      fb.campaignsCollection.doc(this.$store.state.currentUser.uid).set({
        name: 'Wild Space',
        events: campaign.events,
        notes: campaign.notes,
      });
      this.showEditEventForm = false;
      this.activeEvent = {
        title: '',
        description: '',
      };
      this.activeEventIndex = undefined;
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
