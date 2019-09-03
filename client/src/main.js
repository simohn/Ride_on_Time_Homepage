import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import store from './store'

import VueApollo from 'vue-apollo'

import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';

Vue.use(BootstrapVue);
Vue.use(VueApollo);
Vue.use(VueRouter);

Vue.config.productionTip = false;

const backendUrl = 'http://localhost:4000';

const link = createHttpLink({
  uri: backendUrl,
  credentials: 'include'
});

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

const router = new VueRouter({
  routes: Routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  apolloProvider,
  render: h => h(App),
  router: router,
  store
}).$mount('#app')
