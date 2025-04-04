<script setup lang="ts">
import { ref } from 'vue';

const message = ref('');
const emit = defineEmits(['send']);

const sendMessage = () => {
  if (!message.value.trim()) return;
  emit('send', message.value);
  message.value = '';
};
</script>

<template>
  <div class="p-4 bg-gray-800 flex">
    <label id="message-label" class="sr-only">Message Input</label>
    <input
      v-model="message"
      @keyup.enter="sendMessage"
      placeholder="Send a message"
      type="text"
      class="flex-1 p-2 rounded-lg bg-gray-700 text-white focus:outline-none focus:shadow-outline-oreo"
      aria-required="true"
      aria-label="Enter your message"
    />
    <button 
      @click="sendMessage" 
      class="ml-2 px-4 py-2 bg-blue-500 rounded-lg focus:outline-none focus:shadow-outline-oreo"
      aria-label="Send message"
    >
      Send
    </button>
  </div>
</template>
