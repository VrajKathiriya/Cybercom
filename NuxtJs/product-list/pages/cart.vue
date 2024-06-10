<template>
  <v-container>
    <v-row class="cart-items">
      <v-col cols="12" v-for="product in products" :key="product.id">
        <v-card class="product-card">
          <v-row no-gutters align="center">
            <v-col cols="2" class="d-flex align-center justify-center">
              <v-img
                :src="product.images[0]"
                contain
                height="80px"
                width="80px"
              ></v-img>
            </v-col>
            <v-col cols="10">
              <v-row no-gutters align="center">
                <v-col cols="3">
                  <v-card-title class="text-h6">{{
                    product.title
                  }}</v-card-title>
                  <v-card-subtitle class="text-subtitle-2">{{
                    product.category.name
                  }}</v-card-subtitle>
                </v-col>
                <v-col cols="2">
                  <div>
                    {{ product.price | currency }}
                  </div>
                </v-col>
                <v-col cols="3" class="d-flex align-center">
                  <v-btn
                    icon
                    small
                    @click="onDecrementQuantity(product.id)"
                    color="error"
                  >
                    <v-icon small>mdi-minus</v-icon>
                  </v-btn>
                  <span class="mx-2">{{ product.quantity }}</span>
                  <v-btn
                    icon
                    small
                    @click="onIncrementQuantity(product.id)"
                    color="success"
                  >
                    <v-icon small>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
                <v-col cols="2">
                  <div class="font-weight-bold">
                    {{ productTotalAmount(product) | currency }}
                  </div>
                </v-col>
                <v-col cols="2" class="d-flex align-center justify-end">
                  <v-btn icon color="red" @click="removeProduct(product.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="cart-summary sticky-bottom">
      <v-col cols="12" class="d-flex justify-space-between">
        <span
          >Total Items:
          <span class="font-weight-bold">{{ totalItems }}</span></span
        >
        <span
          >Total Price:
          <span class="font-weight-bold">
            {{ totalPrice | currency }}</span
          ></span
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { GET_PRODUCT } from '~/graphql/queries/product'
export default {
  data() {
    return {
      products: [],
    }
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

  computed: {
    ...mapState('cart', { carts: (state) => state.carts }),
    totalItems() {
      return this.products.reduce((a, b) => a + b.quantity, 0)
    },
    totalPrice() {
      return this.products.reduce((a, b) => a + b.price * b.quantity, 0)
    },
  },

  async created() {
    await this.fetchCarts()
    this.setProducts()
    console.log(this.products)
  },

  methods: {
    ...mapActions('cart', [
      'incrementQuantity',
      'decrementQuantity',
      'removeFromCart',
    ]),

    fetchCarts() {
      this.$store.dispatch('cart/fetchCarts')
    },

    setProducts() {
      this.carts.forEach((cart) => {
        if (cart.userId == this.$auth.user.id) {
          this.products = cart.products
        }
      })
    },

    removeProduct(productId) {
      this.removeFromCart(productId)
    },
    onIncrementQuantity(productId) {
      this.incrementQuantity(productId)
      console.log(this.products)
    },
    onDecrementQuantity(productId) {
      this.decrementQuantity(productId)
      console.log(this.products)
    },
    productTotalAmount(product) {
      return product.price * product.quantity
    },
  },
}
</script>

<style>
.product-card {
  margin-bottom: 20px;
  padding: 10px;
}
.cart-items {
  max-height: 80vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.cart-items::-webkit-scrollbar {
  display: none;
}

.cart-summary {
  border-top: 1px solid #ddd;
  padding: 10px 0;
}

.sticky-bottom {
  position: sticky;
  bottom: 0;
  z-index: 1;
}
</style>
