<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Edit Product</h2>
        <form @submit.prevent="editProduct">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                <input v-model="productName"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <input v-model="category"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" required>
            </div>
            <div class="mb-4">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">Save Changes</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const router = useRouter();
const productId = router.currentRoute.value.params.id;

const productName = ref('');
const category = ref('');

onMounted(async () => {
    try {
        const response = await axios.get(`http://localhost:5000/api/products/${productId}`);
        const productData = response.data;
        productName.value = productData.productName;
        category.value = productData.category;
        // Set other fields here
    } catch (error) {
        console.error(error);
    }
});

const editProduct = async () => {
    try {
        const updatedProduct = {
            productName: productName.value,
            category: category.value
        };
        await axios.put(`http://localhost:5000/api/products/${productId}`, updatedProduct);
        router.push('/products');
    } catch (error) {
        console.error(error);
    }
};
</script>