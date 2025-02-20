<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import { RouterLink } from 'vue-router'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <div class="container">
    <div class="hello-text">Hello World</div>
    <div>
      <a class="link-a" href="/todolist">A TODO</a>
      <RouterLink class="link" to="/todolist">TODOLIST</RouterLink>
      <RouterLink class="link" to="/users">Users</RouterLink>

      <RouterLink class="link" to="/about">About</RouterLink>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  height: 100vh;
  background-color: antiquewhite;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.hello-text {
  color: rgb(73, 176, 240);
  font-size: 40px;
}

.link {
  background-color: azure;
  margin: 3px;
  padding: 3px;
  color: rgb(141, 177, 177);
}

.link-a {
  background-color: rgb(255, 250, 240);
  margin: 3px;
  padding: 3px;
  color: rgb(241, 192, 126);
}
</style>
