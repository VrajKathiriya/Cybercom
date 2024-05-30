<template>
  <h2>{{ $route.params.id }}</h2>
</template>

<script>
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id)
  },
}
</script>

<style></style>
