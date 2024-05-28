<template>
  <div class="container todo-container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header todo-header text-center">
            <h3>To-Do List</h3>
          </div>
          <div class="card-body">
            <form @submit.prevent="handleAddTodo">
              <div class="input-group mb-3">
                <input
                  type="text"
                  v-model="title"
                  class="form-control"
                  placeholder="title"
                />
              </div>
              <div class="input-group mb-3">
                <input
                  type="text"
                  v-model="description"
                  class="form-control"
                  placeholder="description"
                />
              </div>
              <div class="input-group mb-3">
                <div class="input-group-append">
                  <button class="btn btn-primary" type="submit">Add</button>
                </div>
              </div>
            </form>
          </div>
          <ul class="list-group mt-3" id="todoList">
            <li
              v-for="(todo, index) in todos"
              :key="index"
              class="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h5>{{ todo.title }}</h5>
                <p>{{ todo.description }}</p>
              </div>
              <button
                class="btn btn-danger btn-sm"
                @click="handleRemoveTodo(index)"
              >
                Delete
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data() {
    return {
      title: "",
      description: "",
      todos: [],
    };
  },
  created() {
    this.todos = this.getTodos(`${this.user.id}`);
    console.log(this.todos);
  },

  computed: {
    ...mapState("auth", { user: (state) => state.user }),
    ...mapGetters("todo", ["getTodos"]),
  },
  methods: {
    ...mapActions("todo", ["addTodo", "removeTodo"]),
    handleAddTodo() {
      if (!this.title || !this.description) return;
      const newTodo = {
        userId: this.user.id,
        title: this.title,
        description: this.description,
        completed: false,
      };
      this.addTodo(newTodo);
      this.title = "";
      this.description = "";
    },
    handleRemoveTodo(index) {
      this.removeTodo(index);
    },
  },
};
</script>

<style>
body {
  background-color: #f8f9fa;
}
.todo-container {
  margin-top: 50px;
}
.todo-header {
  margin-bottom: 30px;
}
</style>
