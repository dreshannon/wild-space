<template>
  <v-bottom-sheet v-model="showEditEventForm">
    <v-sheet class="pa-5">
      <v-form
        @submit.prevent="save()"
      >
        <v-text-field
          v-model="event.title"
          label="Title"
        />
        <v-textarea
          v-model="event.description"
          label="Description"
        />
        <div class="d-flex justify-end">
          <v-btn @click="save()">
            Save
          </v-btn>
        </div>
      </v-form>
    </v-sheet>
  </v-bottom-sheet>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import {Event} from '../types';

@Component
export default class EditCampaignEventSheet extends Vue {
  @Prop() event!: Event;
  @Prop() save!: any;
}
</script>

<style lang="scss" scoped>
</style>
