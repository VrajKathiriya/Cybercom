import { LOGIN_ACTION, SIGNUP_ACTION } from "@/store/storeConstants";
import axios from "./../../../axios";

export default {
  async [SIGNUP_ACTION](context, payload) {
    let postData = {
      name: payload.name,
      email: payload.email,
      password: payload.password,
      avatar: "https://picsum.photos/800",
    };

    console.log(postData);
    let response = await axios.post(`/users/`, postData);
    if (response.status == 201) {
      alert("User created successfully");
    }
  },

  async [LOGIN_ACTION](context, payload) {
    let credentials = {
      email: payload.email,
      password: payload.password,
    };

    let response = await axios.post("/auth/login", credentials);
    console.log(response);
    if (response.status == 201) {
      context.commit("saveToken", { token: response.data.access_token });
    } else {
      alert("Please provide valid credentials");
    }
  },

  async getUserProfile(context) {
    let response = await axios.get("/auth/profile");
    context.commit("saveUserProfile", { user: response.data });
    console.log(response);
  },

  logoutUser(context) {
    console.log("logout successfully");
    context.commit("clearToken");
  },
};
