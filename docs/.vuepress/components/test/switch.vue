<script setup lang="ts">
import Switch from '../../components/switch/index.vue'
import Button from '../../components/button/button.vue'
import { reactive, ref } from 'vue'

const switchProps = reactive({
  disabled: false,
})

const checked = ref<boolean>(true)

function handleChangeChecked() {
  switchProps.disabled = !switchProps.disabled
}
</script>

<template>
  <div class="p-20">
    <Switch
      :disabled="switchProps.disabled"
      v-model:checked="checked"
    />

    <div class="m-10">
      <Button @click="handleChangeChecked"> 禁止选中 </Button>
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
</style>
