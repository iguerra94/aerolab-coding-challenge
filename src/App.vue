<template lang="pug">
  #app
    app-header
    router-view
</template>

<script>
import Header from '@/components/layout/Header.vue'

export default {
  name: 'app',
  components: {
    'app-header': Header
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
