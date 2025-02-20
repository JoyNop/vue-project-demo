<script setup lang="ts">
import { Checkbox } from 'ant-design-vue'
import { defineProps, defineEmits } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

const props = defineProps<{ todo: Todo }>()
const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <li :class="{ completed: todo.completed }">
    <Checkbox type="checkbox" :checked="todo.completed" @change="emit('toggle', todo.id)" />
    <span>{{ todo.text }}</span>
    <button @click="emit('remove', todo.id)">❌</button>
  </li>
</template>

<style scoped>
li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-bottom: 1px solid #ddd;

  &:hover {
    background-color: #f5f5f5;
  }
}
.completed {
  text-decoration: line-through;
  color: gray;
}
button {
  background: none;
  border: none;
  cursor: pointer;
  color: red;
}

/* 覆盖复选框选中颜色 */
:deep(.ant-checkbox-checked .ant-checkbox-inner) {
  background-color: #497aad !important; /* 选中背景色 */
  border-color: #497aad !important; /* 选中边框色 */
}
</style>
