<template>
  <v-app>
    <v-main>
      <v-toolbar color="indigo" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title> Learning Nuxt </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text>
            <n-link to="/">Home</n-link>
          </v-btn>
          <v-btn text>
            <n-link to="/weather-app">Weather App</n-link>
          </v-btn>

          <v-btn text @click="logout"> Logout </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <transition>
        <nuxt />
      </transition>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  methods: {
    logout() {},
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
</style>
