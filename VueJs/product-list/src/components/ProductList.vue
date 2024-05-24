<template>
  <div class="product-list">
    <h2>Products List</h2>
    <ProductListItem
      v-for="product in products"
      :key="product.id"
      :product="product"
      @productDeleted="handleDeletedProduct($event)"
    ></ProductListItem>
  </div>
</template>

<script>
import ProductListItem from "./ProductListItem.vue";

export default {
  name: "ProductList",
  components: { ProductListItem },
  props: {
    msg: String,
  },
  data() {
    return {
      products: [],
    };
  },
  created() {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((res) => res.json())
      .then((data) => {
        this.products = data;
        console.log(this.products);
      });
  },
  methods: {
    handleDeletedProduct(deletedProductId) {
      this.products = this.products.filter(
        (product) => product.id !== deletedProductId
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
