<template>
    <div id="app">
      <div class="content">
        <app-header></app-header>
        <router-view></router-view>
      </div>
        <app-footer></app-footer>
    </div>
</template>

<script>
import NavbarComp from './components/NavbarComp.vue'
import AppFooter from './components/AppFooter.vue'

export default {
  name: 'app',
  components: {
    'app-header': NavbarComp,
    'app-footer': AppFooter
  }
}
</script>

<style>
.content {
    min-height: calc(100vh - 112px);
    /* 80px header + 40px footer = 120px  */
}
</style>
