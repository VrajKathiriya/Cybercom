<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="product-card" @click="navigateToProduct">
      <v-img :src="product.images[0]" contain height="150px"></v-img>
      <v-card-title>{{ product.title }}</v-card-title>
      <v-card-subtitle>{{ product.category.name }}</v-card-subtitle>
      <v-card-text>
        <div>{{ product.description }}</div>
        <div class="font-weight-bold mt-3">{{ product.price | currency }}</div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <!-- <v-btn
          small
          :to="`/product/${product.id}`"
          color="primary"
          class="action-buttons"
        >
          <v-icon small left>mdi-information</v-icon>
          Details
        </v-btn> -->
        <v-btn
          small
          outlined
          class="action-buttons"
          color="info"
          @click.stop="onAddToCart"
        >
          <v-icon small left>mdi-cart</v-icon>
          Add
        </v-btn>
        <v-btn
          small
          outlined
          color="primary"
          :to="`/products/edit-product/${product.id}`"
          class="action-buttons"
          @click.stop
        >
          <v-icon small left>mdi-pencil</v-icon>
          Edit
        </v-btn>
        <v-btn
          small
          outlined
          color="red"
          @click.stop="onDeleteProduct(product.id)"
          class="action-buttons"
        >
          <v-icon small left>mdi-delete</v-icon>
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
    ...mapActions('cart', ['addToCart']),
    onDeleteProduct(productId) {
      this.deleteProduct(productId)
    },
    navigateToProduct() {
      this.$router.push(`/product/${this.product.id}`)
    },
    onAddToCart() {
      this.addToCart({ userId: this.$auth.user.id, product: this.product })
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
.action-buttons {
  margin-left: 4px;
}
</style>
