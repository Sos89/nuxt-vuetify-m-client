<template>
  <v-app>
    <v-container fluid>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <m-header
            v-model="searchable"
            page-title="Home"
            :nav-data="navItems"
          />
        </v-col>
      </v-row>
      <v-row>
        <template v-if="getProducts">
          <v-col
            v-for="(product, index) of filteredList"
            :key="index"
          >
            <product-card
              :loading="isLoading"
              btn="Edit"
              reserve="Reserve"
              :image="`http://127.0.0.1:8000/images/${product.image}`"
              @reserve="reset(product.id)"
              @edit="editProduct(product.id)"
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
        </template>

      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import MHeader from '~/components/layout/M-Header'
import ProductCard from "~/components/ProductCard.vue";
export default {
  name: 'IndexPage',
  components: {ProductCard, MHeader },
  middleware: 'admin-middleware',
  data() {
    return {
      searchable: '',
      navItems: [
        { title: 'Home', linkTo: '/admin' },
        { title: 'Create Product', linkTo: '/admin/create' },
        { title: 'Categories', linkTo: '/admin/category'}
      ],
      isLoading: false,
    }
  },
  async fetch() {
    await this.fetchProducts()
  },
  computed: {
    ...mapGetters('products', ['getProducts']),
    filteredList() {
      return this.getProducts.filter((product) => {
        return product.title
          .toLowerCase()
          .includes(this.searchable.toLowerCase())
      })
    },
  },

  methods: {
    ...mapActions('products', ['fetchProducts', 'editProduct']),
    reset(id) {
      alert(id)
      this.isLoading = !this.isLoading
    },
    editProduct(id) {
      this.$router.push(`/admin/edit/${id}`)
    },
  },
}
</script>
<style scoped></style>
