<script setup lang="ts">
// 方块化loading加载
</script>

<template>
  <div class="container">
    <template v-for="item in 3">
      <div class="square">
        <template v-for="i in 4">
          <span></span>
        </template>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
// 不同的行进行延迟 不同 的列注意帧率
* {
  margin: 0;
  padding: 0;
}

@background-color: #f51951;
@name: ~'square-rotate';


html,
body {
  height: 100%;
  width: 100%;
  display: flex;
}

.container {
  margin: auto;
}


.animation-square-loop(@i, @n) when (@i <= @n) {
  &:nth-child(@{i}) {
    animation: ~'@{name}@{i}' 2s infinite ease-in;
  }
  .animation-square-loop(@i + 1, @n);
}

.animation-loop(@index,@n) when (@index <= @n) {
  &:nth-child(@{index}) {
    span {
      .animation-square-loop(1,4);

      animation-delay: ~'@{index}00ms' !important;
    }
  }
  .animation-loop(@index + 1, @n);
}

.square {
  line-height: 1;

  span {
    display: inline-block;
    width: 36px;
    height: 36px;
    margin: 4px;
    background-color: @background-color;
    border-radius: 2px;
  }
  .animation-loop(1,3);
}

@keyframes square-rotate1 {
  20%,
  75% {
    transform: translate(0) rotate(0deg);
  }

  40%,
  55% {
    transform: translate(40px) rotate(-90deg);
  }
}

@keyframes square-rotate2 {
  15%,
  80% {
    transform: translate(0) rotate(0deg);
  }

  35%,
  60% {
    transform: translate(40px) rotate(-90deg);
  }
}

@keyframes square-rotate3 {
  10%,
  85% {
    transform: translate(0) rotate(0deg);
  }

  30%,
  65% {
    transform: translate(40px) rotate(-90deg);
  }
}
@keyframes square-rotate4 {
  5%,
  90% {
    transform: translate(0) rotate(0deg);
  }

  25%,
  70% {
    transform: translate(40px) rotate(-90deg);
  }
}

</style>
