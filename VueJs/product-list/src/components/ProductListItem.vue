<template>
  <div class="card product-card">
    <img :src="product.images[0]" class="card-img-top" alt="Product Image" />
    <div class="card-body">
      <h5 class="card-title">{{ product.title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted">
        {{ formatPrice(product.price) }}
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

        <button class="btn btn-info me-2">
          <router-link :to="'/product/' + product.id">Details</router-link>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductListItem",

  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(price);
    },
    deleteProduct(id) {
      this.$http
        .delete("https://api.escuelajs.co/api/v1/products/" + id)
        // .then(() => this.$router.push({ path: "/" }));
        .then(() => this.$emit("productDeleted", id));
    },
    editProduct(id) {
      this.$router.push({ name: "EditProduct", params: { id: id } });
    },
  },
};
</script>

<style scoped>
.product-card {
  margin: 15px;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.card-img-top {
  object-fit: contain;
  height: 200px;
}
</style>
