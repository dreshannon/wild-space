<template>
  <div id="login">
    <v-form
      v-if="showLoginForm"
      @submit.prevent="login()"
    >
      <v-card
        :loading="performingRequest"
      >
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
      <v-card
        :loading="performingRequest"
      >
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
        <v-card-text
          v-if="errorMsg"
        >
          {{ errorMsg }}
        </v-card-text>
      </v-card>
    </v-form>
    <v-dialog v-model="togglePasswordReset">
      <v-form
        v-if="!passwordResetSuccess"
        @submit.prevent="resetPassword()"
      >
        <v-card
          :loading="performingRequest"
        >
          <v-card-title>Forgot Password</v-card-title>
          <v-card-text>
            <v-text-field
              v-model="passwordForm.email"
              label="Email"
              type="email"
            />
          </v-card-text>
          <v-card-action>
            <v-spacer />
            <v-btn
              @click="resetPassword()"
            >
              Reset
            </v-btn>
          </v-card-action>
        </v-card>
      </v-form>
      <transition name="fade">
        <div v-if="errorMsg != ''">
          <p>{{ errorMsg }}</p>
        </div>
      </transition>
      <v-card>
        <v-card-title>Email Sent</v-card-title>
        <v-card-text>Check your email for a link to reset your password.</v-card-text>
        <v-card-action>
          <v-spacer />
          <v-btn
            @click="togglePasswordReset = false"
          >
            Back to login
          </v-btn>
        </v-card-action>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import fb from '../firebaseConfig';

@Component
export default class Login extends Vue {
  showLoginForm = true;
  togglePasswordReset = false;
  passwordResetSuccess = false
  performingRequest = false;
  errorMsg = '';
  loginForm = {
    email: '',
    password: '',
  };
  signupForm = {
    name: '',
    email: '',
    passwaord: '',
  };
  passwordForm = {
    email: '',
  };

  login() {
    fb.auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
      .then((user: any) => {
        console.log(`#login:\nuser: ${JSON.stringify(user, null, 2)}`);
        this.$store.commit('setCurrentUser', user.user);
        this.$store.dispatch('fetchUserProfile');
        this.$router.push('/home');
      })
      .catch((err) => {
        console.log(err);
        this.errorMsg = err.message;
      });
  }

  signup() {
    this.performingRequest = true;

    fb.auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.passwaord)
      .then((user: any) => {
        console.log(`#signup:\nuser: ${JSON.stringify(user.user, null, 2)}`);
        this.$store.commit('setCurrentUser', user.user);

        console.log(`#signup: Setting user name to: ${this.signupForm.name}`);
        fb.usersCollection.doc(user.user.uid).set({
          name: this.signupForm.name,
        })
          .then(() => {
            console.log(`#signup: fetching user profile`);
            this.$store.dispatch('fetchUserProfile');
            this.$router.push('/');
          })
          .catch((err) => {
            console.log(err);
            this.errorMsg = err.message;
          });
      })
      .catch((err) => {
        console.log(err);
        this.performingRequest = false;
        this.errorMsg = err.message;
      });
  }

  resetPassword() {
    this.performingRequest = true;

    fb.auth.sendPasswordResetEmail(this.passwordForm.email)
      .then(() => {
        this.performingRequest = false;
        this.passwordResetSuccess = true;
        this.passwordForm.email = '';
      })
      .catch((err) => {
        console.log(err);
        this.performingRequest = false;
        this.errorMsg = err.message;
      });
  }
}
</script>

<style lang="scss" scoped>
</style>
