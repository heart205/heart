<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { ref } from 'vue'
import { defineProps, defineEmits, watch, reactive } from 'vue'
const props = defineProps({
  value: {
    type: [Number, String],
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  },
  step: {
    type: Number,
    default: 1
  },
  isShowTips: {
    type: Boolean,
    default: false
  },
  prefix: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  // TODO: 垂直滑动
  vertical: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:value', 'change', 'finish'])

const style = reactive<
  {
    '--width': string
    '--slider-btn-color': string
    '--slider-btn-bg-color': string
  } & CSSProperties
>({
  '--width': '0%',
  '--slider-btn-bg-color': '',
  '--slider-btn-color': ''
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
      '--slider-btn-bg-color'
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
  <div :class="[props.vertical ? 'slider-vertical' : '']">
    <input
      type="range"
      class="slider"
      :disabled="props.disabled"
      :style="style"
      :value="props.value"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :tips="isShowTips ? tips : null"
      :prefix-icon="prefix"
      :suffix-icon="suffix"
      @input="handleInput"
      @change="handleChange"
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

  // content 本身不支持var变量的形式
  // counter-reset: 计数器的形式只能保持初始值
  &::after,
  &::before {
    // counter-reset: progress var(--tips, '1');
    // content: counter(progress);
    position: absolute;
    left: var(--width);
    opacity: 0;
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    pointer-events: none;
  }

  &::after {
    content: attr(prefix-icon) attr(tips) attr(suffix-icon);
    background: rgba(0, 0, 0, 0.3);
    transform: translateX(-35%) translateY(-10%);
    padding: 3px 6px;
    top: 1em;
  }

  &::before {
    content: '';
    border: 4px solid transparent;
    border-color: rgba(0, 0, 0, 0.3) transparent transparent transparent;
    top: 2.58em;
    transform: translateY(-30%);
  }

  &[tips]:hover {
    &::after,
    &::before {
      opacity: 1;
    }

    &::after {
      transform: translateX(-35%) translateY(0%);
    }

    &::before {
      transform: translateY(0%);
    }
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
</style>
