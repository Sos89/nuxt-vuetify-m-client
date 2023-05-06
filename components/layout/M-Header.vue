<template>
  <v-container fluid>
    <v-row class="d-flex" align="center">
      <v-app-bar elevation="3" color="indigo" class="mb-5">
        <v-col xl="6" lg="6" md="6" cols="12" class="d-flex">
          <v-toolbar-items v-for="(item, index) of navData" :key="index">
            <nuxt-link class="nav_title mx-2" :to="item.linkTo">{{ item.title }}</nuxt-link>
          </v-toolbar-items>
        </v-col>
        <v-col
          xl="6"
          lg="6"
          md="6"
          cols="12"
          class="d-flex align-center justify-end text-sm-justify"
        >
          <v-toolbar-items>
            <v-col class="d-flex align-center justify-end text-sm-justify">
              <v-text-field
                label="Search"
                hide-details="auto"
                color="white"
                class="searchInput"
                :value="value"
                @input="(v) => $emit('input', v)"
                dark
                outlined
                dense
              ></v-text-field>
              <v-btn dark icon>
                <v-icon @click="search">mdi-magnify</v-icon>
              </v-btn>
              <div class="userName">{{ $auth.user.name }}</div>
              <template v-if="$auth.loggedIn">
                <v-btn dark icon @click.prevent="logout">
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
              </template>
              <template v-else>
                <v-btn dark icon>
                  <v-icon @click="toLogin">mdi-account</v-icon>
                </v-btn>
              </template>
              <v-btn dark icon>
                <v-icon @click="$emit('clickBars')">mdi-shopping</v-icon>
              </v-btn>
            </v-col>
          </v-toolbar-items>
        </v-col>
      </v-app-bar>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'M-Header',
  props: {
    pageTitle: {
      type: String,
    },
    value: {
      type: String,
    },
    navData: {
      type: Array,
    },
  },
  data() {
    return {
      searchable: '',
      isSearchInput: false,
    }
  },
  methods: {
    search() {
      this.isSearchInput = !this.isSearchInput
    },
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
      // this.$notify({
      //   group: 'foo',
      //   title: 'This is the <em>title</em>',
      //   text: 'This is some <b>content</b>',
      //   type: 'error',
      //   duration: 5000,
      //   speed: 1000,
      //   data: {}
      // })
    },
    toLogin() {
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.nav_title {
  color: white;
  font-size: 18px;
  font-family: 'Bitstream Charter';
  font-style: italic;
  text-decoration: none;
}
.searchInput {
  border: none;
  width: 50%;
  margin-left: auto;
}
.userName {
  color: white;
  font-style: italic;
  font-family: 'Bitstream Charter';
}
</style>
