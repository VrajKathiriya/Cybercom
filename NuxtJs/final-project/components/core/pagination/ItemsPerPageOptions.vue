<template>
  <v-col cols="4">
    <v-select
      v-model="itemsPerPageOption"
      :items="itemsPerPageOptions"
      label="Items per page"
      :disabled="isLoading"
      @change="onChangeItemsPerPageOption"
    ></v-select>
  </v-col>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data() {
    return {
      itemsPerPageOptions: [
        { text: '36', value: 'PER_PAGE_36' },
        {
          text: '48',
          value: 'PER_PAGE_48',
        },
        {
          text: '72',
          value: 'PER_PAGE_72',
        },
      ],
    }
  },
  computed: {
    ...mapState('beds', { isLoading: (state) => state.isLoading }),
    itemsPerPageOption: {
      get() {
        return this.$store.state.beds.itemsPerPageOption
      },
      set(value) {
        this.setItemsPerPageOption(value)
      },
    },
  },

  methods: {
    ...mapActions('beds', ['fetchBeds', 'setItemsPerPageOption']),
    onChangeItemsPerPageOption() {
      this.fetchBeds()
    },
  },
}
</script>
