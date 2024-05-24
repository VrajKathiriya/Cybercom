import { createStore } from "vuex";

export const store = createStore({
  state: {
    todos: JSON.parse(localStorage.getItem("todos")) || [],
  },
  getters: {
    getTodos(state) {
      return state.todos;
    },
  },
  mutations: {
    addTodo(state, newTodo) {
      state.todos.push(newTodo);
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
    removeTodo(state, index) {
      console.log(index);

      // this will not work
      // state.todos = state.todos.filter((todo, i) => i != index)

      // this is working
      // state.todos.splice(index, 1);
      state.todos = [...state.todos.filter((todo, i) => i != index)];
      localStorage.setItem("todos", JSON.stringify(state.todos));
    },
  },
  actions: {
    addTodo(context, payload) {
      context.commit("addTodo", payload);
    },
    removeTodo(context, payload) {
      context.commit("removeTodo", payload);
    },
  },
});
