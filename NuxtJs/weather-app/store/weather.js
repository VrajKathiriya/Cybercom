export const state = () => ({
  city: 'London',
  weather: {},
})

export const mutations = {
  setCity(state, payload) {
    state.city = payload
  },
  setWeather(state, payload) {
    state.weather = payload
  },
}

export const getters = {
  getCity(state) {
    return state.city
  },
}

export const actions = {
  getWeatherInfo(context) {
    return this.$axios
      .$get(
        `/api/data/2.5/weather?q=${context.state.city}&appid=${process.env.weatherAppId}`
      )
      .then((res) => context.commit('setWeather', res))
      .catch((error) => {
        console.error('Error fetching weather information:', error)
      })
  },
}
