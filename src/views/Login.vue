<template>
  <div id="login">
    <v-form
      v-if="showLoginForm"
      @submit.prevent="login()"
    >
      <v-card>
        <v-card-title>
          Welcome to the Wild Space Campaign Tracker!
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model.trim="loginForm.email"
            label="Email"
            type="email"
          />
          <v-text-field
            v-model.trim="loginForm.password"
            label="Password"
            type="password"
          />
        </v-card-text>
        <v-card-actions>
          <a @click="showLoginForm = false">
            Create an Account
          </a>
          <v-spacer />
          <v-btn
            @click="login()"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
    <v-form
      v-else
    >
      <v-card>
        <v-card-title>Welcome to Wild Space Campaign Tracker!</v-card-title>
        <v-card-subtitle>Please fill in the information below to get started.</v-card-subtitle>
        <v-card-text>
          <v-text-field
            v-model.trim="signupForm.name"
            label="Name"
          />
          <v-text-field
            v-model.trim="signupForm.email"
            type="email"
            label="Email"
          />
          <v-text-field
            v-model.trim="signupForm.passwaord"
            type="password"
            label="Password"
          />
        </v-card-text>
        <v-card-actions>
          <a @click="showLoginForm = true">
            Already have an account?
          </a>
          <v-spacer />
          <v-btn
            @click="signup()"
          >
            Signup
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import fb from '../firebaseConfig';

@Component
export default class Login extends Vue {
  showLoginForm = true;
  loginForm = {
    email: '',
    password: '',
  };
  signupForm = {
    name: '',
    email: '',
    passwaord: '',
  };

  login() {
    fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
      .then((user: any) => {
        this.$store.commit('setCurrentUser', user.user);
        this.$store.dispatch('fetchUserProfile');
        this.$router.push('/home');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  signup() {
    fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.passwaord)
      .then((user: any) => {
        this.$store.commit('setCurrentUser', user);

        fb.usersCollection.doc(user.uid).set({
          name: this.signupForm.name,
        })
          .then(() => {
            this.$store.dispatch('fetchUserProfile');
            this.$router.push('/');
          })
          .catch((err) => {
            console.log(err);
          });
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
