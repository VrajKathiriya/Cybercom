<template>
  <div class="card product-card">
    <img :src="product.images[0]" class="card-img-top" alt="Product Image" />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ product.price }}
      </h6>
      <p class="card-text">{{ product.description }}</p>
      <span class="badge bg-primary">{{ product.category.name }}</span>
      <div class="mt-3">
        <button class="btn btn-primary me-2" @click="editProduct(product.id)">
          Edit
        </button>
        <button class="btn btn-danger me-2" @click="deleteProduct(product.id)">
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: this.$route.params.id,
      product: {},
    };
  },
  created() {
    // fetch("https://api.escuelajs.co/api/v1/products/" + this.id)
    //   .then((res) => res.json())
    //   .then((data) => (this.product = data));

    // axios
    this.$http
      .get("https://api.escuelajs.co/api/v1/products/" + this.id)
      .then((res) => {
        console.log(res);
        this.product = res.data;
      })
      .catch((error) => {
        this.error = error;
        console.error("Error fetching product:", error);
      });
  },
  methods: {
    deleteProduct(id) {
      this.$http
        .delete("https://api.escuelajs.co/api/v1/products/" + id)
        // .then(() => this.$router.push({ path: "/" }));
        .then(() => this.$router.push({ name: "ProductList" }));
    },
    editProduct(id) {
      this.$router.push({ name: "EditProduct", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.product-card {
  max-width: 400px;
  margin: 20px auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-card .card-img-top {
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
}

.product-card .card-body {
  padding: 20px;
}

.product-card .card-title {
  font-size: 1.25rem;
  margin-bottom: 10px;
}

.product-card .card-subtitle {
  font-size: 1rem;
  color: #6c757d;
  margin-bottom: 10px;
}

.product-card .card-text {
  margin-bottom: 15px;
}

.product-card .badge {
  margin-right: 5px;
}

.product-card .button-group button {
  margin-right: 10px;
}
</style>
