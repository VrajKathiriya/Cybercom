<template>
  <v-app>
    <v-main>
      <v-toolbar color="indigo" dark>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-toolbar-title> Weather.com </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-if="$auth.loggedIn">{{ $auth.user.name }}</v-btn>
        <v-toolbar-items class="hidden-sm-and-down">
          <v-btn text>
            <n-link to="/">Home</n-link>
          </v-btn>
          <v-btn text>
            <n-link to="/weather-app">Weather App</n-link>
          </v-btn>
          <!-- if user logged in -->
          <v-btn text v-if="$auth.loggedIn" @click="logoutUser">logout</v-btn>
          <!-- if user not logged in -->
          <v-btn text to="/login" v-if="!$auth.loggedIn"> Login </v-btn>
          <v-btn text to="/register" v-if="!$auth.loggedIn">Register</v-btn>
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
    async logoutUser() {
      try {
        await this.$auth.logout()
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
::-webkit-scrollbar {
  display: none;
}
</style>
