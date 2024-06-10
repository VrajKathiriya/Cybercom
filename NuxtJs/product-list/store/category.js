import { GET_CATEGORIES } from '~/graphql/queries/category'

export const state = () => ({
  categories: [],
})

export const mutations = {
  // set categories
  setCategories(state, categories) {
    state.categories = categories
  },
}

export const actions = {
  // fetch all categories
  async fetchCategories(context) {
    const apolloClient = this.app.apolloProvider.defaultClient

    const response = await apolloClient.query({
      query: GET_CATEGORIES,
    })

    context.commit('setCategories', response.data.categories)
  },
}
