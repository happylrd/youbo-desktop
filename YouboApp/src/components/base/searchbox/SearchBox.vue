<template>
  <div>
    <div style="float: right">
      <md-button class="md-icon-button" @click.native="getParam">
        <md-icon>search</md-icon>
      </md-button>
    </div>

    <div style="float: right">
      <div class="search-box-wrapper">
        <input type="search" id="search" v-model="searchText" placeholder="搜索你感兴趣的内容..."/>
      </div>
    </div>
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
  .search-box-wrapper {
    width: 300px;
    vertical-align: middle;
    white-space: nowrap;
    position: relative;
  }

  .search-box-wrapper input#search {
    width: 50px;
    height: 50px;
    background: #2b303b;
    border: none;
    font-size: 10pt;
    float: right;
    color: #262626;
    padding-left: 35px;
    -webkit-border-radius: 5px;
    -moz-border-radius: 5px;
    border-radius: 5px;
    color: #fff;

    -webkit-transition: width .55s ease;
    -moz-transition: width .55s ease;
    -ms-transition: width .55s ease;
    -o-transition: width .55s ease;
    transition: width .55s ease;
  }

  .search-box-wrapper input#search::-webkit-input-placeholder {
    color: #65737e;
  }

  .search-box-wrapper input#search:-moz-placeholder { /* Firefox 18- */
    color: #65737e;
  }

  .search-box-wrapper input#search::-moz-placeholder { /* Firefox 19+ */
    color: #65737e;
  }

  .search-box-wrapper input#search:-ms-input-placeholder {
    color: #65737e;
  }

  .search-box-wrapper input#search:focus, .search-box-wrapper input#search:active {
    outline: none;
    width: 300px;
  }

  .search-box-wrapper:hover input#search {
    width: 300px;
  }
</style>
