export default {
  saveToken(state, payload) {
    state.token = payload.token;
  },
  clearToken(state) {
    state.user = {};
    state.token = null;
  },
  saveUserProfile(state, payload) {
    state.user = payload.user;
  },
};
