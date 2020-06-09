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
          <h2>Settings</h2>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list>
      <v-list-item
        class="my-3"
      >
        <v-list-item-content>
          <v-list-item-title>
            <h3>Primary</h3>
          </v-list-item-title>
          <v-color-picker
            v-model="$vuetify.theme.themes.light.primary"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="my-3"
      >
        <v-list-item-content>
          <v-list-item-title>
            <h3>Secondary</h3>
          </v-list-item-title>
          <v-color-picker
            v-model="$vuetify.theme.themes.light.secondary"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="my-3"
      >
        <v-list-item-content>
          <v-list-item-title>
            <h3>Primary</h3>
          </v-list-item-title>
          <v-color-picker
            v-model="$vuetify.theme.themes.light.primary"
          />
        </v-list-item-content>
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
