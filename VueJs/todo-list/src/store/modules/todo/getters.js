export default {
  getTodos: (state) => (userId) => {
    return state.todos.filter((todo) => todo.userId == userId);
  },
  user(state) {
    return state.user;
  },
  token(state) {
    return state.token;
  },
};
