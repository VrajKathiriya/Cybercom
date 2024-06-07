<template>
  <v-container>
    <h2>Add Product</h2>
    <v-form @submit.prevent="onAddProduct">
      <v-text-field v-model="product.title" label="Title"></v-text-field>
      <v-textarea
        v-model="product.description"
        label="Description"
      ></v-textarea>
      <v-text-field
        v-model="product.price"
        label="Price"
        type="number"
      ></v-text-field>
      <v-select
        v-model="product.categoryId"
        :items="categories"
        label="Category"
        item-text="name"
        item-value="id"
      ></v-select>
      <v-btn type="submit" color="primary">Submit</v-btn>
    </v-form>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      product: {
        title: '',
        description: '',
        price: null,
        categoryId: null,
        images: ['https://placeimg.com/640/480/any'],
      },
    }
  },
  computed: {
    ...mapState('category', { categories: (state) => state.categories }),
  },

  async asyncData({ store }) {
    await store.dispatch('category/fetchCategories')
  },

  methods: {
    ...mapActions('product', ['addProduct']),
    ...mapActions('category', ['fetchCategories']),

    async onAddProduct() {
      const response = this.addProduct(this.product)
      if (response) {
        this.$router.push('/products')
      }
    },
  },
}
</script>
