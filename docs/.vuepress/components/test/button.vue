<script setup lang="ts">
import { ref } from 'vue'
import Button from '../button/button.vue'
const toggleClick = ref<boolean>(false)
function handleClick(e: MouseEvent) {
  toggleClick.value = !toggleClick.value
}
</script>

<template>
  <div>
    <Button @click="handleClick"> toggle disabled </Button>
  </div>

  <p class="btn-style">
    <Button type="primary" :disabled="toggleClick"> primary </Button>
    <Button type="dashed" :disabled="toggleClick"> dashed </Button>
    <Button type="flat" :disabled="toggleClick"> flat </Button>
    <Button type="danger" :disabled="toggleClick"> danger </Button>
    <Button :disabled="toggleClick"> default </Button>
  </p>
</template>

<style scoped lang="less">
.btn-style {
  button {
    margin: 0 1em;
  }
}
</style>
