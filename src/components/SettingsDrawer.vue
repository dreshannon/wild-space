<template>
  <v-navigation-drawer
    v-model="showSettings"
    temporary
    width="auto"
    absolute
    right
  >
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          Settings
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list>
      <v-list-item>
        <v-list-content>
          <v-color-picker />
        </v-list-content>
      </v-list-item>
      <v-list-item>
        <v-list-content>
          <v-color-picker />
        </v-list-content>
      </v-list-item>
      <v-list-item>
        <v-list-content>
          <v-color-picker />
        </v-list-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component
export default class SettingsDrawer extends Vue {
  @Prop() showSettings!: boolean;
}
</script>

<style lang="scss" scoped>
</style>
