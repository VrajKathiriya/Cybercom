<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="miniVariant"
      :clipped="clipped"
      fixed
      app
      color="accent"
    >
      <v-list dense>
        <template v-for="(item, i) in items">
          <!-- if there is no childern -->
          <v-list-item
            v-if="!item.children"
            :to="item.to"
            router
            exact
            :key="item.to"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <!-- if there is children -->
          <v-list-group
            v-else
            :key="i"
            v-model="item.model"
            :prepend-icon="item.icon"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, index) in item.children"
              :key="index"
              :to="child.to"
              router
              exact
            >
              <v-list-item-action>
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
      class="app-bar"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>

    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }} 1StopBedrooms</span>
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
      miniVariant: false,
      title: '1StopBedrooms',
      items: [
        {
          icon: 'mdi-home',
          title: 'Home',
          to: '/',
        },
        {
          icon: 'mdi-bed-double',
          title: 'Bedroom',

          children: [
            {
              icon: 'mdi-bed',
              title: 'Beds',
              to: '/bedroom/beds',
            },
            {
              icon: 'mdi-bed-queen',
              title: 'Bedroom Sets',
              to: '/bedroom/bedroom-sets',
            },
          ],
        },
      ],
    }
  },
}
</script>

<style scoped>
.app-bar {
  color: #fff;
}
</style>
