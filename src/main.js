import Vue from 'vue';
import Vuex from 'vuex';
import initialStore from './vuex/configureStore';
import App from './components/App.vue';
// import BootstrapVue from "bootstrap-vue";
// import "bootstrap/dist/css/bootstrap.css";
// import "bootstrap-vue/dist/bootstrap-vue.css";

Vue.config.productionTip = false;
Vue.use(Vuex);
// Vue.use(BootstrapVue);

const store = new Vuex.Store(initialStore);

new Vue({
	render: home => home(App),
	store
}).$mount('#app');
