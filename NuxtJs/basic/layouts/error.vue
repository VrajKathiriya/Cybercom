<template>
  <div>
    <h2>this is error page</h2>
    <h1>{{ error.statusCode }} not found</h1>
  </div>
</template>

<script>
export default {
  layout: 'error-layout',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
}
</script>

<style></style>
