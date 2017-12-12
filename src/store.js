import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    userPoints: null,
    products: null,
    sortByFilter: null,
    numProductsShown: null,
    pages: null
  },
  // getters: {
  //   getUser: (state) => state.user,
  //   getProducts: (state) => state.products,
  //   getSortByFilter: (state) => state.sortByFilter,
  //   getNumProductsShown: (state) => state.numProductsShown,
  //   getCurrentPage: (state) => state.currentPage
  // },
  mutations: {
    SET_USER (state, user) {
      state.user = user
    },
    SET_USER_POINTS (state, userPoui) {
      state.user = user
    },
    SET_PRODUCTS (state, products) {
      state.products = products
    },
    SET_SORT_BY_FILTER (state, filter) {
      state.sortByFilter = filter
    },
    SET_NUM_PRODUCTS_SHOWN (state, numProducts) {
      state.numProductsShown = numProducts
    },
    SET_PAGES (state, pages) {
      state.pages = pages
    }
  },
  actions: {
    setUser ({commit}, user) {
      commit('SET_USER', user)
    },
    setProducts ({commit}, products) {
      commit('SET_PRODUCTS', products)
    },
    setSortByFilter ({commit}, filter) {
      commit('SET_SORT_BY_FILTER', filter)
    },
    setNumProductsShown ({commit}, numProducts) {
      commit('SET_NUM_PRODUCTS_SHOWN', numProducts)
    },
    setPages ({commit}, pages) {
      commit('SET_PAGES', pages)
    }
  }
})

export default store