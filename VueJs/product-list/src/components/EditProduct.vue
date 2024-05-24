<template>
  <div class="container mt-5">
    <h2>Edit Product</h2>
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
        <label for="category" class="form-label">Category</label>
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
      <button type="submit" class="btn btn-primary">Update Product</button>
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
        categoryId: "",
      },
      categories: [],
      error: null,
    };
  },
  created() {
    this.fetchCategories();
    this.fetchProduct();
  },
  methods: {
    fetchCategories() {
      this.$http
        .get(`https://api.escuelajs.co/api/v1/categories`)
        .then((res) => {
          this.categories = res.data;
        })
        .catch((error) => {
          this.error = error;
          console.error("Error fetching categories:", error);
        });
    },
    fetchProduct() {
      const productId = this.$route.params.id;
      this.$http
        .get(`https://api.escuelajs.co/api/v1/products/${productId}`)
        .then((res) => {
          this.product = res.data;
          console.log(this.product);
        })
        .catch((error) => {
          this.error = error;
          console.error("Error fetching product:", error);
        });
    },
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
      const productId = this.$route.params.id;
      console.log("product", this.product);
      this.product.images = ["https://placeimg.com/640/480/any"];
      this.$http
        .put(
          `https://api.escuelajs.co/api/v1/products/${productId}`,
          this.product
        )
        .then((res) => {
          console.log("Product updated:", res.data);
          // Optionally navigate to the product list or details page
          this.$router.push({ name: "ProductList" });
        })
        .catch((err) => {
          this.error = err;
          console.error("Error updating product:", err);
        });
    },
  },
};
</script>
