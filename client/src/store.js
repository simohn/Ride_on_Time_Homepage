import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';
import localForage from 'localforage';

Vue.use(Vuex)

const vuexStorage = new VuexPersist({
    key: 'sourcelink',
    storage: localForage
})

export default new Vuex.Store({
    plugins: [vuexStorage.plugin],
    state: {
        loggedIn: false,
        userName: ''
    },
    mutations: {
        SET_LOGIN_DATA: (state, loginData) => {
            state.loggedIn = true;
            state.userName = loginData.login.username;
        },
        RESET_LOGIN_DATA: (state) => {
            state.loggedIn = false;
            state.userName = '';
        }
    }
})