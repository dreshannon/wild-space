import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router';
import {store} from './store';
import 'es6-promise/auto';
import fb from './firebaseConfig';

Vue.config.productionTip = false;

let app: any;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
fb.auth.onAuthStateChanged((user: any) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      vuetify,
      render: (h) => h(App),
    }).$mount('#app');
  }
});
