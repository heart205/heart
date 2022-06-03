<template>
  <button class="btn default-btn" ref="btn" @click="btnClick">
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
function btnClick(e: MouseEvent) {
  const target = e.target as HTMLButtonElement
  if (target) {
    target.setAttribute(
      'style',
      '--x: ' + e.offsetX + 'px; --y: ' + e.offsetY + 'px;'
    )
  }
}
</script>

<style lang="less">
@default-color: #007bff;
@color: #fff;
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
  transition: all 0.3s;
  color: @color;
  overflow: hidden;

  &::after {
    content: '';
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: var(--x, 0);
    top: var(--y, 0);
    pointer-events: none;
    background-image: radial-gradient(circle, #fff 10%, transparent 10.01%);
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

.default-btn {
  background-color: @default-color;
}
</style>
