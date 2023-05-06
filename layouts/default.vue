<template>
  <v-app dark>
    <v-main>
      <Nuxt />
    </v-main>
    <m-footer/>
  </v-app>
</template>

<script>
import MFooter from "~/components/layout/M-Footer";
export default {
  name: 'DefaultLayout',
  components: {MFooter},
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
}
</script>
