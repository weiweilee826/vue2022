import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import axios from 'axios'
import VueAxios from 'vue-axios'

createApp(App)
  .use(router)
  .use(BootstrapVue3)
  .use(VueAxios, axios)
  .mount("#app");

