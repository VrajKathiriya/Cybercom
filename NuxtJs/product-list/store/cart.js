import Vue from 'vue'

export const state = {
  carts: [],
}

export const mutations = {
  // set carts
  setCarts(state, carts) {
    state.carts = carts
  },

  // add new cart
  setToCart(state, cart) {
    state.carts = JSON.parse(localStorage.getItem('carts')) || []

    state.carts = [...state.carts, cart]

    localStorage.setItem('carts', JSON.stringify(state.carts))
  },

  // add new product
  setAddedProduct(state, { userId, product }) {
    state.carts = JSON.parse(localStorage.getItem('carts')) || []
    const newProduct = product
    newProduct.quantity = 1
    state.carts.forEach((cart) => {
      if (cart.userId == userId) {
        cart.products = [...cart.products, newProduct]
      }
    })

    localStorage.setItem('carts', JSON.stringify(state.carts))
  },

  // set increment quantity
  setIncrementQuantity(state, productId) {
    state.carts.forEach((cart) => {
      if (cart.userId == this.$auth.user.id) {
        cart.products.forEach((product) => {
          if (product.id == productId) {
            product.quantity++
          }
        })
      }
    })
    localStorage.setItem('carts', JSON.stringify(state.carts))
  },

  // set decrement quantity
  setDecrementQuantity(state, productId) {
    state.carts.forEach((cart) => {
      if (cart.userId == this.$auth.user.id) {
        cart.products.forEach((product) => {
          if (product.id == productId && product.quantity > 1)
            product.quantity--
        })
      }
    })

    localStorage.setItem('carts', JSON.stringify(state.carts))
  },

  // remove from cart
  removeFromCart(state, productId) {
    let cartIsEmpty = false
    state.carts.forEach((cart, index) => {
      if (cart.userId == this.$auth.user.id) {
        cart.products = cart.products.filter(
          (product) => product.id != productId
        )
        if (cart.products.length == 0) cartIsEmpty = true
      }
    })
    if (cartIsEmpty) {
      state.carts = state.carts.filter(
        (cart) => cart.userId != this.$auth.user.id
      )
    }

    localStorage.setItem('carts', JSON.stringify(state.carts))
  },
}

export const actions = {
  // fetch carts from localStorage
  fetchCarts(context) {
    const carts = JSON.parse(localStorage.getItem('carts')) || []
    context.commit('setCarts', carts)
  },

  // add new cart or product
  async addToCart(context, { userId, product }) {
    let isPresent = false
    context.state.carts.forEach((cart) => {
      if (cart.userId == userId) {
        isPresent = true
      }
    })

    if (isPresent) {
      context.commit('setAddedProduct', { userId, product })
    } else {
      product.quantity = 1
      let cart = {
        id: Date.now(),
        userId: userId,
        products: [product],
      }
      context.commit('setToCart', cart)
    }
  },

  // increment quantity
  incrementQuantity(context, productId) {
    context.commit('setIncrementQuantity', productId)
  },

  // decrement quantity
  decrementQuantity(context, productId) {
    context.commit('setDecrementQuantity', productId)
  },

  // remove from cart
  removeFromCart(context, productId) {
    context.commit('removeFromCart', productId)
  },
}

/*

carts:[
  {
    id:1021,
    userId: 12,
    products: [
      {
        id: 12,
        quantity:2
      },
      {
        id:1,
        quantity:4
      }
    ]
  },
  {
    id:1021,
    userId: 12,
    products: [
      {
        id: 12,
        quantity:2
      },
      {
        id:1,
        quantity:4
      }
    ]
  }
]

*/
