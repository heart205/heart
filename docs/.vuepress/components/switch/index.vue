<script lang="ts">
export default {
  inheritAttrs: false,
}
</script>
<script setup lang="ts">
// switch
import { nextTick, ref, defineProps, defineEmits, useAttrs, watch } from 'vue'
const status = ref<boolean>(false)
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['checked', 'update:checked'])
const checkedRef = ref<HTMLDivElement>(null!)
const attrs: { checked?: boolean } = useAttrs()

const isHaveChecked = ref<boolean>(false)

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
    immediate: true,
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

function checkedToStatus(val) {
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
</script>

<template>
  <div
    :class="'switch-wrapper'"
    ref="checkedRef"
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
  font-size: 14px;
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
      padding: 0 0.5em;

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
        transform: translateY(-50%) translateX(-1em);
      }
    }
  }

  &[disabled='true'] {
    cursor: not-allowed;
    opacity: 0.7;

    .switch-toggle {
      cursor: inherit;
    }
  }
}
</style>
