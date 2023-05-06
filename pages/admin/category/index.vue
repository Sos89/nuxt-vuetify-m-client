<template>
  <v-app>
    <layout-m-header :nav-data="navItems"/>
    <template v-for="category of getCategory">
      <v-row :key="category.id" class="d-flex align-center justify-center">
        <v-col class="ml-12">
          <v-img max-width="200px" :src="`http://127.0.0.1:8000/category-images/${category.image}`"></v-img>
        </v-col>
        <v-col>
          <v-card-text>
            Name: {{ category.name }}
          </v-card-text>
        </v-col>
        <v-col>
          <v-card-text>
            Description: {{ category.description }}
          </v-card-text>
        </v-col>
        <v-col>
          <v-btn icon>
            <v-icon color="red">mdi-delete</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </template>

  </v-app>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Index',
  data(){
    return {
      items: [],
      navItems: [
        { title: 'Home', linkTo: '/admin' },
        { title: 'Create Product', linkTo: '/admin/create' },
      ],
    }
  },
  async fetch() {
    await this.fetchCategories()
  },
  computed: {
    ...mapGetters('categories', ['getCategory']),
  },
  methods: {
    ...mapActions('categories', ['fetchCategories']),
  },
}
</script>

<style scoped></style>
