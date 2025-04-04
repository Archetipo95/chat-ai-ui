<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useUserStore } from '../stores/user';
import { useRouter } from 'vue-router';
import robotImage from '../assets/robot.png';

// const userStore = useUserStore();
const router = useRouter();

const name = ref('');
const email = ref('');
const loading = ref(false);
const error = ref('');

const createUser = async () => {
  if (!name.value || !email.value) {
    error.value = 'Name and email are required';
    return;
  }

  loading.value = true;
  error.value = '';

  try {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/register-user`,
      {
        name: name.value,
        email: email.value,
      }
    );

    userStore.setUser({
      userId: data.userId,
      name: data.name,
    });

    router.push('/chat');
  } catch (err) {
    error.value = 'Something went wrong. Please try again';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="h-screen flex items-center justify-center bg-gray-900 text-white">
    <div class="p-8 bg-gray-800 rounded-lg shadow-lg w-full max-w-md" aria-live="polite">
      <img :src="robotImage" alt="Illustration of a robot welcoming users to Chat AI" class="mx-auto w-24 h-24 mb-4" />
      <h1 class="text-2xl font-semibold mb-4 text-center">
        Welcome To Chat AI
      </h1>

      <label for="name" class="block text-sm font-medium mb-1">
        Name
      </label>
      <input
        type="text"
        id="name"
        aria-required="true"
        class="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:shadow-outline-oreo"
        placeholder="Enter your name"
        v-model="name"
      />

      <label for="email" class="block text-sm font-medium mb-1">
        Email
      </label>
      <input
        type="email"
        id="email"
        aria-required="true"
        class="w-full p-2 mb-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:shadow-outline-oreo"
        placeholder="Enter your email"
        v-model="email"
      />

      <button
        @click="createUser"
        class="w-full p-2 bg-blue-500 rounded-lg focus:outline-none focus:shadow-outline-oreo"
        :disabled="loading"
        :aria-busy="loading"
      >
        {{ loading ? 'Logging in...' : 'Start Chat' }}
      </button>

      <p v-if="error" class="text-red-400 text-center mt-2" role="alert">{{ error }}</p>
    </div>
  </div>
</template>

<style>
/* Define the oreo style focus shadow */
.focus\:shadow-outline-oreo:focus {
  box-shadow: 0 0 0 3px blue, 0 0 0 5px white, 0 0 0 7px blue;
}
</style>
