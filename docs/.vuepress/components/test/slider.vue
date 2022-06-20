<script setup lang="ts">
import Slider from '../../components/slider/index.vue'
import Button from '../../components/button/button.vue'
import { reactive } from 'vue'
const data = reactive({
  value: 0,
  disabled: false,
})

function handleChangeDisabled() {
  data.disabled = !data.disabled
}

</script>

<template>
  <Slider v-model:value="data.value" :disabled="data.disabled" />

  <Button @click="handleChangeDisabled"> disabled </Button>
</template>

<style></style>
