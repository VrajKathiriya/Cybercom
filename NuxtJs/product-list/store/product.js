import gql from 'graphql-tag'
import {
  CREATE_PRODUCT,
  DELETE_PRODUCT,
  UPDATE_PRODUCT,
} from '~/graphql/mutations/product'
import { GET_PRODUCTS } from '~/graphql/queries/product'

export const state = () => ({
  products: [],
  loading: false,
  error: null,
  selectedCategory: null,
  selectedSorting: null,
})

export const mutations = {
  // set products
  setProducts(state, products) {
    state.products = products
  },

  // add product to products
  setAddProduct(state, product) {
    state.products = [...[...state.products, product]]
  },

  // set updated product
  setUpdatedProduct(state, updatedProduct) {
    state.products = [
      ...state.products.map((product) => {
        if (product.id == updatedProduct.id) {
          return updatedProduct
        } else return product
      }),
    ]
  },

  // remove product from products
  setRemoveProduct(state, productId) {
    state.products = state.products.filter((product) => product.id != productId)
  },

  // set loading state
  setLoading(state, status) {
    state.loading = status
  },

  // set error
  setError(state, error) {
    state.error = error
  },

  // set selected category
  setSelectedCategory(state, category) {
    state.selectedCategory = category
  },

  // set selected sorting
  setSelectedSorting(state, sorting) {
    state.selectedSorting = sorting
  },
}

export const actions = {
  // fetch all products
  async fetchProducts(context) {
    const apolloClient = this.app.apolloProvider.defaultClient

    if (!apolloClient) {
      throw new Error('Apollo client not found')
    }

    context.commit('setLoading', true)
    try {
      const response = await apolloClient.query({
        // Use defaultClient for query
        query: GET_PRODUCTS,
      })

      context.commit('setProducts', response.data.products)
    } catch (error) {
      console.log('error in product fetching', error)
      context.commit('setError', error)
    } finally {
      context.commit('setLoading', false)
    }
  },

  // delete product
  async deleteProduct(context, payload) {
    let productId = payload
    const confirmed = confirm('Are you sure?')
    if (!confirmed) return

    const apolloClient = this.app.apolloProvider.defaultClient

    try {
      const response = await apolloClient.mutate({
        mutation: DELETE_PRODUCT,
        variables: { id: productId },
      })

      if (response.data.deleteProduct) {
        // Wait for the setRemoveProduct mutation to complete before removing from the cart
        await context.commit('setRemoveProduct', productId)
        context.commit(
          'cart/removeFromCart',
          {
            userId: this.$auth.user.id,
            productId: productId,
          },
          { root: true }
        )
        return true
      }
    } catch (error) {
      console.error('Error deleting product:', error)
      return false
    }
  },

  // add new product
  async addProduct(context, payload) {
    const product = payload

    const apolloClient = this.app.apolloProvider.defaultClient

    const response = await apolloClient.mutate({
      mutation: CREATE_PRODUCT,
      variables: {
        title: product.title,
        description: product.description,
        price: parseFloat(product.price),
        categoryId: parseFloat(product.categoryId),
        images: product.images,
      },
    })

    if (response.data.addProduct) {
      context.commit('setAddProduct', response.data.addProduct)
      return true
    }
  },

  // update a product
  async updateProduct(context, payload) {
    const product = payload

    const apolloClient = this.app.apolloProvider.defaultClient

    const response = await apolloClient.mutate({
      mutation: UPDATE_PRODUCT,
      variables: {
        id: product.id,
        title: product.title,
        description: product.description,
        price: parseFloat(product.price),
        categoryId: parseFloat(product.categoryId),
        images: product.images,
      },
    })

    if (response.data.updateProduct) {
      context.commit('setUpdatedProduct', response.data.updateProduct)
      return true
    }
  },
}
