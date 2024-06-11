// plugins/persistCartState.js
export default ({ store }) => {
  if (process.client) {
    // Load cart state from localStorage
    const savedCarts = localStorage.getItem('carts')
    if (savedCarts) {
      store.commit('cart/setCarts', JSON.parse(savedCarts) || [])
    }

    // Subscribe to store updates and save cart state to localStorage
    store.subscribe((mutation, state) => {
      console.log('mutation type', mutation)
      if (mutation.type.startsWith('cart/')) {
        localStorage.setItem('carts', JSON.stringify(state.cart.carts))
      }
    })
  }
}
