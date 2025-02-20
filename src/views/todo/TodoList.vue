<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import TodoItem from './TodoItem.vue'
import TodoInput from './TodoInput.vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}
const saveToLocal = ref(false) // 是否存入本地
const todos = ref<Todo[]>([
  { id: 1, text: 'Learn Vue', completed: false },
  { id: 2, text: 'Write Code', completed: false },
])

const addTodo = (text: string) => {
  todos.value.push({
    id: Date.now(),
    text,
    completed: false,
  })
  updateLocalStorage()
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.completed = !todo.completed
  updateLocalStorage()
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter((t) => t.id !== id)
  updateLocalStorage()
}
// 更新 localStorage
const updateLocalStorage = () => {
  if (saveToLocal.value) {
    localStorage.setItem('todos', JSON.stringify(todos.value))
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
    const storedTodos = localStorage.getItem('todos')
    if (storedTodos) {
      todos.value = JSON.parse(storedTodos)
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
    <TodoInput @add-todo="addTodo" />
    <ul>
      <TodoItem
        v-for="todo in todos"
        :key="todo.id"
        :todo="todo"
        @toggle="toggleTodo"
        @remove="removeTodo"
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
