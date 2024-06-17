<template>
  <v-col cols="2">
    <v-card
      v-for="filter in filtersBlock"
      :key="filter.title"
      class="filter-card"
    >
      <v-card-title>{{ filter.title }}</v-card-title>
      <div class="checkbox-container">
        <v-checkbox
          v-for="(facet, i) in filter.facets"
          :key="i"
          :label="facet.attrLabel"
          :value="isFacetSelected(filter.attrCode, facet.attrValue)"
          :disabled="isLoading"
          @change="onCheckboxChange($event, filter, facet)"
        ></v-checkbox>
      </div>
    </v-card>
  </v-col>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('beds', {
      filtersBlock: (state) => state.filtersBlock,
      isLoading: (state) => state.isLoading,
      selectedFacets: (state) => state.selectedFacets,
    }),
  },

  methods: {
    onCheckboxChange(event, filter, facet) {
      this.$emit('handleCheckboxChange', event, filter, facet)
    },

    isFacetSelected(attrCode, attrValue) {
      const facet = this.selectedFacets.find(
        (f) => f.attributeCode === attrCode
      )
      return facet ? facet.values.some((v) => v.value === attrValue) : false
    },
  },
}
</script>

<style scoped>
.filter-card {
  height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
}
</style>
