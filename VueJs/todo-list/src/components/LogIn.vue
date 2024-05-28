<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h1>Login</h1>
          <hr />
        </div>
        <form @submit.prevent="onLogin()">
          <div class="form-group">
            <label for="">Email</label>
            <input type="text" class="form-control" v-model.trim="email" />
            <div class="error" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="">Password</label>
            <input type="password" class="form-control" v-model="password" />
            <div class="error" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          <div class="my-3">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import LoginValidations from "@/services/LoginValidations";
import { LOGIN_ACTION } from "@/store/storeConstants";
import { mapActions } from "vuex";
import { mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: [],
    };
  },
  watch: {
    token(newToken) {
      if (newToken) {
        console.log(newToken);
        this.userProfile();
        this.email = "";
        this.password = "";
        this.$router.push("/");
      }
    },
  },
  computed: {
    ...mapState("auth", {
      token: (state) => state.token,
    }),
  },
  methods: {
    ...mapActions("auth", {
      login: LOGIN_ACTION,
      userProfile: "getUserProfile",
    }),
    onLogin() {
      // validation
      let validations = new LoginValidations(this.email, this.password);

      this.errors = validations.checkValidations();

      if ("email" in this.errors || "password" in this.errors) return false;

      // login
      this.login({ email: this.email, password: this.password });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
