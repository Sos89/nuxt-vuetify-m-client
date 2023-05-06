<template>
  <div>
    <v-text-field
      :rules="rules"
      :label="label"
      :type="type"
      :value="value"
      @input="v => $emit('input', v)"
      required>

    </v-text-field>
  </div>
</template>

<script>
export default {
  name: "M-Input",
  props: {
    value: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
    },
    type: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
