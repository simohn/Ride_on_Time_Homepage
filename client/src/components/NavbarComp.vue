<template>
    <div>
        <b-navbar fixed="top" toggleable="lg" type="dark">
            <b-navbar-brand href="/">RoT</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="/bestenliste">Bestenliste</b-nav-item>
                    <b-nav-item href="/userbereich">Userbereich</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-dropdown text="Registrieren" ref="ddownReg" right>
                        <b-dropdown-form>
                            <b-form-group label="Benutzername">
                                <b-form-input size="sm" v-model="form.usernameReg" placeholder="A.Musterfrau">
                                </b-form-input>
                            </b-form-group>

                            <b-form-group label="Vorname">
                                <b-form-input size="sm" v-model="form.firstnameReg" placeholder="Anna">
                                </b-form-input>
                            </b-form-group>

                            <b-form-group label="Nachname">
                                <b-form-input size="sm" v-model="form.lastnameReg" placeholder="Musterfrau">
                                </b-form-input>
                            </b-form-group>
                            
                            <b-form-group label="Email">
                                <b-form-input size="sm" v-model="form.emailReg" placeholder="email@bsp.com">
                                </b-form-input>
                            </b-form-group>

                            <b-form-group label="Passwort">
                                <b-form-input type="password" v-model="form.passwordReg" size="sm" placeholder="Passwort">
                                </b-form-input>
                            </b-form-group>

                            <b-button variant="primary" size="sm" @click="registerUser">Registrieren</b-button>
                        </b-dropdown-form>
                    </b-dropdown>

                    &nbsp;

                    <b-dropdown text="Login" ref="ddownLog" right>
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
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
import gql from 'graphql-tag'

const registerMutation = gql`
    mutation registerUser ($username: String!, $first_name: String!, $last_name : String!, $email : String!, $password : String!) {
        register(username: $username, first_name: $first_name, last_name: $last_name, email: $email, password: $password) {
            id
            username
        }
}`;

const loginMutation = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            id
            username
            runs
            {
                time
                track
                {
                    track_name
                }
            }
    }
}`;

export default {
    name: 'NavbarComp',
    data() {
      return {
        form: {
            usernameReg: '',
            firstnameReg: '',
            lastnameReg: '',
            emailReg: '',
            passwordReg: '',

            usernameLog: '',
            passwordLog: ''
        }
      }
    },
    methods: {
        onClickReg() {
        this.$refs.ddownReg.hide(true)
        },
        onClickLog() {
            this.$refs.ddownLog.hide(true)
        },
        registerUser () {
            this.$apollo.mutate({
                mutation: registerMutation,
                variables: {
                    username : this.form.usernameReg,
                    first_name : this.form.firstnameReg,
                    last_name : this.form.lastnameReg,
                    email : this.form.emailReg,
                    password : this.form.passwordReg
                }
            })
            .then(data => {
                this.form.usernameReg = '';
                this.form.firstnameReg = '';
                this.form.lastnameReg = '';
                this.form.emailReg = '';
                this.form.passwordReg = '';

                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

            this.onClickReg();
        },
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

                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });

            this.onClickLog();
        }
    }
}
</script>

<style>
.navbar {
    background-color: rgb(0, 0, 0);
    position: fixed; 
}
</style>
