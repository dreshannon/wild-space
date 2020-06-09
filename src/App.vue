<template>
  <v-app id="app">
    <navigation
      :toggle-settings="toggleSettings"
    />
    <v-content>
      <v-container>
        <router-view id="content" />
      </v-container>
    </v-content>
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
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Navigation from './components/Navigation.vue';

@Component({
  components: {
    Navigation,
  },
})
export default class App extends Vue {
  showSettings = false;

  toggleSettings() {
    this.showSettings = !this.showSettings;
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.description {
  white-space: pre-line;
}

.v-content {
  background-color: #fefffe;
}
</style>
