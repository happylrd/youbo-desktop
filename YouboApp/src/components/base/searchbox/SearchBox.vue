<template>
  <div>
    <input type="search" v-model="searchText"/>

    <md-button class="md-icon-button" @click.native="getParam">
      <md-icon>search</md-icon>
    </md-button>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        searchText: ''
      }
    },
    methods: {
      getParam () {
        this.$emit('getParamSuccess', this.searchText)
      }
    }
  }
</script>

<style scoped>

</style>
