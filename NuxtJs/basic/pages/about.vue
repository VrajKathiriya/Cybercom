<template>
  <div>
    <Navbar />
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  layout: 'about',
  middleware: 'test',
  asyncData() {
    return {
      title: 'About',
    }
  },
  head() {
    return {
      title: 'About',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'my amazing about page',
        },
      ],
      // script: [{ src: '/about.js' }],
    }
  },
}
</script>

<style></style>
