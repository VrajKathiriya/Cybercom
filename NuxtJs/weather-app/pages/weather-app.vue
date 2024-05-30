<template>
  <v-container>
    <h1 class="display-1 text-center">Weather App</h1>
    <v-flex xs12>
      <v-card color="blue-grey darken-2">
        <v-card-text>
          <v-layout justify-center>
            <v-flex class="text-center">
              <h4>Temperature</h4>
              <h1 class="display-1">{{ weather.name }}</h1>
              <img :src="icon" alt="weather icon" />
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
    <v-form @submit.prevent="getWeatherInfo">
      <v-flex xs12 class="mt-4">
        <v-text-field v-model="city" label="Enter city name" solo>
        </v-text-field>
      </v-flex>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'WeatherApp',
  data() {
    return {
      city: 'London',
      weather: {},
    }
  },
  created() {
    this.getWeatherInfo()
  },
  computed: {
    icon() {
      return this.weather.weather
        ? `https://api.openweathermap.org/img/w/${this.weather.weather[0].icon}`
        : ''
    },
  },
  methods: {
    getWeatherInfo() {
      this.$axios
        .$get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${process.env.weatherAppId}`
        )
        .then((res) => (this.weather = res))
    },
  },
}
</script>

<style></style>
