<script setup lang="ts">
// slider.ts
// 能够滑动
// focus:within 的时候能够变换颜色
import { defineProps, defineEmits, watch, reactive } from 'vue'
const props = defineProps({
  value: {
    type: [Number, String],
    default: 0,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 100,
  },
  step: {
    type: Number,
    default: 1,
  },
})

const emit = defineEmits(['update:value'])

const style = reactive<{
  '--width': string
  '--slider-btn-color': string
  '--slider-btn-bg-color': string
}>({
  '--width': '0%',
})
function handleChange(event: MouseEvent) {
  const data = event?.target?.value || 0
  emit('update:value', data)
}

watch(
  () => props.value,
  (val) => {
    style['--width'] = `${(val * 100) / props.max}%`
  }
)

watch(
  () => props.disabled,
  (val) => {
    if (val) {
      const disabledColor = '#999'
      style['--slider-btn-color'] = disabledColor
      style['--slider-background-color'] = disabledColor
    } else {
      style['--slider-btn-color'] = ''
      style['--slider-background-color'] = ''
    }
  }
)
</script>

<template>
  <input
    type="range"
    class="slider"
    :disabled="props.disabled"
    :style="style"
    :value="props.value"
    :min="props.min"
    :max="props.max"
    :step="props.step"
    @input="handleChange"
  />
</template>

<style lang="less" scoped>
input.slider {
  outline: none;
  --slider-btn-color: #61bd12;
  --slider-background-color: #61bd12;
  --width: 0%;
  --disabled-color: #e5e5e5;
  -webkit-appearance: none;
  /*清除系统默认样式*/
  transition: all 0.3s ease-in-out;
  height: 3px;
  /*横条的高度*/
  width: 100%;

  margin: 12px 0;

  &:focus-within::-webkit-slider-thumb {
    background-color: #fff;
    border: solid 2px var(--slider-btn-color);
    /*设置边框*/
  }

  /*拖动块的样式*/
  &::-webkit-slider-thumb {
    /*清除系统默认样式*/
    -webkit-appearance: none;
    /*拖动块高度*/
    height: 12px;
    /*拖动块宽度*/
    width: 12px;
    /*拖动块背景*/
    background: var(--slider-btn-color);
    /*外观设置为圆形*/
    border-radius: 50%;
    transform: translateY(-5px);
    transition: all 0.12s ease-in-out;
  }

  &::-webkit-slider-runnable-track {
    height: 3px;
    box-sizing: border-box;
    -webkit-appearance: none;
    /*清除系统默认样式*/
    border-radius: 50px;
    background: linear-gradient(
      to right,
      var(--slider-background-color) 0%,
      var(--slider-background-color) var(--width),
      transparent var(--width),
      transparent
    );
    // 背景颜色
    background-color: var(--disabled-color);
  }
}
</style>
