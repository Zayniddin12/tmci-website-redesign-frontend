<template>
  <ul v-if="items?.length > 1" class="pagination flex-y-center gap-2">
    <li
      v-if="paginationButtons"
      :class="`${itemClass} ${hasFirst ? 'pointer-events-none' : ''}`"
      class="group cursor-pointer"
      @click="prev"
    >
      <button :disabled="hasFirst">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            class="group-hover:stroke-red transition-300"
            :class="{ 'stroke-[#A8ABB2]': hasFirst }"
            d="M15 6L9 12L15 18"
            stroke="#10161C"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
    <li
      v-for="page in items"
      :key="page.label"
      class="transition-300 transition"
      :class="`${itemClass} ${page.active ? activeClass : ''} ${
        page.disable ? disableClass : ''
      }`"
    >
      <span v-if="page.disable" class="w-full h-full flex-center"> ... </span>
      <button v-else class="w-full h-full" @click="goto(page.label)">
        {{ page.label }}
      </button>
    </li>
    <li
      v-if="paginationButtons"
      :class="`${itemClass} ${hasLast ? disableClass : ''}`"
      class="group cursor-pointer"
      @click="next"
    >
      <button :class="{ 'pointer-events-none': hasLast }" :disabled="hasLast">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            class="group-hover:stroke-red transition-300"
            :class="{ 'stroke-[#A8ABB2]': hasLast }"
            d="M9 6L15 12L9 18"
            stroke="#10161C"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </li>
  </ul>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  total: number
  limit: number
  itemClass?: string
  activeClass?: string
  disableClass?: string
  paginationButtons?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  itemClass:
    'w-10 h-10 flex-center text-dark text-base leading-140  font-medium border border-[#D5D7DB66] bg-[#D5D7DB29] transition-300 hover:bg-white hover:text-dark hover:border-red',
  activeClass: 'bg-white border-red text-dark',
  disableClass: 'pointer-events-none',
})
const emit = defineEmits(['change', 'input'])

const pageCount = computed(() => Math.ceil(props.total / props.limit))

const items = computed(() => {
  const valPrev = props.currentPage > 1 ? props.currentPage - 1 : 1 // for easier navigation - gives one previous page
  const valNext =
    props.currentPage < pageCount.value
      ? props.currentPage + 1
      : pageCount.value // one next page
  const extraPrev = valPrev === 3 ? 2 : null
  const extraNext = valNext === pageCount.value - 2 ? pageCount.value - 1 : null
  const dotsBefore = valPrev > 3 ? 2 : null
  const dotsAfter = valNext < pageCount.value - 2 ? pageCount.value - 1 : null
  const output = []
  for (let i = 1; i <= pageCount.value; i += 1) {
    if (
      [
        1,
        pageCount.value,
        props.currentPage,
        valPrev,
        valNext,
        extraPrev,
        extraNext,
        dotsBefore,
        dotsAfter,
      ].includes(i)
    ) {
      output.push({
        label: i,
        active: props.currentPage === i,
        disable: [dotsBefore, dotsAfter].includes(i),
      })
    }
  }
  return output
})
const hasFirst = computed(() => props.currentPage === 1)
const hasLast = computed(() => props.currentPage === pageCount.value)
watch(
  () => props.currentPage,
  () => {
    emit('change')
  }
)

function first() {
  if (!hasFirst.value) {
    emit('input', 1)
  }
}
function prev() {
  if (!hasFirst.value) {
    emit('input', props.currentPage - 1)
  }
}
function goto(page: number) {
  emit('input', page)
}
function next() {
  if (!hasLast.value) {
    emit('input', props.currentPage + 1)
  }
}
function last() {
  if (!hasLast.value) {
    emit('input', pageCount.value)
  }
}
onMounted(() => {
  if (props.currentPage > pageCount.value) {
    emit('change')
  }
})
</script>
