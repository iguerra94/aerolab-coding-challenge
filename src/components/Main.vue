<template lang="pug">
  section
    #categoryImage
    .container
      product-actions(:showFilters="true")
      .columns.is-multiline.is-mobile
        .column.is-3(v-for="product in productsCurrentPageComputed")
          product(:product="product" :key="product._id")
      product-actions
</template>

<script>
import { mapState } from 'vuex'
import trae from 'trae'
import Product from '@/components/Product.vue'
import ProductActions from '@/components/ProductActions.vue'

export default {
  computed: {
    ...mapState(['numProductsShown', 'pages', 'products']),
    productsCurrentPageComputed() {
      if (this.products) {
        return this.pages ? this.products[this.pages.current] : this.products[0]
      }
    }
  },
  
  beforeCreate() {
    this.$store.dispatch('setNumProductsShown', 16)
  },

  created () {
    trae.defaults({
      'headers': {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YTE0YWIwY2ViZGZiYzAwOWJmM2ZiNGQiLCJpYXQiOjE1MTEzMDM5NDh9.FVSrtY7tH9S-E1YtVlQqpbM-GE6hjD6GgphVgS-WwXk'
      }
    })

    trae.get("https://aerolab-challenge.now.sh/user/me")
      .then((res) => {
        // Se dispara el evento que almacena el usuario en el store.
        this.$store.dispatch('setUser', res.data)
      })
      .catch((err) => {
        console.log(err)    
      })

    trae.get("https://aerolab-challenge.now.sh/products")
      .then((res) => {
        console.info('Se obtuvieron los productos con exito!')        
        this.assignProductsPages(res)
        console.info('Se asignaron los productos con exito!')
      })
      .catch((err) => {
        console.log(err)
      })
  },

  methods: {
    assignProductsPages(res) {
      let i = 0
      let first = i
      let last = this.numProductsShown
      let cantPages = res.data.length / this.numProductsShown
      let count = 0

      this.$store.dispatch('setPages', { current: 0, total: cantPages })

      while (i < cantPages) {
        this.productsPages[i] = res.data.slice(first, last)
        count += this.productsPages[i].length
        
        if (i === cantPages -1) {
          this.productsPages.push(count)
        }
        
        i++
        first = last
        last += this.numProductsShown
      }

      this.$store.dispatch('setProducts', this.productsPages)
      this.productsCurrentPage = this.productsPages[this.pages.current]
    }
  },

  components: {
    "product": Product,
    "product-actions": ProductActions
  },

  data() {
    return {
      productsCurrentPage: [],
      productsPages: []
    }
  }
}
</script>

<style scoped>
  section {
    background-color: rgb(248,248,248);
  }

  #categoryImage {
    background-image: url("../assets/header-x2-1.png");
    background-repeat: no-repeat;
    background-size: 100%;
    height: 60vh;
    margin-bottom: 30px;
  }
    
  span {
    z-index: 999;
    font-size: 3em;
    color: white;
    font-weight: 600;
    position: absolute;
    left: 15%;
    top: 20%;
  }

  .columns {
    margin: 30px 0;
  }

  @media screen and (max-width: 860px) {
    span {
      font-size: 2.2em;
    }
  }

  @media screen and (max-width: 500px) {
    span {
      font-size: 1.5em;
    }
  }
</style>