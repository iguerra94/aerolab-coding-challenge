<template lang="pug">
  header.level.is-mobile(v-if="user")
    .level-left
      .level-item
        img(src="../../assets/aerolab-logo.svg", alt="Logo")
    .level-right
      .level-item
        span {{ user.name }}
      .level-item
        #user_points
          span {{ user.points }}
          img#coin(src="../../assets/coin.svg", alt="")
</template>

<script>
import { mapState } from 'vuex'
import trae from 'trae'

export default {
  name: "header",

  computed: {
    ...mapState(['user'])
  },

  data () {
    return {

    }
  }
}
</script>

<style scoped>
.level {
  margin: 10px 20px;
}

#user_points {
  display: flex;
  align-items: center;
  background: #ccc;
  border-radius: 20px;
  padding: 4px 8px 4px 12px;
}

#coin {
  padding-left: 4px;  
}
</style>