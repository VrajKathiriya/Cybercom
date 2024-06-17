<template>
  <v-container fluid>
    <h2>Beds</h2>
    <v-row>
      <!-- Filters Column -->
      <FiltersBlock @handleCheckboxChange="handleFiltersChange" />

      <!-- Main Content Column -->
      <v-col cols="10">
        <v-row>
          <!-- showing sorting options -->
          <SortOptions />

          <!-- showing total items -->
          <v-col cols="4">
            <div>Total items: {{ itemsCount }}</div>
          </v-col>

          <!-- showing items per page option -->
          <ItemsPerPageOptions />
        </v-row>

        <!-- show selected filters -->

        <SelectedFilters
          @removeFilter="handleRemoveFilter"
          @clearAllFilters="handleClearAllFilters"
        />

        <!-- showing all beds data -->
        <BedList />

        <!-- showing pagination -->
        <Paginator />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Loader from '~/components/core/Loader.vue'
import FiltersBlock from '~/components/core/filters/FiltersBlock.vue'
import SelectedFilters from '~/components/core/filters/SelectedFilters.vue'
import SortOptions from '~/components/core/sorting/SortOptions.vue'
import Paginator from '~/components/core/pagination/Paginator.vue'
import ItemsPerPageOptions from '~/components/core/pagination/ItemsPerPageOptions.vue'
import BedList from '~/components/beds/BedList.vue'

export default {
  components: {
    BedList,
    Loader,
    FiltersBlock,
    SelectedFilters,
    SortOptions,
    Paginator,
    ItemsPerPageOptions,
  },
  // when component is created
  created() {
    this.fetchBeds()
    this.getAllFilters()
  },

  // computed properties
  computed: {
    ...mapState('beds', {
      beds: (state) => state.beds,
      page: (state) => state.page,
      itemsCount: (state) => state.itemsCount,
      filtersBlock: (state) => state.filtersBlock,
      isLoading: (state) => state.isLoading,
    }),
  },

  methods: {
    ...mapActions('beds', ['fetchBeds', 'getAllFilters', 'setPage']),

    async handleFiltersChange(event, filter, facet) {
      const newFacet = {
        attributeCode: filter.attrCode,
        attrLabel: facet.attrLabel,
        value: facet.attrValue,
      }
      if (event) {
        this.$store.commit('beds/ADD_SELECTED_FACET', newFacet)
      } else {
        this.$store.commit('beds/REMOVE_SELECTED_FACET_VALUE', {
          attributeCode: filter.attrCode,
          value: facet.attrValue,
        })
      }
      await this.fetchBeds()
      this.setPage(1)
    },

    handleRemoveFilter(attributeCode, filterValue) {
      this.$store.commit('beds/REMOVE_SELECTED_FACET_VALUE', {
        attributeCode: attributeCode,
        value: filterValue.value,
      })
      this.fetchBeds()
    },

    handleClearAllFilters() {
      this.$store.commit('beds/CLEAR_ALL_FACETS')
      this.setPage(1)
      this.fetchBeds()
    },
  },
}
</script>

<style scoped></style>

/* facet:[ {attributeCode: "bed_size_measure", value: ["16957"]} {attributeCode:
"bed_type", value: ["13900"]}] */
