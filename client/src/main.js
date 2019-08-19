import Vue from 'vue'
import VueRouter from 'vue-router'
import Routes from './routes'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueApollo from 'vue-apollo'
import ApolloClient from "apollo-boost"

Vue.config.productionTip = false

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000"
})

Vue.use(BootstrapVue);
Vue.use(VueApollo);
Vue.use(VueRouter);

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
  router: router
}).$mount('#app')
