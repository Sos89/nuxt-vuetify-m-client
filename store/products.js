export const state = () => ({
  products: null,
  product: null,
  error: null,
  category: null,
  basket: []
})

export const getters = {
  getProducts(state){
    return state.products
  },
  getProduct(state){
    return state.product
  },
  getError(state) {
    return state.error
  },
  getCategory(state){
    return state.category
  },
  getBasket(state) {
    return state.basket
  }
}

export const mutations = {
  setProducts(state, products){
    state.products = products
  },
  setOneProduct(state, product){
    state.product = product
  },
  setError(state, error){
    state.error = error
  },
  setCategories(state, category){
    state.category = category
  },
  setReserve(state, product){
    this._vm.$set(product, 'quantity', 1)
    let productExist = false
    if (state.basket.length){
      // eslint-disable-next-line array-callback-return
      state.basket.map((item) => {
        if (item.id === product.id){
          productExist = true
          item.quantity++
        }
      })
      if (!productExist){
        state.basket.push(product)
        product.quantity = 1
      }
    }else{
      state.basket.push(product)
      product.quantity = 1
    }
  },
  setMinusProduct(state, index){
    if (state.basket[index].quantity > 1){
      state.basket[index].quantity--
    }
  },
  setPlusProduct(state, index){
    state.basket[index].quantity++
  },
  setDestroyedProduct(state, index){
    state.basket.splice(index, 1)
  }
}

export const actions = {
  async createProduct({commit}, product){
    try {
      await this.$axios.post('/api/products', product)
      return true
    }catch (e){
      commit('setError', e.response.data.errors)
    return false
    }
  },
  async fetchProducts( { commit }){
    try {
      const { data }  = await this.$axios.get('/api/products')
      commit('setProducts', data.data)
    }catch (err){
      // eslint-disable-next-line no-console
      console.log(err)
    }
  },
  async editProduct( { commit }, id){
    try {
      const {data} = await this.$axios.get(`/api/products/${id}`)
      commit('setOneProduct', data.data)
    }catch (err){
      // eslint-disable-next-line no-console
      console.log(err.response.data, 'sdf')
    }
  },
  async deleteProduct({commit}, id){
    try {
      await this.$axios.delete(`/api/products/${id}`)
    }
    catch (err){
      commit('setError', err.response.data.errors)
    }
  },
  reserveProduct({commit}, product) {
    commit('setReserve', product)
  },
  minusProduct({commit}, index){
    commit('setMinusProduct', index)
  },
  plusProduct({commit}, index){
    commit('setPlusProduct', index)
  },
  destroyFromBasket({commit}, index){
    commit('setDestroyedProduct', index)
  }
}
