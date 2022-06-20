<script setup lang="ts">
import Switch from '../../components/switch/index.vue'
import Button from '../../components/button/button.vue'
import { reactive, ref } from 'vue'

const switchProps = reactive<{
  disabled: boolean,
  size: string,
}>({
  disabled: false,
  size: 'small',
})

const checked = ref<boolean>(true)

function handleChangeChecked() {
  switchProps.disabled = !switchProps.disabled
}
type size = 'mini' | 'small' | 'default'
function handleChangeSize(size: size) {
  switchProps.size = size
}
</script>

<template>
  <div class="p-20">
    <Switch :disabled="switchProps.disabled" v-model:checked="checked" :size="switchProps.size"/>

    <div class="m-10 btn-p">
      <Button @click="handleChangeChecked"> 禁止选中 </Button>

      <Button @click="handleChangeSize('mini')"> mini </Button>

      <Button @click="handleChangeSize('small')"> small </Button>

      <Button @click="handleChangeSize('default')"> default </Button>
    </div>
  </div>
</template>

<style>
.p-20 {
  padding: 20px 0 0 0;
}
.m-10 {
  margin: 10px 0;
}
.btn-p button {
  margin: 0 10px;
}
</style>
