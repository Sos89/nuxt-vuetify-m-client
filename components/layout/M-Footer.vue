<template>
  <v-container fluid>
    <v-footer :padless="padless">
      <v-col class="text-center" cols="12 indigo">
        <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
          <v-icon size="24px">
            {{ icon }}
          </v-icon>
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="12 indigo">
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
      </v-col>
      <v-col class="text-center" cols="12">
        {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
export default {
  name: 'MFooter',
  data() {
    return {
      icons: ['mdi-facebook', 'mdi-twitter', 'mdi-linkedin', 'mdi-instagram'],
      links: ['Home', 'About Us', 'Team', 'Services', 'Blog', 'Contact Us'],
      padless: true,
    }
  },
}
</script>

<style scoped></style>
