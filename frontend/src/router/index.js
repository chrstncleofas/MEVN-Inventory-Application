import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import AddProduct from '../components/AddProduct.vue';
import EditProduct from '../components/EditProduct.vue';
import ProductDetail from '../components/ProductDetail.vue';
import ProductList from '../components/ProductList.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/add', component: AddProduct },
    { path: '/edit/:id', component: EditProduct },
    { path: '/product/:id', component: ProductDetail },
    { path: '/products', component: ProductList }
  ]
});

export default router;
