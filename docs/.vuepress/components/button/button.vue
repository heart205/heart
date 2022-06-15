<template>
  <button
    :class="['btn', clickType, props.disabled ? 'btn-disabled' : '']"
    ref="btn"
    @click="btnClick"
    :disabled="disabled"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, onMounted, ref } from 'vue'
type typeClick = 'primary' | 'dashed' | 'danger' | 'default' | 'flat'

type classBtnType = typeClick extends typeClick ? `btn-${typeClick}` : never
interface props {
  type?: typeClick
  disabled?: boolean
}

const clickType = ref<classBtnType>()

const emit = defineEmits(['click'])

const props = defineProps<props>()

function btnClick(e: MouseEvent) {
  if (props.disabled) return

  const target = e.target as HTMLButtonElement
  if (target) {
    target.setAttribute(
      'style',
      '--x: ' + e.offsetX + 'px; --y: ' + e.offsetY + 'px;'
    )
  }
  emit('click', e)
}

onMounted(() => {
  clickType.value = `btn-${props.type || 'default'}`
})
</script>

<style lang="less">
// less 变量也有先后优先级的顺序
.btn {
  display: inline-block;
  position: relative;
  padding: 0.5em 1em;
  font-size: 14px;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  cursor: unset;
  user-select: none;
  border: none;
  border-radius: 0.25rem;
  background-color: transparent;
  transition: all 0.3s;
  overflow: hidden;
  --wave-color: #fff;
  --btn-color: #41b983;
  --color: #fff;
  --border-color: #dee2e6;

  .changeColor {
    color: var(--btn-color);
    border-color: var(--btn-color);
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    background: #fff;
    transition: opacity 0.3s;
  }

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    left: var(--x, 0);
    top: var(--y, 0);
    pointer-events: none;
    background-image: radial-gradient(
      circle,
      var(--wave-color, #fff) 10%,
      transparent 10.01%
    );
    background-repeat: no-repeat;
    background-position: 50%;
    // scale关键
    transform: translate(-50%, -50%) scale(10);
    opacity: 0;
    transition: transform 0.3s, opacity 0.8s;
  }
}

.btn:not([disabled]):active::after {
  transform: translate(-50%, -50%) scale(0);
  opacity: 0.3;
  transition: 0s;
}

.btn:not([disabled]):active::before {
  opacity: 0.2;
}

.btn-default {
  border: 1px solid var(--border-color);
  --wave-color: #41b983;

  // focus-within属性 后代元素获取到了焦点 则会变成默认主题色
  &:not([disabled]):hover,
  &:not([disabled]):focus-within {
    .btn .changeColor();
  }
}

.btn-primary {
  color: var(--color);
  background-color: var(--btn-color);
}

.btn-dashed {
  .btn-default();
  border: 1px dashed var(--border-color);
}

.btn-danger {
  --btn-color: #ee8079;
  .btn-primary();
}

.btn-flat {
  transition: color 0.3s, background-color 0.5s;

  &:not([disabled]):hover {
    --btn-color: #3ecd79a8;
    color: #3ecd79a8;
    .btn-primary();
  }
}

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
