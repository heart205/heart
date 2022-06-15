<script setup lang="ts">
import { defineProps } from 'vue'
// square-loading 方案:
const props = defineProps({
  color: {
    type: String,
    default: '#6fe29a',
  },
})
</script>

<template>
  <div>
    <div
      class="flex"
      :style="{
        '--color': props.color,
      }"
    >
      <div class="square"></div>
      <div class="square"></div>
      <div class="circle"></div>
      <div class="circle"></div>
    </div>
  </div>
</template>

<style lang="less" scoped>
@keyframes square-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(60deg);
  }
}

@keyframes square-rotate-reverse {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-60deg);
  }
}

@keyframes circle-translate {
  0% {
    transform: translate(80px, 0);
  }
  100% {
    transform: translate(20px, 0);
  }
}
.flex {
  width: 100px;
  height: 50px;
  margin: 20px auto;
  display: flex;
  position: relative;
}
.square {
  width: 0;
  height: 0;
  border: 25px solid var(--color);
  border-radius: 50%;
  position: absolute;
  border-right-color: transparent;
  &:nth-child(1) {
    animation: square-rotate 0.25s infinite alternate ease-in;
  }
  &:nth-child(2) {
    animation: square-rotate-reverse 0.25s infinite alternate ease-in;
  }
}

.circle {
  width: 0;
  height: 0;
  position: absolute;
  border: 5px solid var(--color);
  left: 10px;
  top: calc(20px);
  border-radius: 50%;
  &:nth-of-type(3) {
    animation: circle-translate 0.68s infinite linear;
  }
  &:nth-of-type(4) {
    animation: circle-translate 0.68s infinite linear;
    animation-delay: 0.32s;
  }
}
</style>
