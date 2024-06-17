<template>
  <v-chip class="ma-2" color="primary" dark small>
    {{ primaryDealTag }}
  </v-chip>
</template>

<script>
export default {
  props: {
    primaryDealTag: {
      type: String,
    },
  },
}
</script>

<style scoped></style>
