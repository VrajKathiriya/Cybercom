<template>
  <v-container class="fill-height" fluid>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="4">
        <v-card class="pa-5 transparent-card">
          <v-card-title class="headline text-center">
            <v-icon large class="mr-2">mdi-account</v-icon>
            Welcome Back
          </v-card-title>
          <v-card-text>
            <v-form v-model="valid">
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
            <v-btn color="primary" @click="login"> Login </v-btn>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-actions>
            don't have an account?
            <v-spacer></v-spacer>
            <v-btn text color="secondary" @click="register"> Register </v-btn>
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
      valid: true,
      email: '',
      password: '',
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
    async login() {
      try {
        if (this.valid) {
          const loginResponse = await this.$auth.loginWith('local', {
            data: {
              email: this.email,
              password: this.password,
            },
          })
          if (loginResponse) {
            this.$router.push('/')
          }
        }
      } catch (err) {
        console.log('error in login', err)
      }
    },
    register() {
      // Redirect to the registration page
      this.$router.push('/register')
    },
  },
}
</script>

<style scoped>
.fill-height {
  min-height: 80vh;
}

.transparent-card {
  border-radius: 10px;
  box-shadow: none;
}
</style>
