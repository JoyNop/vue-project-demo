<script setup lang="ts">
import { Checkbox } from 'ant-design-vue'
import { defineProps, defineEmits } from 'vue'

enum TaskStatus {
  TODO = 0,
  DONE = 1,
}

interface Task {
  id: number
  text: string
  status: TaskStatus
}

const props = defineProps<{ task: Task }>()
const emit = defineEmits(['toggle', 'remove'])
</script>

<template>
  <li :class="{ completed: props.task.status === TaskStatus.DONE }">
    <input
      type="checkbox"
      :checked="props.task.status === TaskStatus.DONE"
      @change="emit('toggle', props.task.id)"
    />
    <!-- <Checkbox type="checkbox" :checked="todo.completed" @change="emit('toggle', todo.id)" /> -->
    <span>{{ props.task.text }}</span>
    <button @click="emit('remove', props.task.id)">❌</button>
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

input[type='checkbox'] {
  accent-color: #497aad; /* 让 Checkbox 选中时变红 */
}
</style>
