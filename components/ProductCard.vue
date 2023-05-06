<template>
  <v-card
    :loading="loading"
    class="mx-auto my-12"
    max-width="300"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="image"
    ></v-img>

    <v-card-title>
      <slot name="product-title"></slot>
    </v-card-title>

    <v-card-text>
<!--      <v-row-->
<!--        align="center"-->
<!--        class="mx-0"-->
<!--      >-->
<!--        <v-rating-->
<!--          :value="4.5"-->
<!--          color="amber"-->
<!--          dense-->
<!--          half-increments-->
<!--          readonly-->
<!--          size="14"-->
<!--        ></v-rating>-->

<!--        <div class="grey&#45;&#45;text ms-4">-->
<!--          4.5 (413)-->
<!--        </div>-->
<!--      </v-row>-->

      <div class="my-4 text-subtitle-1">
        <slot name="product-price"></slot>
      </div>

      <div>
        <slot name="description"></slot>
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>
      <slot name="card-title"></slot>
    </v-card-title>

    <v-card-actions class="d-flex justify-space-between">
      <v-btn
        color="deep-purple lighten-2"
        @click="$emit('reserve')"
        small
      >
        {{reserve}}
      </v-btn>
      <v-btn
        class="mr-auto"
        @click="$emit('edit')"
        small
      >
        {{btn}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProductCard",
  props: {
    loading: {
      type: Boolean
    },
    image: {
      type: String
    },
    btn: {
      type: String
    },
    reserve: {
      type: String
    }
  }
}
</script>

<style scoped>

</style>
