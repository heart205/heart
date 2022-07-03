<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
// switch
import type { PropType, CSSProperties } from 'vue'
import {
  nextTick,
  ref,
  defineProps,
  defineEmits,
  useAttrs,
  watch,
  reactive
} from 'vue'
const status = ref<boolean>(false)
type size = 'mini' | 'small' | 'default'
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  size: {
    type: String as PropType<size>,
    default: 'small'
  }
})

const emit = defineEmits(['checked', 'update:checked'])
const checkedRef = ref<HTMLDivElement>(null!)
const attrs: { checked?: boolean } = useAttrs()

const isHaveChecked = ref<boolean>(false)

const style = reactive<
  {
    '--fontSize': string
  } & CSSProperties
>({
  '--fontSize': ''
})

function changeSize(size: size) {
  switch (size) {
    case 'mini':
      style['--fontSize'] = '12px'
      break
    case 'small':
      style['--fontSize'] = '14px'
      break
    case 'default':
      style['--fontSize'] = '16px'
      break
  }
}

function checkedToStatus(val: boolean) {
  status.value = val
}

function checkValue(bool: boolean) {
  if (checkedRef.value) {
    bool
      ? checkedRef.value.setAttribute('checked', '')
      : checkedRef.value.removeAttribute('checked')
  }
}

function handleToggleStatus() {
  if (props.disabled) return
  if (isHaveChecked.value) {
    checkedToStatus(!status.value)
    emit('update:checked', !attrs.checked)
  } else {
    checkedToStatus(!status.value)
    emit('checked', !status.value)
  }
}

watch(
  () => attrs.checked,
  (val) => {
    if (val === undefined) {
      isHaveChecked.value = false
    } else {
      isHaveChecked.value = true
      nextTick(() => {
        checkedToStatus(val)
      })
    }
  },
  {
    immediate: true
  }
)

watch(
  () => status.value,
  () => {
    if (checkedRef.value) {
      checkValue(status.value)
    }
  }
)

watch(
  () => props.size,
  (newVal) => {
    changeSize(newVal)
  },
  { immediate: true }
)
</script>

<template>
  <div
    :class="'switch-wrapper'"
    ref="checkedRef"
    :style="style"
    :disabled="props.disabled"
    @click="handleToggleStatus"
  >
    <div class="switch-toggle"></div>
  </div>
</template>

<style lang="less" scoped>
.switch-wrapper {
  display: inline-block;
  width: 3.8em;
  height: 1.9em;
  background-color: #ddd;
  border-radius: 24px;
  position: relative;
  font-size: var(--fontSize, 14px);
  vertical-align: middle;
  transition: background-color 0.3s ease-in-out, opacity 0.2s ease-in-out;
  cursor: pointer;

  .switch-toggle {
    display: inline-block;
    height: calc(100% - 4px);
    width: calc(50% - 4px);
    background-color: #fff;
    border-radius: 1.2em;
    position: absolute;
    top: 50%;
    left: 2px;
    transform: translateY(-50%);
    transition: all 0.18s ease-in-out;

    &::after {
      content: '';
      width: 40%;
      height: 20%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      border-radius: 0.8em;
      transition: background-color 0.3s ease-in-out;
    }

    &:active {
      padding: 0 0.3em;
      &::after {
        background-color: var(--primary-color, #38ae70);
      }
    }
  }

  &[checked] {
    background-color: var(--primary-color, #38ae70);

    .switch-toggle {
      left: calc(50% + 2px);
    }

    .switch-toggle {
      &:active {
        transform: translateY(-50%) translateX(-0.6em);
      }
    }
  }

  &[disabled='true'] {
    cursor: not-allowed;
    opacity: 0.7;
    .switch-toggle {
      cursor: inherit;
      &:active {
        padding: 0;
        transform: translateY(-50%);
        &::after {
          background-color: inherit;
        }
      }
    }
  }
}
</style>
