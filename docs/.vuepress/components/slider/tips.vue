<script setup lang="ts">
import { watch } from 'vue'
import { withDefaults, reactive, ref, nextTick , onMounted} from 'vue'
const props = withDefaults(
  defineProps<{
    prefix?: string
    value: string | number
    suffix?: string
    widthTotal?: number
  }>(),
  {
    prefix: '',
    value: '',
    suffix: '',
  }
)

const style = reactive<{
  left: string
}>({
  left: '0px',
})

const tipsRef = ref<HTMLDivElement>(null)
const getStyleLeft = (val: number) => {
  nextTick(() => {
    const tipsWidth = tipsRef.value.getBoundingClientRect().width
    // 12为小球的宽度
    style.left = `${((val * (props.widthTotal - 12)) / 100 + 6) - tipsWidth / 2}px`
  })
}
watch(
  () => props.value,
  (val) => {
    getStyleLeft(val)
  }
)

onMounted(() => {
  getStyleLeft(props.value)
})
</script>

<template>
  <div class="tips" :style="style" ref="tipsRef">
    <span>
      {{ prefix }}
    </span>
    <span>
      {{ value }}
    </span>
    <span>
      {{ suffix }}
    </span>
  </div>
</template>

<style lang="less" scoped>
.tips {
  position: absolute;
  top: -1.5em;
  padding: 0 6px;
  z-index: 1222;
  left: 0;
  background-color: #ccc;
  opacity: 0;
  white-space: nowrap;
  transition: all .12s ease-in;
}
</style>
