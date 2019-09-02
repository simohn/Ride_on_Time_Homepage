<template>
    <div>
        <b-navbar fixed="top" toggleable="lg" type="dark">
            <b-navbar-brand href="/">RoT</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="/bestenliste">Bestenliste</b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-button v-if="!loggedIn" variant="info" href="/registrierung">Registrieren</b-button>

                    &nbsp;

                    <b-dropdown v-if="!loggedIn" text="Login" ref="ddownLogin" right>
                        <b-dropdown-form>
                            <b-form-group label="Benutzername">
                                <b-form-input size="sm" v-model="form.usernameLog" placeholder="email@example.com">
                                </b-form-input>
                            </b-form-group>

                            <b-form-group label="Password">
                                <b-form-input type="password" v-model="form.passwordLog" size="sm" placeholder="Password">
                                </b-form-input>
                            </b-form-group>

                            <b-button variant="primary" size="sm" @click="loginUser">Login</b-button>
                        </b-dropdown-form>
                    </b-dropdown>

                    <b-dropdown v-if="loggedIn" ref="ddownLogout" :text="userName" right>
                        <b-dropdown-item href="/userbereich">Userbereich</b-dropdown-item>
                        <b-dropdown-item-button v-on:click="logoutUser">Logout</b-dropdown-item-button>
                    </b-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import gql from 'graphql-tag'
import { mapState, mapMutations } from 'vuex'

const loginMutation = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            username
    }
}`;

export default {
    name: 'NavbarComp',
    data() {
      return {
        form: {
            usernameLog: '',
            passwordLog: ''
        },
        loginData: {}
      }
    },
    methods: {
        loginUser () {
            this.$apollo.mutate({
                mutation: loginMutation,
                variables: {
                    username : this.form.usernameLog,
                    password : this.form.passwordLog
                }
            })
            .then(data => {
                this.form.usernameLog = '';
                this.form.passwordLog = '';

                this.$refs.ddownLogin.hide(true);
                this.loginData = data.data;

                this.setLoginData();
            })
            .catch(error => {
                console.log(error);
            });
        },
        logoutUser() {
            this.$refs.ddownLogout.hide(true);

            this.resetLoginData();
        },
        ...mapMutations([
            'SET_LOGIN_DATA',
            'RESET_LOGIN_DATA'
        ]),
        setLoginData: function() {
            this.SET_LOGIN_DATA(this.loginData);
        },
        resetLoginData: function() {
            this.RESET_LOGIN_DATA();
        }
    },
    computed: mapState([
            'loggedIn',
            'userName'
    ]),
}
</script>

<style>
.navbar {
    background-color: rgb(0, 0, 0);
    position: fixed; 
}
</style>
