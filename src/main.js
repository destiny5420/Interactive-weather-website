import Vue from 'vue';
import App from '@/views/vApp/index.vue';

// import axios
import axios from 'axios';
import VueAxios from 'vue-axios';

Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
