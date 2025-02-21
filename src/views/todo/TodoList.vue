<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TodoItem from './TodoItem.vue'
import TodoInput from './TodoInput.vue'

enum TaskStatus {
  TODO = 0,
  DONE = 1,
}

interface Task {
  id: number
  text: string
  status: TaskStatus
}
const saveToLocal = ref(false) // 是否存入本地
const tasks = ref<Task[]>([
  { id: 1, text: 'Learn Vue', status: TaskStatus.TODO },
  { id: 2, text: 'Write Code', status: TaskStatus.DONE },
])

const addTask = (text: string) => {
  tasks.value.push({
    id: Date.now(),
    text,
    status: TaskStatus.TODO,
  })
  updateLocalStorage()
}

const toggleTask = (id: number) => {
  const task = tasks.value.find((t) => t.id === id)
  if (task) {
    task.status = task.status === TaskStatus.TODO ? TaskStatus.DONE : TaskStatus.TODO
  }
  updateLocalStorage()
}

const removeTask = (id: number) => {
  tasks.value = tasks.value.filter((t) => t.id !== id)
  updateLocalStorage()
}
// 更新 localStorage
const updateLocalStorage = () => {
  if (saveToLocal.value) {
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
}
// 监听 `saveToLocal` 变化，存储到 localStorage
watch(saveToLocal, (newVal) => {
  localStorage.setItem('saveToLocal', JSON.stringify(newVal))
  updateLocalStorage()
})

onMounted(() => {
  const storedSaveToLocal = localStorage.getItem('saveToLocal')
  if (storedSaveToLocal) {
    saveToLocal.value = JSON.parse(storedSaveToLocal)
  }

  if (saveToLocal.value) {
    const storedtasks = localStorage.getItem('tasks')
    if (storedtasks) {
      tasks.value = JSON.parse(storedtasks)
    }
  }
})
</script>

<template>
  <div>
    <!-- 是否存入本地 -->
    <label>
      <input type="checkbox" v-model="saveToLocal" />
      存入本地（刷新后保留）
    </label>
    <TodoInput @add-todo="addTask" />
    <ul>
      <TodoItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @toggle="toggleTask"
        @remove="removeTask"
      />
    </ul>
  </div>
</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
