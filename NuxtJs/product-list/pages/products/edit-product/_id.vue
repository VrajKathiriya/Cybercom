<template>
  <v-container>
    <h2>Edit Product</h2>
    <v-form @submit.prevent="onEditProduct">
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
import { GET_PRODUCT } from '~/graphql/queries/product'

export default {
  data() {
    return {
      product: {
        title: '',
        description: '',
        price: null,
        categoryId: null,
      },
    }
  },

  computed: {
    ...mapState('category', { categories: (state) => state.categories }),
  },

  async mounted() {
    await this.fetchCategories()
    await this.fetchCurrentProduct()
  },

  methods: {
    ...mapActions('product', ['updateProduct']),
    ...mapActions('category', ['fetchCategories']),

    async fetchCurrentProduct() {
      try {
        const response = await this.$apollo.query({
          query: GET_PRODUCT,
          variables: {
            id: this.$route.params.id,
          },
        })
        const product = response.data.product
        this.product.title = product.title
        this.product.description = product.description
        this.product.price = product.price
        this.product.categoryId = product.category.id
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    },

    async onEditProduct() {
      const { id } = this.$route.params
      const { title, description, price, categoryId } = this.product
      const images = ['https://placeimg.com/640/480/any']

      const product = {
        id: id,
        title: title,
        description: description,
        price: price,
        categoryId: categoryId,
        images: images,
      }

      const response = this.updateProduct(product)
      if (response) {
        this.$router.push('/products')
      }
    },
  },
}
</script>
