<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <h2>{{ count }} is {{ evenOrOdd }}</h2>
  <button class="btn btn-sm btn-primary mx-2" @click="increment">+</button>
  <button class="btn btn-sm btn-primary mx-2" @click="decrement">-</button>
  <button class="btn btn-sm btn-primary mx-2" @click="incrementByValue(5)">
    +5
  </button>
  <button class="btn btn-sm btn-primary mx-2" @click="decrementByValue(5)">
    -5
  </button>
  <button class="btn btn-sm btn-primary mx-2" @click="reset">reset</button>
</template>

<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
const count = computed(() => store.state.count); //useSelector
const evenOrOdd = computed(() => store.getters.evenOrOdd);

const increment = () => {
  store.dispatch("increment");
};

const decrement = () => {
  store.dispatch("decrement");
};

const incrementByValue = (value) => {
  store.dispatch("incrementByValue", value);
};

const decrementByValue = (value) => {
  store.dispatch("decrementByValue", value);
};

const reset = () => {
  store.dispatch("reset");
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
