<script setup lang="ts">
import {ref} from 'vue'
import Button from '../button/button.vue'
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
.p-20 {
  padding: 20px;
  & > span {
    margin: 0 10px;
    vertical-align: middle;
  }
}
</style>
