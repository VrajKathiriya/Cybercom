<template>
  <div class="container mt-5">
    <h2>Add Product</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-3">
        <label for="productTitle" class="form-label">Product Title</label>
        <input
          type="text"
          class="form-control"
          id="productTitle"
          :value="product.title"
          @input="updateTitle"
          required
        />
      </div>
      <div class="mb-3">
        <label for="productDescription" class="form-label"
          >Product Description</label
        >
        <textarea
          class="form-control"
          id="productDescription"
          :value="product.description"
          @input="updateDescription"
          required
        ></textarea>
      </div>
      <div class="mb-3">
        <label for="productPrice" class="form-label">Product Price</label>
        <input
          type="number"
          class="form-control"
          id="productPrice"
          :value="product.price"
          @input="updatePrice"
          required
        />
      </div>
      <div class="mb-3">
        <select name="category" id="category" @change="updateCategory">
          <option
            v-for="category in categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Add Product</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        title: "",
        description: "",
        price: "",
        images: ["https://placeimg.com/640/480/any"],
      },
      categories: [],
    };
  },
  created() {
    this.$http
      .get(`https://api.escuelajs.co/api/v1/categories`)
      .then((res) => (this.categories = res.data));
  },
  methods: {
    updateTitle(event) {
      this.product.title = event.target.value;
    },
    updateDescription(event) {
      this.product.description = event.target.value;
    },
    updatePrice(event) {
      this.product.price = event.target.value;
    },
    updateCategory(event) {
      this.product.categoryId = event.target.value;
    },
    submitForm() {
      // Logic to handle form submission, e.g., sending data to a server
      console.log("Product added:", this.product);

      this.$http
        .post(`https://api.escuelajs.co/api/v1/products`, this.product)
        .then((data) => {
          this.product = data;
          this.product.title = "";
          this.product.description = "";
          this.product.price = "";
        })
        .catch((err) => console.log(err));
      // Reset form fields
    },
  },
};
</script>

<style scoped>
/* Add any scoped styles if needed */
</style>
