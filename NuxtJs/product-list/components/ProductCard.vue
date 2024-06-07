<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="product-card">
      <v-img :src="product.images[0]" contain height="150px"></v-img>
      <v-card-title>{{ product.title }}</v-card-title>
      <v-card-subtitle>{{ product.category.name }}</v-card-subtitle>
      <v-card-text>
        <div>{{ product.description }}</div>
        <div class="font-weight-bold mt-3">{{ product.price | currency }}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn :to="`/product/${product.id}`" color="primary">
          <v-icon>mdi-information</v-icon>
          Details</v-btn
        >
        <v-btn color="info" :to="`/products/edit-product/${product.id}`">
          <v-icon left>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn color="red" @click="onDeleteProduct(product.id)">
          <v-icon left>mdi-delete</v-icon>
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  filters: {
    currency(value) {
      if (typeof value !== 'number') {
        return value
      }
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value)
    },
  },
  methods: {
    ...mapActions('product', ['deleteProduct']),
    onDeleteProduct(productId) {
      this.deleteProduct(productId)
    },
  },
}
</script>

<style scoped>
/* Add any scoped styles here */
.product-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.v-card-text {
  flex-grow: 1;
}
</style>
