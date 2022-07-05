<script setup lang="ts">
import Slider from '../../components/slider/index.vue'
import HButton from '../../components/button/button.vue'
import { reactive } from 'vue'
const data = reactive({
  value: 0,
  disabled: false,
  vertical: false,
})

function handleChangeDisabled() {
  data.disabled = !data.disabled
}

function handleChangeVertical() {
  data.vertical = !data.vertical
}
</script>

<template>
  <Slider
    v-model:value="data.value"
    :disabled="data.disabled"
    :isShowTips="true"
    :suffix="'$'"
    :prefix="'前缀:'"
  />

  <h-button @click="handleChangeDisabled"> disabled </h-button>

  <h-button @click="handleChangeVertical"> change vertical</h-button>
</template>

<style></style>
