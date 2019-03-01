
<template>
  <div id="app" class="uk-padding">
    <div class="uk-text-lead uk-text-center title uk-margin uk-width-1-1">Target Companies</div>
    <hr/>
    <List></List>
  </div>
</template>

<script>
import List from './components/list.vue'

export default {
  name: 'app',
  components: {
    List
  },
  mounted(){
    this.$store.dispatch('fetchTarget');
  }
}
</script>

<style scoped>
hr{
    border: 0;
    height: 1px;
    background: #333;
    background-image: linear-gradient(to right, #ccc, #333, #ccc);
}

.title{
  font-size: 3rem;
}

#app {
  min-height: calc(100vh - 80px);
  background-color: #efefef;
}
</style>
