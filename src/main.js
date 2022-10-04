import { createApp } from "vue";

import App from "./App.vue";
import router from "./router";

import BootstrapVue3 from "bootstrap-vue-3";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-3/dist/bootstrap-vue-3.css";

import axios from "axios";
import VueAxios from "vue-axios";

import VueLoading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
library.add(faSpinner)

const app = createApp(App);
  app.use(router)
  .use(BootstrapVue3)
  .use(VueAxios, axios)
  .provide('axios', app.config.globalProperties.axios)
  // .use(VueLoading)
  .component('Loading',VueLoading)
  .component('font-awesome-icon', FontAwesomeIcon)

  .mount("#app");

  router.beforeEach((to, from) => {
    console.log("to", to, "from", from);
    if (to.meta.requiresAuth) {
      const api = `${process.env.VUE_APP_API}/api/user/check`;
      axios.post(api).then((response) => {
        if (!response.data.success) {
          return { name: "login" };
        }
      });
    }
  });
axios.defaults.withCredentials = true;