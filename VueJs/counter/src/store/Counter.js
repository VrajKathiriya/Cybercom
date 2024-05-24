import { createStore } from "vuex";

export const store = createStore({
  state: {
    count: 0,
  },
  getters: {
    evenOrOdd(state) {
      return state.count % 2 === 0 ? "even" : "odd";
    },
  },
  mutations: {
    increment(state) {
      state.count++;
    },
    decrement(state) {
      state.count--;
    },
    incrementByValue(state, payload) {
      state.count += payload;
    },
    decrementByValue(state, payload) {
      state.count -= payload;
    },
    reset(state) {
      state.count = 0;
    },
  },
  actions: {
    increment(obj) {
      console.log(obj);
      obj.commit("increment");
    },
    decrement(obj) {
      obj.commit("decrement");
    },
    incrementByValue(obj, payload) {
      obj.commit("incrementByValue", payload);
    },
    decrementByValue(obj, payload) {
      obj.commit("decrementByValue", payload);
    },
    reset(obj) {
      obj.commit("reset");
    },
  },
});
