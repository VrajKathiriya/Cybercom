<template>
  <div class="selected-filters mb-2" v-if="selectedFacets.length">
    <span>Selected Filters:</span>
    <span v-for="(facet, index) in selectedFacets" :key="index">
      <v-chip
        v-for="(filterValue, i) in facet.values"
        :key="i"
        close
        class="ma-2"
        :disabled="isLoading"
        @click:close="onRemoveFilter(facet.attributeCode, filterValue)"
      >
        {{ filterValue.attrLabel }}
      </v-chip>
    </span>
    <v-btn
      small
      color="secondary"
      @click="onClearAllFilters"
      :disabled="isLoading"
      >Clear All</v-btn
    >
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('beds', {
      selectedFacets: (state) => state.selectedFacets,
      isLoading: (state) => state.isLoading,
    }),
  },

  methods: {
    onRemoveFilter(attributeCode, filterValue) {
      this.$emit('removeFilter', attributeCode, filterValue)
    },

    onClearAllFilters() {
      this.$emit('clearAllFilters')
    },
  },
}
</script>
