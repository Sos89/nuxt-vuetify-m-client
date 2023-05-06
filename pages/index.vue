<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12">
        <m-header
          v-model="searchable"
          page-title="Home"
          :nav-data="navItems"
          @clickBars="dd"
        />
      </v-col>
    </v-row>
    <v-row v-if="isBasket" class="basket_content">
      <v-expand-transition>
        <v-banner elevation="24" min-width="370px">
          <v-row>
            <v-col>
              <v-btn icon @click="closeBasket">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(product, index) of getBasket" :key="product.id" class="d-flex align-center">
              <div>
                <v-img
                  :src="`http://127.0.0.1:8000/images/${product.image}`"
                  max-width="100px"
                  height="100px"
                ></v-img>
              </div>
              <v-col class="d-flex align-center">
                <div class="quantity mx-1">
                  <v-btn small icon @click="minus(index)">
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-1"> {{ product.quantity }}</span>
                  <v-btn small icon @click="plus(index)">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
                <div class="basketPrice mx-1">x {{ product.price }}</div>
                <v-btn class="mx-2" icon small @click="deleteProductFromBasket(index)">
                  <v-icon color="red">mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-col>
          </v-row>
          <v-row v-if="getBasket.length > 0" class="d-flex align-center flex-column">
            <v-col>
              Total: {{ basketTotal }}
            </v-col>
            <v-col>
              <v-btn>Checkout</v-btn>
            </v-col>
          </v-row>
        </v-banner>
      </v-expand-transition>

    </v-row>
    <v-row>
      <v-col v-for="(product, index) of filteredList" :key="index">
        <product-card
          :loading="isLoading"
          :image="`http://127.0.0.1:8000/images/${product.image}`"
          reserve="Reserve"
          @reserve="reset(product)"
        >
          <template #card-title>
            <span>{{ product.title }}</span>
          </template>
          <template #description>
            <span>{{ product.description }}</span>
          </template>
          <template #product-price>
            <span>Price {{ product.price }} $.</span>
          </template>
        </product-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import MHeader from '~/components/layout/M-Header'
export default {
  name: 'IndexPage',
  components: { MHeader },
  data() {
    return {
      searchable: '',
      navItems: [
        { title: 'Home', linkTo: '/' },
        { title: 'About Us', linkTo: '#' },
        { title: 'Categories', linkTo: '/category' },
        { title: 'Services', linkTo: '#' },
        { title: 'Blog', linkTo: '#' },
        { title: 'Contact Us', linkTo: '#' },
      ],
      isLoading: false,
      isBasket: false,
      show: false,
    }
  },
  async fetch() {
    await this.fetchProducts()
  },
  computed: {
    ...mapGetters('products', ['getProducts', 'getBasket']),
    filteredList() {
      return this.getProducts.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.searchable.toLowerCase())
      })
    },
    basketTotal(){
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      this.isBasket = true
      let res = []
      for (const item of this.getBasket){
        res.push(item.price * item.quantity)
      }
      res = res.reduce( (sum, el) => {
        return sum + el
      })
      return Math.floor(res)

    }
  },

  methods: {
    ...mapMutations('products', ['setPlusProduct', 'setMinusProduct']),
    ...mapActions('products', [
      'fetchProducts',
      'editProduct',
      'reserveProduct',
      'minusProduct',
      'plusProduct',
      'destroyFromBasket'
    ]),
    reset(product) {
      this.reserveProduct(product)
    },
    dd() {
      this.isBasket = !this.isBasket
    },
    closeBasket() {
      this.isBasket = false
    },
    minus(index) {
      this.minusProduct(index)
    },
    plus(index) {
      this.plusProduct(index)
    },
    deleteProductFromBasket(index){
      this.destroyFromBasket(index)
    }
  },
  // eslint-disable-next-line vue/order-in-components
  mounted() {},
}
</script>
<style scoped>
.basket_content {
  position: fixed;
  background: white;
  top: 0;
  right: 0;
  z-index: 11;
  height: 100vh;
  width: 400px;
  overflow-y: auto;
  padding: 10px;
}
</style>
