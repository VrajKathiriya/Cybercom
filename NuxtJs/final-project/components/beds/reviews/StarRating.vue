<template>
  <div class="star-rating">
    <span
      v-for="star in maxStars"
      :key="star"
      class="star"
      :class="{ 'star-filled': star <= rating }"
    >
      ★
    </span>
    <span class="total-reviews">({{ number }})</span>
  </div>
</template>

<script>
export default {
  name: 'StarRating',
  props: {
    rating: {
      type: Number,
      required: true,
    },
    number: {
      type: Number,
      required: true,
    },
    maxStars: {
      type: Number,
      default: 5,
    },
  },
}
</script>

<style scoped>
.star-rating {
  display: flex;
  align-items: center;
}
.star {
  font-size: 1rem;
  color: #d3d3d3;
}
.star-filled {
  /* color: #ffd055; */
  color: #f2600a;
}
.total-reviews {
  font-size: 12px;
}
</style>
