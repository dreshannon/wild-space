<template>
  <v-card
    loading="true"
  >
    <v-card-text>
      Logging out
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import fb from '../firebaseConfig';

@Component
export default class Logout extends Vue {
  created() {
    this.logout();
  }

  logout() {
    fb.auth.signOut()
      .then(() => {
        this.$store.dispatch('clearData');
        this.$router.push('/login');
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
