<template>
  <div id="login">
    <section>
      <v-form @submit.prevent>
        <v-card>
          <v-card-title>
            Welcome to the Wild Space Campaign Tracker!
          </v-card-title>
          <v-card-text>
              <v-text-field
                label="Email"
                type="email"
                v-model.trim="loginForm.email"
              />
              <v-text-field
                label="Password"
                type="password"
                v-model.trim="loginForm.password"
              />
          </v-card-text>
          <v-card-actions>
            <v-spacer />
            <v-btn>Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </section>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Login extends Vue {
  loginForm = {
    email: '',
    password: '',
  };
}
</script>

<style lang="scss" scoped>
</style>
