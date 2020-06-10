<template>
  <v-navigation-drawer
    v-model="showSettingsDrawer"
    temporary
    width="454"
    right
    app
  >
    <v-list-item class="primary">
      <v-list-item-content>
        <v-list-item-title class="headerText--text">
          <h2>Settings</h2>
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-divider />
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-title>
          Organization
        </v-list-item-title>
      </template>
      <v-list-group sub-group>
        <template v-slot:activator>
          <v-list-item-title>
            Campaign Tracker
          </v-list-item-title>
        </template>
        <v-list-item>
          <v-select
            v-model="organizationSettings.campaignTracker.size"
            label="Size"
            light
            :items="sizes"
            @change="saveOrganization"
          />
          <v-list-item-subtitle>Only works on larger screen sizes.</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-select
            v-model="organizationSettings.campaignTracker.position"
            label="Position"
            :items="positions"
            @change="saveOrganization"
          />
        </v-list-item>
      </v-list-group>
      <v-list-group sub-group>
        <template v-slot:activator>
          <v-list-item-title>
            Character Sheet
          </v-list-item-title>
        </template>
        <v-list-item>
          <v-select
            v-model="organizationSettings.characterSheet.size"
            label="Size"
            :items="sizes"
            @change="saveOrganization"
          />
          <v-list-item-subtitle>Only works on larger screen sizes.</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-select
            v-model="organizationSettings.characterSheet.position"
            label="Position"
            :items="positions"
            @change="saveOrganization"
          />
        </v-list-item>
      </v-list-group>
      <v-list-group sub-group>
        <template v-slot:activator>
          <v-list-item-title>
            Notes
          </v-list-item-title>
        </template>
        <v-list-item>
          <v-select
            v-model="organizationSettings.notes.size"
            label="Size"
            :items="sizes"
            @change="saveOrganization"
          />
          <v-list-item-subtitle>Only works on larger screen sizes.</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-select
            v-model="organizationSettings.notes.position"
            label="Position"
            :items="positions"
            @change="saveOrganization"
          />
        </v-list-item>
      </v-list-group>
      <v-list-item>
        <v-btn
          color="error"
          block
          @click="resetOrganization"
        >
          Reset Organization
        </v-btn>
      </v-list-item>
    </v-list-group>
    <v-list-group>
      <template v-slot:activator>
        <v-list-item-title>
          Colors
        </v-list-item-title>
      </template>
      <v-list-item
        class="my-3"
      >
        <v-list-item-content>
          <v-list-item-title>
            <h3>Primary</h3>
          </v-list-item-title>
          <v-color-picker
            v-model="$vuetify.theme.themes.light.primary"
            @update:color="saveTheme"
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
            @update:color="saveTheme"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="my-3"
      >
        <v-list-item-content>
          <v-list-item-title>
            <h3>Background</h3>
          </v-list-item-title>
          <v-color-picker
            v-model="$vuetify.theme.themes.light.background"
            @update:color="saveTheme"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="my-3"
      >
        <v-list-item-content>
          <v-list-item-title>
            <h3>Header Text</h3>
          </v-list-item-title>
          <v-color-picker
            v-model="$vuetify.theme.themes.light.headerText"
            @update:color="saveTheme"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="my-3"
      >
        <v-list-item-content>
          <v-list-item-title>
            <h3>Body Text</h3>
          </v-list-item-title>
          <v-color-picker
            v-model="$vuetify.theme.themes.light.bodyText"
            @update:color="saveTheme"
          />
        </v-list-item-content>
      </v-list-item>
      <v-list-item
        class="my-3"
      >
        <v-list-item-content>
          <v-btn
            color="error"
            block
            @click="resetTheme"
          >
            Reset Colors
          </v-btn>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import SettingsService from '../services/settings-service';

@Component
export default class SettingsDrawer extends Vue {
  @Prop() showSettings!: boolean;
  @Prop() toggleSettings!: any;

  get showSettingsDrawer(): boolean {
    return this.showSettings;
  }

  set showSettingsDrawer(show: boolean) {
    this.toggleSettings(show);
  }

  get organizationSettings() {
    return this.$store.state.organizationSettings;
  }

  sizes = [
    {
      text: 'Third',
      value: 4,
    },
    {
      text: 'Half',
      value: 6,
    },
    {
      text: 'Two thirds',
      value: 8,
    },
    {
      text: 'Full',
      value: 12,
    },
  ]

  positions = [1, 2, 3];

  saveOrganization() {
    SettingsService.setOrganization(this.organizationSettings);
  }

  saveTheme() {
    SettingsService.setTheme({
      primary: this.$vuetify.theme.themes.light.primary,
      secondary: this.$vuetify.theme.themes.light.secondary,
      background: this.$vuetify.theme.themes.light.background,
      headerText: this.$vuetify.theme.themes.light.headerText,
      bodyText: this.$vuetify.theme.themes.light.bodyText,
      accent: '#560D55',
      error: '#960200',
      info: '#8C8CF2',
      success: '#DDABF8',
      warning: '#A66102',
    });
  }

  resetOrganization() {
    SettingsService.resetOrganization();
    this.$store.dispatch('fetchOrganizationSettings');
  }

  resetTheme() {
    SettingsService.resetTheme();
    this.$vuetify.theme.themes.light = SettingsService.getTheme();
  }
}
</script>

<style lang="scss" scoped>
</style>
