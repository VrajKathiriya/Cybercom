<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand">Navbar</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Home</router-link>
          </li>
          <li class="nav-item" v-if="token">
            <router-link class="nav-link" to="/todos">Todos</router-link>
          </li>
          <li class="nav-item" v-if="!token">
            <router-link class="nav-link" to="/login">Login</router-link>
          </li>
          <li class="nav-item" v-if="!token">
            <router-link class="nav-link" to="/signup">Signup</router-link>
          </li>
          <li class="nav-item" v-if="token">
            <router-link class="nav-link" to="/login" @click="logout"
              >Logout</router-link
            >
          </li>
        </ul>
        <div>
          <b>{{ user.name }}</b>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("auth", {
      logoutUser: "logoutUser",
    }),
    logout() {
      this.logoutUser();
    },
  },
  computed: {
    ...mapGetters("auth", {
      user: "profile",
    }),
    ...mapState("auth", {
      token: (state) => state.token,
    }),
  },
};
</script>

<style scoped></style>
