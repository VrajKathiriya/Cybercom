Vue.component("greeting", {
  template: `
  <div>
  <p>Hey there, I am {{name}}  <button @click="changeName">change name</button></p>
  <slot></slot>
  </div>
  `,
  props: {
    name: {
      type: String,
      default: "john",
    },
  },
  data() {
    return {
      // name: "Vraj",
    };
  },
  methods: {
    // changeName() {
    //   this.name = "Mario";
    // },
    changeName() {
      this.$emit("change-name", "sita");
    },
  },
});

const vm1 = new Vue({
  el: "#vue-app-one",
  data: {
    name: "vraj",
  },
  methods: {
    changeName(newName) {
      this.name = newName;
    },
  },
});

const vm2 = new Vue({
  el: "#vue-app-two",
  data: {},
});

const vm = new Vue({
  el: "#vue-app",
  data: {
    output: "mango",
  },
  methods: {
    readRefs() {
      console.log(this.$refs.test.innerText);
      this.output = this.$refs.input.value;
    },
  },
});
