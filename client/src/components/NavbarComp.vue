<template>
    <div>
        <b-navbar fixed="top" toggleable="lg" type="dark">
            <b-navbar-brand href="/">RoT</b-navbar-brand>
            <b-navbar-toggle target="nav_collapse" />

            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="/forsteralm">Bestenliste</b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-button id="login-button" variant="success">Registrieren</b-button>
                    &nbsp;
                    <b-dropdown id="ddown-form" text="Login" ref="ddown" right>
                        <b-dropdown-form>
                            <b-form-group label="Email" label-for="ddown-form-email">
                                <b-form-input size="sm" placeholder="email@example.com" id="ddown-form-email">
                                </b-form-input>
                            </b-form-group>

                            <b-form-group label="Password" label-for="ddown-form-passwd">
                                <b-form-input type="password" size="sm" placeholder="Password" id="ddown-form-passwd">
                                </b-form-input>
                            </b-form-group>

                            <b-form-checkbox class="mb-3">Remember me</b-form-checkbox>
                            <b-button variant="primary" size="sm" @click="onClick">Sign In</b-button>
                        </b-dropdown-form>
                        <b-dropdown-divider />
                        <b-dropdown-item-button>New around here? Sign up</b-dropdown-item-button>
                        <b-dropdown-item-button>Forgot Password?</b-dropdown-item-button>
                    </b-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {
    name: 'NavbarComp',
    props: {
    },
    methods: {
        onClick() {
        this.$refs.ddown.hide(true)
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
