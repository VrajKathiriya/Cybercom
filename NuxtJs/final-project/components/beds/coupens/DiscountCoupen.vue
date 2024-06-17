<template>
  <v-chip color="red lighten-2" class="coupon-tag" outlined>
    {{ label }}
  </v-chip>
</template>

<script>
export default {
  name: 'DiscountCoupen',
  props: {
    label: {
      type: String,
    },
  },
  created() {
    console.log(this.label)
  },
}
</script>

<style scoped>
.coupon-tag {
  font-weight: bold;
  font-size: 1rem;
  padding: 0.5rem;
  margin: 0.5rem 0;
}
</style>
