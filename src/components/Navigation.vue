<template>
  <v-app-bar app>
    <router-link to="/">
      Wild Space
    </router-link>
    <v-spacer />
    <a
      class="mr-5"
      @click="showAccountModal = true"
    >
      Account
    </a>
    <router-link to="/logout">
      Logout
    </router-link>
    <v-dialog
      v-model="showAccountModal"
      max-width="290"
    >
      <v-card>
        <v-card-title>Account</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="userProfile.name"
            label="Name"
          />
          <v-select
            v-model="userProfile.role"
            label="Role"
            :items="roles"
          />
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            @click="saveUser()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app-bar>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import fb from '../firebaseConfig';

@Component
export default class Navigation extends Vue {
  get userProfile() {
    return this.$store.state.userProfile;
  }

  roles = ['Player', 'Game Master'];
  showAccountModal = false;

  created() {
    if (!this.userProfile.role) {
      fb.usersCollection.doc(this.$store.state.currentUser.uid).set({
        name: this.userProfile.name,
        role: 'Player',
      });
    }
  }

  saveUser() {
    fb.usersCollection.doc(this.$store.state.currentUser.uid).set({
      name: this.userProfile.name,
      role: this.userProfile.role,
    });
    this.showAccountModal = false;
  }
}
</script>

<style lang="scss" scoped>
a {
  color: #53208a !important;
  text-decoration: none;
}
</style>
