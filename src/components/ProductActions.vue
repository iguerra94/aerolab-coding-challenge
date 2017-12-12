<template>
  <div v-if="products">
    <article>
      <div v-if="showFilters">
        <div>
          <span>Show: </span>
          <form>
            <select class="numProducts" name="numProductsSelect" @change="selectNumProducts()" v-model="numProductsSelected">
              <option v-for="(num, index) in numProductsShownList" :value="num.value" :key="index">{{ num.value }}</option>
            </select>
          </form>
        </div>
        <p id="filters">
          <span>Sort By: </span>
          <ul>
            <li class="filter" v-for="(filter, index) in filters" :key="index" @click="selectFilter(index)">
              {{ filter.name }}
            </li>
          </ul>
        </p>
      </div>
      <div v-else>
        <p>{{ (pages.current === pages.total -1) ? products[products.length-1] : numProductsShown * (pages.current+1) }} of {{ products[products.length-1] }} products</p>
      </div>
      <img v-if="pages.current > 0 && pages.current < pages.total" src="../assets/arrow-left.svg" title="Previous Page" alt="Previous Page" @click="previousPage()" />
      <img v-if="pages.total - pages.current -1" src="../assets/arrow-right.svg" title="Next Page" alt="Next Page" @click="nextPage()" />
    </article>
    <hr />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState(['pages', 'numProductsShown', 'sortByFilter', 'products'])
  },

  props: ['showFilters'],
  
  created() {
    this.$store.dispatch('setNumProductsShown', this.numProductsSelected)
  },
  
  methods: {
    selectFilter(index) {
      const filters = document.querySelectorAll('.filter')
      filters.forEach((filter, filterIndex) => {
        if (filterIndex !== index) {
          if (filter.classList.contains('selected')) {
            filter.classList.remove('selected')
          }
        } else {
          filter.classList.add('selected')

          if (!this.sortByFilter) {
            this.$store.dispatch('setSortByFilter', { id: index, name: this.filters[index].name })
            this.sortBySelectedFilter()
          }
          
          if (this.sortByFilter.id !== index) {
            this.$store.dispatch('setSortByFilter', { id: index, name: this.filters[index].name })
            this.sortBySelectedFilter()
          }
        }
      })
    },
    selectNumProducts() {
      this.$store.dispatch('setNumProductsShown', this.numProductsSelected)

      let i = 0
      let first = i
      let last = this.numProductsShown
      let cantPages = Math.ceil(this.products[this.products.length-1] / this.numProductsShown)
      let count = 0

      this.$store.dispatch('setPages', { current: 0, total: cantPages })

      let _productsPages = []

      while (true) {
        _productsPages.push(...this.products[i])
        i++
        if (i > cantPages || this.products[this.products.length-1] === _productsPages.length) break;
      }
    
      i = 0
      this.productsPages = []

      while (i < cantPages) {
        this.productsPages[i] = _productsPages.slice(first, last)
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
    },
    sortBySelectedFilter() {
      const filterIndex = this.sortByFilter.id

      switch (filterIndex) {
        case 0:
          break;
        case 1:
          this.sortByLowestPrice()
          break;
        case 2:
          this.sortByHighestPrice()
          break;
        default:
          break;
      }
    },
    sortByLowestPrice() {
      let i = 0
      let first = i
      let last = this.numProductsShown
      let cantPages = Math.ceil(this.products[this.products.length-1] / this.numProductsShown)
      let count = 0

      this.$store.dispatch('setPages', { current: 0, total: cantPages })

      let _productsPages = []

      while (true) {
        _productsPages.push(...this.products[i])
        i++
        if (i > cantPages || this.products[this.products.length-1] === _productsPages.length) break;
      }

      // ORDENO POR MENOR PRECIO
      function comparar(productA, productB){ return productA.cost - productB.cost }
      _productsPages.sort(comparar)
      
      i = 0
      this.productsPages = []

      while (i < cantPages) {
        this.productsPages[i] = _productsPages.slice(first, last)
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
    },
    sortByHighestPrice() {
      let i = 0
      let first = i
      let last = this.numProductsShown
      let cantPages = Math.ceil(this.products[this.products.length-1] / this.numProductsShown)
      let count = 0

      this.$store.dispatch('setPages', { current: 0, total: cantPages })

      let _productsPages = []

      while (true) {
        _productsPages.push(...this.products[i])
        i++
        if (i > cantPages || this.products[this.products.length-1] === _productsPages.length) break;
      }

      // ORDENO POR MAYOR PRECIO
      function comparar(productA, productB){ return productB.cost - productA.cost }
      _productsPages.sort(comparar)
      
      i = 0
      this.productsPages = []

      while (i < cantPages) {
        this.productsPages[i] = _productsPages.slice(first, last)
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
    },
    previousPage() {
      this.$store.dispatch('setPages', { current: this.pages.current-1, total: this.pages.total })
    },
    nextPage() {
      this.$store.dispatch('setPages', { current: this.pages.current+1, total: this.pages.total })
    }
  },
  data() {
    return {
      filters: [
        {
          name: "Most Recent",
          isSelected: true
        },
        {
          name: "Lowest Price",
          isSelected: false
        },
        {
          name: "Highest Price",
          isSelected: false
        }
      ],
      numProductsShownList: [
        {
          value: 16,
          isSelected: true
        },
        {
          value: 24,
          isSelected: false
        },
        {
          value: 32,
          isSelected: false
        }
      ],
      numProductsSelected: 16,
      productsCurrentPage: [],
      productsPages: []
    }
  }
};
</script>

<style scoped>
article {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}

article div {
  display: flex;
  flex-direction: row;
  align-items: center;
}

article div p {
  display: flex;
  flex-direction: row;
  align-items: center;
}

article div p#filters::before {
  margin: 0 12px;
  content: "|";
}

article div p ul {
  display: flex;
  flex-direction: row;
  align-content: flex-start;
  padding: 0;
}

.filter {
  list-style-type: none;
  padding: 10px 15px;
  margin-left: 15px;
  background-color: #ddd;
  border-radius: 20px;
  cursor: pointer;
  transition: all .5s; 
}

.filter:hover {
  background-color: #29B6F6;
  color: #fff;
}

.filter.selected {
  background-color: #29B6F6;
  color: #fff;
}

.numProducts {
  margin: 0 10px;
  padding: 5px;
  border-radius: .5em;
  background: #ddd;
  border: 1px solid transparent;
  outline: none;
  cursor: pointer;
  transition: all .4s;
}

.numProducts:hover {
  border: 1px solid #aaa;
}

.numProducts > option {
  background: #ddd;
  width: 10px;
}

article img {
  cursor: pointer;
}
</style>