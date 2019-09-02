<template>
    <div class="registerPage">
        <b-container>
            <b-card v-if="showRegisterForm">
                <b-form>
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
                        <b-form-input size="sm" v-model="form.emailReg" placeholder="a.musterfrau@email.com">
                        </b-form-input>
                    </b-form-group>

                    <b-form-group label="Passwort">
                        <b-form-input type="password" v-model="form.passwordReg" size="sm" placeholder="Passwort">
                        </b-form-input>
                    </b-form-group>

                    <b-button variant="info" size="sm" @click="registerUser">Registrieren</b-button>
                </b-form>
            </b-card>

            <b-card v-if="showSuccessfullForm">
                <b-text>Registrierung erfolgreich!</b-text>
            </b-card>

             <b-card v-if="showErrorForm">
                 <b-text>Es ist leider etwas schiefgelaufen, bitte probier es nochmals!</b-text>
            </b-card>

        </b-container>
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

export default {
    name: 'NavbarComp',
    data() {
      return {
        form: {
            usernameReg: '',
            firstnameReg: '',
            lastnameReg: '',
            emailReg: '',
            passwordReg: ''
        },
        showRegisterForm: true,
        showSuccessfullForm: false,
        showErrorForm: false
      }
    },
    methods: {
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

                this.showRegisterForm = false;
                this.showSuccessfullForm = true;
            })
            .catch(error => {
                this.showRegisterForm = false;
                this.showErrorForm = true;

                console.log(error);
            });
        }
    }
}
</script>

<style>
.registerPage {
    margin-top: 56px;
    padding-top: 50px;
    padding-bottom: 50px;
}
</style>
