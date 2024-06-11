export const state = () => ({
  carts: [],
})

export const mutations = {
  // set carts
  setCarts(state, carts) {
    state.carts = carts
  },

  // add new cart
  setToCart(state, cart) {
    state.carts = [...state.carts, cart]
  },

  // add new product
  setAddedProduct(state, { userId, product }) {
    const newProduct = { ...product, quantity: 1 }
    state.carts.forEach((cart) => {
      if (cart.userId == userId) {
        cart.products = [...cart.products, newProduct]
      }
    })
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
  },

  // remove from cart
  removeFromCart(state, { productId, userId }) {
    let cartIsEmpty = false
    state.carts.forEach((cart, index) => {
      if (cart.userId == userId) {
        cart.products = [
          ...cart.products.filter((product) => product.id != productId),
        ]
        if (cart.products.length == 0) cartIsEmpty = true
      }
    })
    if (cartIsEmpty) {
      state.carts = [...state.carts.filter((cart) => cart.userId != userId)]
    }
  },
}

export const actions = {
  // fetch carts from localStorage
  fetchCarts({ commit }) {
    const carts = JSON.parse(localStorage.getItem('carts')) || []
    commit('setCarts', carts)
  },

  // add new cart or product
  async addToCart(context, { userId, product }) {
    let isPresent = false
    context.state.carts.forEach((cart) => {
      if (cart.userId === userId) {
        isPresent = true
      }
    })

    if (isPresent) {
      context.commit('setAddedProduct', { userId, product })
    } else {
      product.quantity = 1
      const cart = {
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
  removeFromCart({ commit }, { productId, userId }) {
    commit('removeFromCart', { productId, userId })
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
