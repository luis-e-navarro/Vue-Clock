<script setup>
import { ref } from 'vue'

defineProps({
  msg: String
})
let flip = false;
let timer;
let count = ref(new Date().getSeconds())
function updateTime(){
  
  if(!flip){
    timer = setInterval(()=>{count.value = new Date().getSeconds()},200)
    console.log('here')
    flip = true
    return 
  }else{
    clearInterval(timer)
    flip = false
  }

}
</script>

<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="updateTime"> {{ count }}</button>
  </div>


</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
