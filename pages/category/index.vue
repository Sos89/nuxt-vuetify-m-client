<template>
  <v-app>
    <layout-m-header :nav-data="navItems"></layout-m-header>

    <v-container fluid>
      <v-row>
        <v-col v-for="category of getCategory" :key="category.id">
          <v-card>
            <v-img
              :src="`http://127.0.0.1:8000/category-images/${category.image}`"
              height="200px"
            ></v-img>

            <v-card-title> {{ category.name }} </v-card-title>

            <v-card-text>
              {{ category.description }}
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'index.vue',
  async fetch() {
    await this.fetchCategories()
  },
  data() {
    return {
      navItems: [
        { title: 'Home', linkTo: '/' },
        { title: 'About Us', linkTo: '#' },
        { title: 'Categories', linkTo: '/category' },
        { title: 'Services', linkTo: '#' },
        { title: 'Blog', linkTo: '#' },
        { title: 'Contact Us', linkTo: '#' },
      ],
    }
  },
  computed: {
    ...mapGetters('categories', ['getCategory']),
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
    showDesc(id){
      this.show = !this.show
    }
  },
}
</script>

<style scoped></style>
