import {
  GET_ALL_BEDS,
  GET_ALL_FILTERSBLOCK,
} from '~/graphql/queries/bedQueries'

export const state = () => ({
  page: 1,
  itemsPerPage: 36,
  itemsPerPageOption: 'PER_PAGE_36',
  itemsCount: null,
  sortOption: 'RELEVANCE',
  filtersBlock: [],
  selectedFacets: [],
  beds: [],
  abortController: null,
  isLoading: false,
})

export const mutations = {
  // set beds
  SET_BEDS(state, beds) {
    state.beds = beds
  },

  // set which page to fetch
  SET_PAGE(state, page) {
    state.page = page
  },

  // set items count
  SET_ITEMS_COUNT(state, count) {
    state.itemsCount = count
  },

  SET_SORT_OPTION(state, sortOption) {
    state.sortOption = sortOption
  },

  SET_ITEMS_PER_PAGE_OPTION(state, pageOption) {
    state.itemsPerPageOption = pageOption
    state.itemsPerPage = pageOption.slice(-2)
  },

  SET_FILTERS_BLOCK(state, filtersBlock) {
    state.filtersBlock = filtersBlock
  },

  ADD_SELECTED_FACET(state, newFacet) {
    let isAdded = false
    state.selectedFacets.forEach((facet) => {
      if (facet.attributeCode == newFacet.attributeCode) {
        facet.values.push({
          attrLabel: newFacet.attrLabel,
          value: newFacet.value,
        })
        isAdded = true
      }
    })
    if (!isAdded) {
      let facet = {
        attributeCode: newFacet.attributeCode,
        values: [
          {
            attrLabel: newFacet.attrLabel,
            value: newFacet.value,
          },
        ],
      }
      state.selectedFacets = [...state.selectedFacets, facet]
    }
  },

  REMOVE_SELECTED_FACET(state, filter) {
    state.selectedFacets = state.selectedFacets.filter(
      (facet) => facet.attributeCode !== filter.attributeCode
    )
  },

  REMOVE_SELECTED_FACET_VALUE(state, { attributeCode, value }) {
    const facet = state.selectedFacets.find(
      (facet) => facet.attributeCode === attributeCode
    )
    if (facet) {
      facet.values = facet.values.filter((v) => v.value !== value)
      if (facet.values.length === 0) {
        state.selectedFacets = state.selectedFacets.filter((f) => f !== facet)
      }
    }
  },

  CLEAR_ALL_FACETS(state) {
    state.selectedFacets = []
  },

  SET_ABORT_CONTROLLER(state, controller) {
    state.abortController = controller
  },

  SET_LOADING(state, isLoading) {
    state.isLoading = isLoading
  },
}

export const actions = {
  // beds data fetching
  async fetchBeds({ state, commit }) {
    // if (state.abortController) {
    //   state.abortController.abort()
    // }

    // const abortController = new AbortController()
    // commit('SET_ABORT_CONTROLLER', abortController)
    // let facet = [{attributeCode,value:[]}]
    let facet = state.selectedFacets.map((facet) => ({
      attributeCode: facet.attributeCode,
      value: facet.values.map((value) => value.value),
    }))
    commit('SET_LOADING', true)
    try {
      const apolloClient = this.app.apolloProvider.defaultClient
      const response = await apolloClient.query({
        query: GET_ALL_BEDS,
        variables: {
          page: state.page,
          sortBy: state.sortOption,
          perPage: state.itemsPerPageOption,
          facet: facet,
        },
        // context: {
        //   fetchOptions: {
        //     signal: abortController.signal,
        //   },
        // },
      })
      commit(
        'SET_ITEMS_COUNT',
        response.data.listing.listingCategory.itemsCount
      )
      commit('SET_BEDS', response.data.listing.listingCategory.items)
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request canceled:', error.message)
      } else {
        console.error('Error fetching beds:', error)
      }
    } finally {
      commit('SET_LOADING', false)
      commit('SET_ABORT_CONTROLLER', null)
    }
  },

  async getAllFilters(context) {
    const apolloClient = this.app.apolloProvider.defaultClient
    const response = await apolloClient.query({
      query: GET_ALL_FILTERSBLOCK,
      variables: {
        page: context.state.page,
        sortBy: context.state.sortOption,
        perPage: context.state.itemsPerPageOption,
      },
    })
    console.log('filters response', response)
    context.commit(
      'SET_FILTERS_BLOCK',
      response.data.listing.listingCategory.filtersBlock
    )
    console.log(context.state.filtersBlock)
  },

  setPage(context, page) {
    context.commit('SET_PAGE', page)
  },

  setItemsCount(context, itemsCount) {
    context.commit('SET_ITEMS_COUNT', itemsCount)
  },

  setSortOption(context, sortOption) {
    context.commit('SET_SORT_OPTION', sortOption)
    context.commit('SET_PAGE', 1)
  },

  setItemsPerPageOption(context, page) {
    context.commit('SET_ITEMS_PER_PAGE_OPTION', page)
    context.commit('SET_PAGE', 1)
  },

  // setSelectedFacets(context, selectedFacets) {
  //   context.commit('setSelectedFacets', selectedFacets)
  // },
}
