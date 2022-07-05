<script setup lang="ts">
import {ref} from 'vue'
import HButton from '../button/button.vue'
import Switch from '../switch/index.vue'

const toggleClick = ref<boolean>(false)
</script>

<template>
  <p class="btn-style">
  <div class="p-20">
    <span>
      切换禁止状态:
    </span>
    <Switch v-model:checked="toggleClick"> toggle disabled </Switch>
  </div>
  <HButton type="primary" :disabled="toggleClick"> primary </HButton>
  <HButton type="dashed" :disabled="toggleClick"> dashed </HButton>
  <HButton type="flat" :disabled="toggleClick"> flat </HButton>
  <HButton type="danger" :disabled="toggleClick"> danger </HButton>
  <HButton :disabled="toggleClick"> default </HButton>
  </p>
</template>

<style scoped lang="less">
.btn-style {
  button {
    margin: 0 1em;
  }
}

.p-20 {
  padding: 20px;

  &>span {
    margin: 0 10px;
    vertical-align: middle;
  }
}
</style>
