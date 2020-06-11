<template>
  <v-app-bar
    app
    color="background"
  >
    <v-toolbar-title class="secondary--text">
      Wild Space
    </v-toolbar-title>
    <v-spacer />
    <v-btn
      class="mx-1"
      color="secondary"
      text
      @click="toggleSettings"
    >
      <v-icon>mdi-cog</v-icon> Settings
    </v-btn>
    <v-btn
      class="mx-1"
      color="secondary"
      text
      to="logout"
    >
      <v-icon>mdi-logout</v-icon> Logout
    </v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class Navigation extends Vue {
  @Prop() toggleSettings!: any;

  get userProfile() {
    return this.$store.state.userProfile;
  }

  roles = ['Player', 'Game Master'];
  showAccountModal = false;
  showSettingsDrawer = false;
}
</script>

<style lang="scss" scoped>
a {
  color: #53208a !important;
  text-decoration: none;
}
</style>
