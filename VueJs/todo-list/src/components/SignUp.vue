<template>
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h1>Signup</h1>
          <hr />
        </div>
        <form @submit.prevent="onSignUp()">
          <div class="form-group">
            <label for="">Name</label>
            <input type="text" class="form-control" v-model="name" />
            <div class="error" v-if="errors.name">{{ errors.name }}</div>
          </div>
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
            <button type="submit" class="btn btn-primary">Signup</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { SIGNUP_ACTION } from "@/store/storeConstants";
import SignupValidations from "../services/SignupValidations";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      errors: [],
    };
  },
  computed: {},
  methods: {
    ...mapActions("auth", {
      signup: SIGNUP_ACTION,
    }),

    onSignUp() {
      // validation
      let validations = new SignupValidations(
        this.name,
        this.email,
        this.password
      );

      console.log(validations);

      this.errors = validations.checkValidations();
      console.log("errors", this.errors);

      if (
        "email" in this.errors ||
        "password" in this.errors ||
        "name" in this.errors
      )
        return false;

      // signup
      this.signup({
        name: this.name,
        email: this.email,
        password: this.password,
      });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
