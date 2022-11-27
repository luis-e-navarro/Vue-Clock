<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})
let flip = false;
let timer;
let count = ref('Clock')

</script>

<template>
  <div class="card">
    <button type="button" @click="updateTime"> {{ count }}</button>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
