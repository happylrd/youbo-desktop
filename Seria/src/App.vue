<template>
  <div id="app">
    <div class="navbar-fixed-top-wrapper">

      <!-- TODO: `z-index` is strongly dependent on `vue-material` framework, will be improved later -->
      <div class="navbar-fixed-top" style="width: 100%; z-index: 6">
        <Header></Header>
      </div>

      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
  import Header from './components/header/Header'

  export default {
    components: {
      Header
    }
  }
</script>

<style>
  .navbar-fixed-top-wrapper {
    padding-top: 70px
  }

  .navbar-fixed-top {
    position: fixed;
    top: 0;
    height: 50px
  }
</style>
