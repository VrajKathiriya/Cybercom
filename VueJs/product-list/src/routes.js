import ProductList from "./components/ProductList.vue";
import AddProduct from "./components/AddProduct.vue";
import ProductItem from "./components/ProductItem.vue";
import EditProduct from "./components/EditProduct.vue";

export default [
  {
    path: "/",
    name: "ProductList",
    component: ProductList,
  },
  {
    path: "/add-product",
    name: "AddProduct",
    component: AddProduct,
  },
  {
    path: "/edit-product/:id",
    name: "EditProduct",
    component: EditProduct,
  },
  {
    path: "/product/:id",
    component: ProductItem,
  },
];
