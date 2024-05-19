<template>
  <div class="container mx-auto py-8">
    <RouterLink to="/add" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4 rounded focus:outline-none focus:shadow-outline inline-block">
      Add Product
    </RouterLink>
    <div class="overflow-x-auto">
      <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product Name
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="product in products" :key="product.ProductID">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.ProductName }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.Category }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ product.Qty }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <router-link :to="`/product/${product.ProductID}`" class="text-blue-600 hover:text-blue-900 mr-4">
                  <i class="fas fa-eye"></i>
                </router-link>
                <router-link :to="`/edit/${product.ProductID}`" class="text-indigo-600 hover:text-indigo-900 mr-4">
                  <i class="fas fa-edit"></i>
                </router-link>
                <button @click="deleteProduct(product.ProductID)" class="text-red-600 hover:text-red-900">
                  <i class="fas fa-trash-alt"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter, RouterLink } from 'vue-router';

const products = ref([]);

const fetchProducts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/products');
    products.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const deleteProduct = async (ProductID) => {
  try {
    await axios.delete(`http://localhost:5000/api/products/${ProductID}`);
    fetchProducts();
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchProducts);
</script>

<style>
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");
</style>
