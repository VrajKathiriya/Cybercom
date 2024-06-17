<template>
  <v-row justify="center" v-if="pages > 1">
    <v-col>
      <v-pagination
        v-model="page"
        :length="pages"
        :disabled="isLoading"
        @input="paginate"
      ></v-pagination>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('beds', {
      isLoading: (state) => state.isLoading,
      itemsPerPage: (state) => state.itemsPerPage,
      itemsCount: (state) => state.itemsCount,
    }),
    page: {
      get() {
        return this.$store.state.beds.page
      },
      set(value) {
        this.setPage(value)
      },
    },

    pages() {
      return Math.ceil(this.itemsCount / this.itemsPerPage)
    },
  },
  methods: {
    ...mapActions('beds', ['fetchBeds', 'setPage']),
    paginate() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      this.fetchBeds()
    },
  },
}
</script>
