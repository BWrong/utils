<script setup lang="ts">
import { getDepartmentList } from '@/apis';


const handleSendRequest = () => {
    getDepartmentList().then(res => {
      console.log('res', res);
    });
  };


</script>

<template>
  <button @click="handleSendRequest">发送请求</button>
</template>

<style lang="less" scoped>

</style>
