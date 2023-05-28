<script setup lang="ts">
  import Storage, { setStorage, getStorage, removeStorage, clearStorage } from '@bwrong/storage';
  import { ref } from 'vue';
  const value = ref('');
  const storageValue = ref<string>('');
  const key = 'storage-key';

  const storage = new Storage({ driver: sessionStorage, prefix: 'test_' });

  const handleSet = () => {
    setStorage(key, value.value);
  };
  const handleGet = () => {
    storageValue.value = getStorage(key) as string;
  };
  const handleRemove = () => {
    removeStorage(key);
  };
  const handleClear = () => {
    clearStorage();
  };

  const handleClassSet = () => {
    storage.set(key, value.value, { expire: 10 });
  };
  const handleClassGet = () => {
    storageValue.value = storage.get(key) || '';
  };
  const handleClassRemove = () => {
    storage.remove(key);
  };
  const handleClassClear = () => {
    storage.clear();
  };
</script>

<template>
  <hr />
  <h1>内置方法使用</h1>
  <input type="text" v-model="value" />
  <button @click="handleSet">setStorage</button>
  <br />
  <br />
  <button @click="handleGet">getStorage</button>
  缓存中的值:{{ storageValue }} <br /><br />
  <button @click="handleRemove">removeStorage</button>
  <br />
  <br />
  <button @click="handleClear">clearStorage</button>
  <hr />
  <h1>Class 实例化使用</h1>
  <input type="text" v-model="value" />
  <button @click="handleClassSet">setStorage</button>
  <br />
  <br />
  <button @click="handleClassGet">getStorage</button>
  缓存中的值:{{ storageValue }} <br /><br />
  <button @click="handleClassRemove">removeStorage</button>
  <br />
  <br />
  <button @click="handleClassClear">clearStorage</button>

  <hr />
</template>

<style scoped></style>
