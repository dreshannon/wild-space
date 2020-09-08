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
          Account
        </v-list-item-title>
      </template>
      <v-list-item>
        <v-text-field
          v-model="userProfile.name"
          label="Name"
        />
      </v-list-item>
      <v-list-item>
        <v-select
          v-model="userProfile.role"
          label="Role"
          :items="roles"
        />
      </v-list-item>
      <v-list-item class="justify-end">
        <v-btn
          color="secondary"
          @click="saveUser"
        >
          Save
        </v-btn>
      </v-list-item>
    </v-list-group>
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
      <v-list-group sub-group>
        <template v-slot:activator>
          <v-list-item-title>
            Characters
          </v-list-item-title>
        </template>
        <v-list-item>
          <v-select
            v-model="organizationSettings.characterNotes.size"
            label="Size"
            :items="sizes"
            @change="saveOrganization"
          />
          <v-list-item-subtitle>Only works on larger screen sizes.</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-select
            v-model="organizationSettings.characterNotes.position"
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
            v-model="themeSettings.primary"
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
            v-model="themeSettings.secondary"
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
            v-model="themeSettings.background"
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
            v-model="themeSettings.headerText"
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
            v-model="themeSettings.bodyText"
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
    <v-snackbar
      v-model="snackbarSettings.show"
      :color="snackbarSettings.color"
      :timeout="snackbarSettings.timout"
    >
      <div class="headerText--text">
        {{ snackbarSettings.message }}
      </div>
    </v-snackbar>
  </v-navigation-drawer>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import SettingsService from '../services/settings-service';
import {User} from '@/types';
import fb from '@/firebaseConfig';

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

  get themeSettings() {
    return this.$store.state.theme;
  }

  get userProfile() {
    return this.$store.state.userProfile;
  }

  snackbarSettings = {
    show: false,
    timeout: 2000,
    message: '',
    color: 'primary',
  };

  roles = ['Player', 'Game Master'];

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

  positions = [1, 2, 3, 4, 5];

  saveUser() {
    const user: User = {
      name: this.userProfile.name,
      role: this.userProfile.role,
    };

    try {
      SettingsService.saveUser(this.$store.state.currentUser.uid, user);
      this.snackbarSettings.show = true;
      this.snackbarSettings.message = 'Account changes saved';
    } catch (error) {
      console.log(error);
      this.snackbarSettings.color = 'error';
      this.snackbarSettings.message = 'Account changes could not be saved';
      this.snackbarSettings.show = true;
    }
  }

  saveOrganization() {
    fb.settingsCollections.doc(this.$store.state.currentUser.uid).update({
      organization: this.organizationSettings,
    });
  }

  saveTheme() {
    fb.settingsCollections.doc(this.$store.state.currentUser.uid).update({
      theme: this.themeSettings,
    });
    this.$vuetify.theme.themes.light = this.themeSettings;
  }

  resetOrganization() {
    const organization = SettingsService.getDefaultOrganization();
    fb.settingsCollections.doc(this.$store.state.currentUser.uid).update({
      organization: {...organization},
    });
    this.$store.commit('setOrganizationSettings', organization);
  }

  resetTheme() {
    this.$store.commit('updateThemeSettings', SettingsService.getDefaultTheme());
    this.$vuetify.theme.themes.light = SettingsService.getDefaultTheme();
  }
}
</script>

<style lang="scss" scoped>
</style>
