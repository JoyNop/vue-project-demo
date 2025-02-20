<script setup lang="ts">
import { ref } from 'vue'
import TodoItem from './TodoItem.vue'
import TodoInput from './TodoInput.vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

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
}

const toggleTodo = (id: number) => {
  const todo = todos.value.find((t) => t.id === id)
  if (todo) todo.completed = !todo.completed
}

const removeTodo = (id: number) => {
  todos.value = todos.value.filter((t) => t.id !== id)
}
</script>

<template>
  <div>
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
