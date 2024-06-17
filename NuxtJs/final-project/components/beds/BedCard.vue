<template>
  <v-col cols="12" sm="6" md="4">
    <v-card class="bed-card">
      <v-img
        :src="currentImage"
        contain
        height="150px"
        @mouseover="applyHoverImage"
        @mouseleave="removeHoverImage"
      ></v-img>

      <!-- Primary deal tag -->
      <PrimaryDealTag
        v-if="bed.tags.primaryDealTag"
        :primaryDealTag="bed.tags.primaryDealTag"
        class="primary-deal-tag"
      />

      <v-card-title>{{ bed.name }}</v-card-title>
      <v-card-text>
        <div>{{ bed.brand.name }}</div>
        <div class="font-weight-bold mt-3">
          <span>{{ bed.price.finalPrice | currency }}</span>
          <span v-if="bed.price.msrp" class="text-decoration-line-through">
            {{ bed.price.msrp | currency }}
          </span>
        </div>
      </v-card-text>

      <!-- discount coupen -->
      <!-- <DiscountCoupen
        v-if="bed.labels.length > 0"
        :label="bed.labels.length > 0 ? bed.labels[0] : ''"
      /> -->

      <!-- memorial deal coupen -->
      <MemorialDealCoupen v-if="bed.price.getSale" />

      <!-- star rating component -->
      <StarRating
        v-if="bed.reviews.rating"
        :rating="bed.reviews ? bed.reviews.rating : ''"
        :number="bed.reviews ? bed.reviews.number : ''"
        class="star-rating"
      />
    </v-card>
  </v-col>
</template>

<script>
import PrimaryDealTag from '~/components/beds/tags/PrimaryDealTag.vue'
import MemorialDealCoupen from '~/components/beds/coupens/MemorialDealCoupen.vue'
import DiscountCoupen from '~/components/beds/coupens/DiscountCoupen.vue'
import StarRating from '~/components/beds/reviews/StarRating.vue'

export default {
  components: {
    PrimaryDealTag,
    MemorialDealCoupen,
    DiscountCoupen,
    StarRating,
  },
  props: {
    bed: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      currentImage: this.bed.images.mainImage
        ? this.bed.images.mainImage.src
        : '',
    }
  },

  methods: {
    applyHoverImage() {
      if (this.bed.images.hoverImage && this.bed.images.hoverImage.src) {
        this.currentImage = this.bed.images.hoverImage.src
      }
    },
    removeHoverImage() {
      if (this.bed.images.mainImage && this.bed.images.mainImage.src) {
        this.currentImage = this.bed.images.mainImage.src
      }
    },
  },
}
</script>

<style scoped></style>

<style scoped>
.bed-card {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}
.primary-deal-tag {
  position: absolute;
  top: 0;
  left: 0;
}
.text-decoration-line-through {
  text-decoration: line-through;
  font-size: 12px;
  opacity: 0.8;
}
.star-rating {
  margin: 0 8px;
}
</style>
