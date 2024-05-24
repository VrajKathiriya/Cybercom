const todoItem = Vue.component("todo-item", {
  props: ["todo"],
  template: `<li>{{todo}}<button @click="remove">remove</button></li>`,
  methods: {
    remove() {
      this.$emit("remove");
    },
  },
});

const vm = new Vue({
  el: "#app",
  data: {
    name: "vraj",
    content: "",
    todos: [],
  },
  methods: {
    addTodo() {
      this.todos = [...this.todos, this.content];
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
  },
});
