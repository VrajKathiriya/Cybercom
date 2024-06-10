<template>
  <v-container fluid class="d-flex align-center justify-center fill-height">
    <v-col cols="12" sm="8" md="4">
      <v-card class="pa-5 transparent-card">
        <v-card-title class="headline text-center">
          <v-icon large class="mr-2">mdi-account-plus</v-icon>
          Create Account
        </v-card-title>
        <v-card-text>
          <v-form v-model="valid">
            <v-text-field
              v-model="name"
              label="Name"
              :rules="nameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="email"
              label="Email"
              :rules="emailRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              :rules="passwordRules"
              required
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="register"> Register </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        <v-card-actions>
          already have an account?
          <v-spacer></v-spacer>
          <v-btn text color="secondary" @click="login"> Login </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import { CREATE_USER } from '~/graphql/mutations/userMutations'
export default {
  data() {
    return {
      valid: true,
      name: '',
      email: '',
      password: '',
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length >= 2 || 'Name must be at least 2 characters',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length >= 6 || 'Password must be at least 6 characters',
      ],
    }
  },
  methods: {
    async register() {
      if (this.valid) {
        const registerResponse = await this.$apollo.mutate({
          mutation: CREATE_USER,
          variables: {
            name: this.name,
            email: this.email,
            password: this.password,
          },
        })

        if (registerResponse.data.addUser) {
          this.$router.push('/login')
        }
      }
    },
    login() {
      // Redirect to the login page
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.fill-height {
  min-height: 80vh;
  background: none; /* Set your preferred background */
}
.transparent-card {
  /* background: rgba(255, 255, 255, 0.8); */
  border-radius: 10px;
  box-shadow: none;
}
</style>
