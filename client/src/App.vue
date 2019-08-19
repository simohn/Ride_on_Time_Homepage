<template>
    <div>
        <app-header></app-header>
        <router-view></router-view>
        <app-footer></app-footer>
    </div>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue'
import AppFooter from './components/AppFooter.vue'
import gql from 'graphql-tag'

const getRunsQuery = gql`
  query getRuns {
    getRuns{
      id
      time
    }
  }
`;

export default {
  name: 'app',
  components: {
    'app-header': NavbarComp,
    'app-footer': AppFooter
  },
  data: () => {
  },
  apollo: {
    getRuns: {
      query: getRunsQuery
    }
  }
}
</script>

<style>

</style>
