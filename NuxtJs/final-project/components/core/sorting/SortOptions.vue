<template>
  <v-col cols="4">
    <v-select
      v-model="sortOption"
      :items="sortOptions"
      :disabled="isLoading"
      label="Sort By"
      @change="sortBeds"
    ></v-select>
  </v-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      sortOptions: [
        { text: 'Recommended', value: 'RELEVANCE' },
        { text: 'Price: Low to High', value: 'PRICE_FROM_LOW' },
        { text: 'Price: High to Low', value: 'PRICE_FROM_HIGHT' },
      ],
    }
  },
  computed: {
    ...mapState('beds', { isLoading: (state) => state.isLoading }),
    sortOption: {
      get() {
        return this.$store.state.beds.sortOption
      },
      set(value) {
        this.setSortOption(value)
      },
    },
  },
  methods: {
    ...mapActions('beds', ['fetchBeds', 'setSortOption']),

    sortBeds() {
      this.fetchBeds()
    },
  },
}
</script>
