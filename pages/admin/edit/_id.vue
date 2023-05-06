<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <layout-m-header
          page-title="Edit"
          :nav-data="navItems"
        />
      </v-row>
      <v-row>
        <v-col cols="12" sm="8" md="6">
          <notifications type="success" group="created" position="top center" />
          <notifications type="error" group="error" position="top center" />
        </v-col>
      </v-row>
      <v-row v-if="getProduct">
        <v-col xl="6" lg="6" md="6" cols="12" class="d-flex justify-center align-center">
          <v-img
            :lazy-src="`http://127.0.0.1:8000/images/${getProduct.image}`"
            :src="`http://127.0.0.1:8000/images/${getProduct.image}`"
            max-width="500"
            max-height="400"
          >
            <template #placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </v-col>
        <v-col xl="6" lg="6" md="6" cols="12">
          <v-card min-width="300">
            <v-card-title>{{ getProduct.title }}</v-card-title>
            <v-card-text>{{ getProduct.description }}</v-card-text>
            <v-card-subtitle>{{ getProduct.price }}</v-card-subtitle>
            <v-card-actions>
              <v-btn @click="destroyProduct(getProduct.id)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditProduct',
  middleware: 'admin-middleware',
  data() {
    return {
      isImage: false,
      navItems: [
        { title: 'Home', linkTo: '/admin' },
        { title: 'Create Product', linkTo: '/admin/create' }
      ],
    }
  },
  mounted() {
    this.editProduct(this.$route.params.id)
  },
  // eslint-disable-next-line vue/order-in-components
  computed: {
    ...mapGetters('products', ['getProduct']),
  },
  methods: {
    ...mapActions('products', ['editProduct', 'deleteProduct']),
    async destroyProduct(id){
      await this.deleteProduct(id)
      this.message()
      setTimeout(() => {
        this.$router.push('/admin')
      },3000)
    },
    message(){
      this.$notify({
        group: 'created',
        title: 'Product deleted',
        text: '',
        type: 'success',
        duration: 3000,
        speed: 1000,
        data: {}
      })
    },
    errorMessage(){
      this.$notify({
        group: 'error',
        title: 'Field',
        text: '',
        type: 'error',
        duration: 3000,
        speed: 1000,
        data: {}
      })
    },
  },
}
</script>

<style scoped></style>
