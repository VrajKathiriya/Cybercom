<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
      <v-btn color="accent" class="mr-2" v-if="$auth.loggedIn">
        <v-icon left>mdi-account</v-icon>
        {{ $auth.user.name }}
      </v-btn>
      <v-btn text color="info" class="mr-2" to="/login" v-if="!$auth.loggedIn">
        <v-icon left>mdi-login</v-icon>
        Login
      </v-btn>
      <v-btn text color="red" v-if="$auth.loggedIn" @click="logout">
        <v-icon left>mdi-logout</v-icon>
        Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-package-variant-closed',
          title: 'Products',
          to: '/products',
        },
        {
          icon: 'mdi-cart',
          title: 'My Cart',
          to: 'cart',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'ProductManagement',
    }
  },
  methods: {
    async logout() {
      try {
        await this.$auth.logout()
      } catch (err) {
        console.log(err)
      }
    },
  },
}
</script>
