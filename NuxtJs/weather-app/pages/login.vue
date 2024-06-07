<template>
  <v-container fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Login</v-card-title>
          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="email"
                label="Email"
                required
                type="email"
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                required
                type="password"
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="loginUser">Login</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      valid: true,
    }
  },
  methods: {
    async loginUser() {
      try {
        const loginResponse = await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        console.log(loginResponse)
        console.log(this.$auth.loggedIn)
      } catch (err) {
        console.log('error in login', err)
      }
    },
  },
}
</script>

<style></style>
