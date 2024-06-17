<template>
  <v-row>
    <Loader v-if="isLoading" />
    <template v-else>
      <BedCard v-for="bed in beds" :key="bed.id" :bed="bed" />
    </template>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import BedCard from './BedCard.vue'
import Loader from '../core/Loader.vue'
export default {
  components: {
    BedCard,
    Loader,
  },
  computed: {
    ...mapState('beds', {
      beds: (state) => state.beds,
      isLoading: (state) => state.isLoading,
    }),
  },
  methods: {
    ...mapActions('beds', ['fetchBeds']),
  },
}
</script>
