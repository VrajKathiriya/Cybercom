<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedCategory"
          :items="categories"
          label="Category"
          item-text="name"
          item-value="name"
          @change="filterProducts"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-select
          v-model="selectedSorting"
          :items="sortOptions"
          label="Sort By"
          @change="sortProducts"
        ></v-select>
      </v-col>
      <v-col cols="12" md="3">
        <v-btn color="info" to="/products/add-product">
          <v-icon left>mdi-plus</v-icon>
          Add Product
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <div v-if="loading">Loading...</div>
      <template v-else>
        <ProductCard
          v-for="product in displayedProducts"
          :key="product.id"
          :product="product"
          :isAdded="cartProductsId.includes(product.id)"
          @deleteProduct="handleDeleteProduct"
          @addToCart="handleAddToCart"
        />
      </template>
    </v-row>
    <v-row justify="center" v-if="pages > 1">
      <v-col>
        <v-pagination
          v-model="currentPage"
          :length="pages"
          @input="paginate"
        ></v-pagination>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data() {
    return {
      // products: [],
      // categories: [],
      // selectedCategory: null,
      // selectedSorting: null,
      // loading: true,
      // error: null,
      itemsPerPage: 3,
      currentPage: 1,
      sortOptions: [
        { text: 'Price: Low to High', value: 'price_asc' },
        { text: 'Price: High to Low', value: 'price_desc' },
      ],
      cartProductsId: [],
      isAdded: false,
    }
  },
  middleware: 'auth',
  async asyncData({ store }) {
    await store.dispatch('category/fetchCategories')
  },

  computed: {
    ...mapState('product', {
      products: (state) => state.products,
      loading: (state) => state.loading,
      error: (state) => state.error,
    }),

    ...mapState('cart', { carts: (state) => state.carts }),

    ...mapState('category', { categories: (state) => state.categories }),

    selectedCategory: {
      get() {
        return this.$store.state.product.selectedCategory
      },

      set(value) {
        this.$store.commit('product/setSelectedCategory', value)
      },
    },

    selectedSorting: {
      get() {
        return this.$store.state.product.selectedSorting
      },

      set(value) {
        this.$store.commit('product/setSelectedSorting', value)
      },
    },

    displayedProducts() {
      let filteredProducts = this.products || []
      if (this.selectedCategory) {
        filteredProducts = filteredProducts.filter(
          (product) => product.category.name === this.selectedCategory
        )
      }
      if (this.selectedSorting === 'price_asc') {
        filteredProducts.sort((a, b) => a.price - b.price)
      } else if (this.selectedSorting === 'price_desc') {
        filteredProducts.sort((a, b) => b.price - a.price)
      }

      const startIndex = (this.currentPage - 1) * this.itemsPerPage
      const endIndex = startIndex + this.itemsPerPage
      return filteredProducts.slice(startIndex, endIndex)
    },
    pages() {
      return Math.ceil(this.products?.length / this.itemsPerPage)
    },
  },
  methods: {
    ...mapActions('product', ['fetchProducts', 'deleteProduct']),

    // all products fetching
    // async fetchProducts() {
    //   console.log('fetch products called')
    //   try {
    //     const response = await this.$apollo.query({
    //       // Use defaultClient for query
    //       query: gql`
    //         query {
    //           products {
    //             id
    //             title
    //             price
    //             description
    //             images
    //             category {
    //               name
    //             }
    //           }
    //         }
    //       `,
    //     })

    //     console.log('response', response)
    //     this.products = response.data.products
    //     this.categories = [
    //       ...new Set(
    //         response.data.products.map((product) => product.category.name)
    //       ),
    //     ]
    //   } catch (error) {
    //     console.log('error', error)
    //     this.error = error
    //   } finally {
    //     this.loading = false
    //   }
    // },

    handleAddToCart(productId) {
      this.cartProductsId = [...this.cartProductsId, productId]
    },

    // handle delete product
    handleDeleteProduct(productId) {
      this.deleteProduct(productId)
    },

    // pagination
    paginate(page) {
      this.currentPage = page
    },

    // filter
    filterProducts() {
      this.currentPage = 1
    },

    // sorting
    sortProducts() {
      this.currentPage = 1
    },
  },

  mounted() {
    // console.log('products page mounted')
    this.fetchProducts()
    this.carts.forEach((cart) => {
      if ((cart.userId = this.$auth.user.id)) {
        this.cartProductsId = cart.products.map((product) => product.id)
      }
    })
    console.log(this.cartProductsId)
  },
}
</script>

<style scoped>
.link-button {
  background-color: transparent;
  text-decoration: none;
  color: inherit;
  border: none;
}
</style>
