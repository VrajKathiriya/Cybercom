<template>
  <v-container>
    <v-row>
      <div v-if="!product">Loading...</div>
      <v-col v-else cols="12">
        <v-btn small color="accent" @click="$router.back()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-card class="mt-4">
          <v-img :src="product.images[0]" contain height="300px"></v-img>
          <v-card-title>{{ product.title }}</v-card-title>
          <v-card-subtitle>{{ product.category.name }}</v-card-subtitle>
          <v-card-text>
            <div>{{ product.description }}</div>
            <div class="font-weight-bold mt-3">
              {{ product.price | currency }}
            </div>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" :to="`/products/edit-product/${product.id}`">
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
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import { GET_PRODUCT } from '~/graphql/queries/product'
export default {
  data() {
    return {
      product: null,
    }
  },
  async mounted() {
    const response = await this.$apollo.query({
      query: GET_PRODUCT,
      variables: {
        id: this.$route.params.id,
      },
    })

    this.product = response.data.product
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
      const response = this.deleteProduct(productId)
      if (response) {
        this.$router.push('/products')
      }
    },
  },
}
</script>
