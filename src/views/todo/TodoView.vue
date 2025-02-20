<script setup lang="ts">
import TodoList from './TodoList.vue'
</script>

<template>
  <div class="todo">
    <div class="todo-main">
      <h1>My Todo List</h1>
      <TodoList />
    </div>
  </div>
</template>

<style scoped>
.todo {
  display: flex;
  background-color: #a2d2ed;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.todo-main {
  /* width: 30%; */
  width: 90%;
  max-width: 850px;
  height: 90%;
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}
.app {
  max-width: 400px;
  margin: auto;
  text-align: center;
}
</style>
