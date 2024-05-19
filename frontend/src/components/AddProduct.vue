<template>
    <div>
        <h2 class="text-2xl font-bold mb-4">Add Product</h2>
        <form @submit.prevent="addProduct">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Product ID</label>
                <input v-model="ProductID"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" readonly>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Product Name</label>
                <input v-model="ProductName"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Quantity</label>
                <input v-model="Qty"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Category</label>
                <input v-model="Category"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" required>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Date</label>
                <input v-model="date"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text" readonly>
            </div>
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2">Image</label>
                <input @change="onFileChange"
                    class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    name="image"
                    type="file" required>
            </div>
            <div class="mb-4">
                <button
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit">Add Product</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

// Function to generate unique Product ID
const generateProductId = () => {
    const prefix = 'PD';
    const timestamp = Date.now().toString().slice(-4);
    return `${prefix}${timestamp}`;
};

const ProductID = ref(generateProductId());
const ProductName = ref('');
const Qty = ref(0);
const Category = ref('');
const date = ref(new Date().toISOString().slice(0, 10)); // Format: YYYY-MM-DD
const imageFile = ref(null);

const router = useRouter();

const onFileChange = (e) => {
    imageFile.value = e.target.files[0];
};

const addProduct = async () => {
    try {
        const formData = new FormData();
        formData.append('ProductID', ProductID.value);
        formData.append('ProductName', ProductName.value);
        formData.append('Qty', Qty.value);
        formData.append('Category', Category.value);
        formData.append('Date', date.value);
        formData.append('Image', imageFile.value);

        await axios.post('http://localhost:5000/api/products', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        router.push('/products'); // Redirect to product list after adding
    } catch (error) {
        console.error(error);
    }
};

onMounted(() => {
    ProductID.value = generateProductId();
    date.value = new Date().toISOString().slice(0, 10);
});
</script>