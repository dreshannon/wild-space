<template>
  <v-timeline>
    <v-timeline-item>timeline item</v-timeline-item>
    <v-timeline-item class="text-right">
      timeline item
    </v-timeline-item>
    <v-timeline-item>timeline item</v-timeline-item>
  </v-timeline>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class CampaignTracker extends Vue {
}
</script>

<style lang="scss" scoped>
</style>
