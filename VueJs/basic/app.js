Vue.component("todo-item", {
  props: ["todo"],
  template: `
  <li>{{todo.name}}</li>`,
});

const app = new Vue({
  el: "#vue-app",
  data: {
    name: "",
    website: "https://www.google.com",
    websiteTag: `<a href="https://www.google.com">google</a>`,
    age: 20,
    a: 0,
    b: 0,
    x: 0,
    y: 0,
    todos: [
      {
        id: 1,
        name: "first",
      },
      {
        id: 2,
        name: "second",
      },
    ],
    firstName: "vraj",
    lastName: "kathiriya",
    fullName: "vraj kathiriya",
  },

  watch: {
    firstName: function (val) {
      this.fullName = val + " " + this.lastName;
    },
    lastName: function (val) {
      this.fullName = this.firstName + " " + val;
    },
  },
  methods: {
    greet: function (time) {
      return `Good ${time} ${this.name}`;
    },
    add: function (year) {
      this.age = this.age + year;
    },
    subtract(year) {
      this.age = this.age - year;
    },
    updateXY(event) {
      this.x = event.offsetX;
      this.y = event.offsetY;
    },
    click() {
      alert("clicked");
    },
    logName() {
      // console.log("logName");
      console.log("you entered your name");
    },
    logAge() {
      // console.log("logAge");
      console.log("you entered your age");
    },
    // addToA() {
    //   console.log("addToA");
    //   return this.a + this.age;
    // },
    // addToB() {
    //   console.log("addToB");
    //   return this.b + this.age;
    // },
    // reverseFullName() {
    //   console.log("method ");
    //   return this.fullName.split("").reverse().join("");
    // },
  },
  computed: {
    addToA() {
      console.log("addToA");
      return this.a + this.age;
    },
    addToB() {
      console.log("addToB");
      return this.b + this.age;
    },
    reverseFullName() {
      console.log("computed prop");
      return this.fullName.split("").reverse().join("");
    },
  },
});

const one = new Vue({
  el: "#vue-one",
  data: {
    title: "Vue app one",
  },
  methods: {
    greet() {
      return "Helllo from app one";
    },
  },
});

const two = new Vue({
  el: "#vue-two",
  data: {
    title: "Vue app two",
  },
  methods: {
    greet() {
      return "Hello from app two";
    },
    changeTitle() {
      one.title = "title changed by instance two";
      // also change methods
      // one.greet = function () {
      //   return "hi";
      // };
    },
  },
});

// also we can change from outside
// two.title = "change from outside";
