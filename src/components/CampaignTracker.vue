<template>
  <v-card
    class="background"
    flat
  >
    <v-card-title class="primary headerText--text">
      Campaign Tracker
    </v-card-title>
    <v-card-subtitle
      class="primary headerText--text"
    >
      Click the plus button to add a campaign event to the timeline. <strong>Click an event to edit</strong>.
    </v-card-subtitle>
    <v-timeline
      v-if="campaign.events"
      align-top
    >
      <v-timeline-item
        v-for="(event, index) in campaign.events"
        :key="'event-' + index + '-' + event.title"
        color="primary"
        fill-dot
      >
        <v-card
          color="primary"
          @click="editEvent(event, index)"
        >
          <v-card-title class="primary headerText--text">
            {{ event.title }}
          </v-card-title>
          <v-card-text class="description white bodyText--text pt-3">
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
            color="secondary"
            class="white--text"
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
            <v-btn
              color="secondary"
              class="white--text"
              @click="addEvent()"
            >
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
            <v-btn
              color="error"
              class="white--text"
              @click="deleteEvent()"
            >
              Delete
            </v-btn>
            <v-btn
              color="secondary"
              class="white--text"
              @click="saveEditedEvent()"
            >
              Save
            </v-btn>
          </div>
        </v-form>
      </v-sheet>
    </v-bottom-sheet>
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
  snackbarSettings = {
    show: false,
    timeout: 2000,
    message: '',
    color: 'primary',
  };

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
    })
      .then(() => {
        this.snackbarSettings.message = 'Edited event saved.';
        this.snackbarSettings.color = 'primary';
        this.snackbarSettings.show = true;
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
      })
        .then(() => {
          this.snackbarSettings.message = 'Added new event.';
          this.snackbarSettings.color = 'primary';
          this.snackbarSettings.show = true;
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
      })
        .then(() => {
          this.snackbarSettings.message = 'Deleted event.';
          this.snackbarSettings.color = 'primary';
          this.snackbarSettings.show = true;
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
.v-card {
  background-color: #fefffe;
}
</style>
