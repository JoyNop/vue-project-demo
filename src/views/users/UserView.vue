<template>
  <div class="user-container">
    <div class="user-list">
      <div
        class="user-item"
        @click="handleClick(item.id)"
        v-for="item in state.userList"
        :key="item.id"
        :class="{ 'user-item-active': item.id === state.currentUserId }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="user-info" v-if="state.currentUserId > 0">
      <div class="user-info-item">
        <div class="user-info-item-title">姓名:</div>
        <div class="user-info-item-content">{{ currentUser?.name }}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-title">地址:</div>
        <div class="user-info-item-content">{{ currentUser?.address.street }}</div>
      </div>
      <div class="user-info-item">
        <div class="user-info-item-title">电话:</div>
        <div class="user-info-item-content">{{ currentUser?.phone }}</div>
      </div>
    </div>
    <div class="user-info" v-else>请在左侧选择</div>
  </div>
</template>

<script lang="ts" setup>
import request from '@/utils/axios'
import axios from 'axios'
import { computed, onMounted, reactive } from 'vue'

interface Address {
  street: string
  suite: string
  city: string
  zipcode: string
  geo: {
    lat: string
    lng: string
  }
}

interface Company {
  name: string
  catchPhrase: string
  bs: string
}

interface User {
  id: number
  name: string
  username: string
  email: string
  address: Address
  phone: string
  website: string
  company: Company
}
interface IState {
  userList: User[]
  currentUserId: number
}

const state = reactive<IState>({
  userList: [],
  currentUserId: 0,
})

const currentUser = computed(() => {
  return state.userList.find((item) => item.id === state.currentUserId)
})

const handleClick = (id: number) => {
  state.currentUserId = id
}
const getUserList = async () => {
  const res = await request({ url: 'https://jsonplaceholder.typicode.com/users', method: 'get' })

  state.userList = res
  // axios
  //   .get('https://jsonplaceholder.typicode.com/users')
  //   .then(function (response) {
  //     // handle success
  //     state.userList = response.data
  //     console.log(response)
  //   })
  //   .catch(function (error) {
  //     // handle error
  //     console.log(error)
  //   })
  //   .finally(function () {
  //     // always executed
  //   })
}

onMounted(async () => {
  await getUserList()
})
</script>

<style scoped>
.user-container {
  padding: 10px;
  margin: 10px;
  border: 1px solid #000;
  width: 90%;
  height: 90vh;
  display: flex;
}

.user-list {
  width: 45%;
  /* border: 1px solid #000; */
}

.user-item {
  cursor: pointer;
  padding: 3px;
  margin: 3px;
  border: 1px solid #000;
}

.user-info {
  width: 45%;
  padding: 3px;
  margin: 3px;
  border: 1px solid #000;
}

.user-item-active {
  background-color: #e4e4e4;
}

.user-info-item-title {
  font-weight: bold;
}

.user-info-item-content {
  margin-left: 10px;
  color: blue;
}
</style>
