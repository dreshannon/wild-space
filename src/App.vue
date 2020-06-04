<template>
  <v-app id="app">
    <v-app-bar
      app
    >
      <router-link
        to="/"
      >
        <v-toolbar-title>Wild Space</v-toolbar-title>
      </router-link>
      <v-spacer />
      <router-link
        to="/logout"
      >
        Logout
      </router-link>
    </v-app-bar>
    <v-content>
      <v-container>
        <router-view id="content" />
      </v-container>
    </v-content>
  </v-app>
</template>

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
</style>
