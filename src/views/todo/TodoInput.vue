<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { PlusOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'

const newTodo = ref('')
const emit = defineEmits(['add-todo'])

const addTask = () => {
  if (newTodo.value.trim()) {
    emit('add-todo', newTodo.value.trim())
    message.info('Added a new task')
    newTodo.value = ''
  }
}
</script>

<template>
  <div class="input-container">
    <input v-model="newTodo" placeholder="Add a new task" @keyup.enter="addTask" />
    <button @click="addTask"><PlusOutlined /></button>
  </div>
</template>

<style scoped>
.input-container {
  display: flex;
  gap: 8px;
  margin-bottom: 16px;
}
input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  background-color: #497aad;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
