<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<template>
  <div class="container">
    <div class="hello-text">hello world</div>
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
}

.hello-text {
  color: rgb(73, 176, 240);
  font-size: 30px;
}
</style>
