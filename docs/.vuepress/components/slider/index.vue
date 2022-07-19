<script setup lang="ts">
import type { CSSProperties } from 'vue'
import Tips from './tips.vue'
import { ref, onMounted } from 'vue'
import {  watch, reactive, withDefaults } from 'vue'
interface props {
  value: string | number
  disabled?: boolean
  min?: number
  max?: number
  step?: number
  isShowTips: boolean
  prefix?: string
  suffix?: string
}
const props = withDefaults(defineProps<props>(), {
  value: 0,
  disabled: false,
  min: 0,
  max: 100,
  step: 1,
  isShowTips: false,
  prefix: '',
  suffix: '',
})
// const props = defineProps({
//   value: {
//     type: [Number, String],
//     default: 0,
//   },
//   disabled: {
//     type: Boolean,
//     default: false,
//   },
//   min: {
//     type: Number,
//     default: 0,
//   },
//   max: {
//     type: Number,
//     default: 100,
//   },
//   step: {
//     type: Number,
//     default: 1,
//   },
//   isShowTips: {
//     type: Boolean,
//     default: false,
//   },
//   prefix: {
//     type: String,
//     default: '',
//   },
//   suffix: {
//     type: String,
//     default: '',
//   },
//   // TODO: 垂直滑动
//   vertical: {
//     type: Boolean,
//     default: false,
//   },
// })

const emit = defineEmits(['update:value', 'change', 'finish'])
const inputRef = ref<HTMLInputElement>(null)

const style = reactive<
  {
    '--width': string
    '--slider-btn-color': string
    '--slider-btn-bg-color': string
  } & CSSProperties
>({
  '--width': '0%',
  '--slider-btn-bg-color': '',
  '--slider-btn-color': '',
})
function handleInput(event: Event) {
  const data = (event?.target as HTMLInputElement)?.value || 0
  emit('update:value', data)
}

const tips = ref(0)

function handleChange(event: Event) {
  const data = (event?.target as HTMLInputElement)?.value || 0
  Number(data) === props.max ? emit('finish', data) : emit('change', data)
}
const width = ref(0)

onMounted(() => {
  width.value = inputRef.value.getBoundingClientRect().width
})

watch(
  () => props.value,
  (val) => {
    tips.value = (Number(val) * 100) / props.max
    style['--width'] = `${tips.value}%`
  }
)

watch(
  () => props.disabled,
  (val) => {
    const disabledStyleVariable = [
      '--slider-btn-color',
      '--slider-btn-bg-color',
    ] as const
    if (val) {
      const disabledColor = '#999'
      for (let i = 0; i < disabledStyleVariable.length; i++) {
        style[disabledStyleVariable[i]] = disabledColor
      }
    } else {
      for (let i = 0; i < disabledStyleVariable.length; i++) {
        style[disabledStyleVariable[i]] = ''
      }
    }
  }
)
</script>

<template>
  <div class="slider-wrapper">
    <input
      ref="inputRef"
      type="range"
      class="slider"
      :disabled="props.disabled"
      :value="props.value"
      :style="style"
      :min="props.min"
      :max="props.max"
      @input="handleInput"
      @change="handleChange"
    />
    <Tips
      v-if="isShowTips"
      :value="tips"
      :widthTotal="width"
      :suffix="suffix"
      :prefix="prefix"
    />
  </div>
</template>

<style lang="less" scoped>
@btn-color: #61bd12;
@background-color: #61bd12;
@disabled-color: #e5e5e5;
@focus-background-color: #fff;
input.slider {
  outline: none;
  --slider-btn-color: @btn-color;
  --slider-background-color: @background-color;
  --width: 0%;
  --disabled-color: @disabled-color;
  /*清除系统默认样式*/
  -webkit-appearance: none;
  /*横条的高度*/
  height: 3px;
  width: 100%;
  padding: 6px 0;
  margin: 6px 0;
  transition: all 0.3s ease-in-out;
  &:focus-within::-webkit-slider-thumb {
    background-color: @focus-background-color;
    /*设置边框*/
    border: solid 2px var(--slider-btn-color);
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
    /*清除系统默认样式*/
    -webkit-appearance: none;
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

.slider-wrapper {
  position: relative;
}
</style>

<style lang="less">
.slider-wrapper:hover {
  .tips {
    opacity: 1;
  }
}
</style>
