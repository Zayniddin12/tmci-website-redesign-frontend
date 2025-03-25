<template>
  <div
    :class="{ '!text-red': seconds < 15 }"
    class="text-sm font-semibold text-[#332E2C] transition-200 px-2 py-1 bg-[#EDF1F8] rounded-md"
  >
    {{ time }}
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

interface Props {
  second: number
}

const props = defineProps<Props>()

interface Emits {
  (e: 'timeout'): void
}

const $emit = defineEmits<Emits>()
const seconds = ref(props.second ?? 0)
const time = ref('')

const countDown = () => {
  seconds.value--
  // const mm = Math.floor(seconds.value / 60)
  // const ss = Math.floor(seconds.value % 60)
  if (seconds.value >= 3600) {
    time.value = new Date(seconds.value * 1000).toISOString().substr(11, 8)
  } else {
    time.value = new Date(seconds.value * 1000).toISOString().substr(14, 5)
  }
  // time.value = `${mm > 9 ? mm : '0' + mm}:${ss > 9 ? ss : '0' + ss}`
}

watch(
  () => props.second,
  () => {
    seconds.value = props.second
    countDown()

    const interval = setInterval(function () {
      countDown()

      if (seconds.value < 0) {
        clearInterval(interval)
        time.value = '00:00'
        $emit('timeout')
      }
    }, 1000)
  },
  { immediate: true }
)

// const interval = setInterval(function () {
//   countDown()
//
//   if (seconds.value < 0) {
//     clearInterval(interval)
//     time.value = '00:00'
//     $emit('timeout')
//   }
// }, 1000)
</script>
