<template>
  <div class="bg-white">
    <div
      id="parent-element"
      ref="parent"
      class="flex items-center px-6 pt-4 pb-3 border-b-[4px] border-b-gray-5 relative before:absolute before:-bottom-1 before:left-0 before:h-1 before:bg-red after:absolute after:-bottom-6 after:left-0 after:h-5"
    >
      <div
        v-for="(item, index) in steps"
        :key="index"
        :data-step="item.step"
        class="w-full relative before:absolute before:w-px before:h-5 before:left-0 before:-bottom-9 before:bg-gray-3 text-sm font-semibold text-gray-1"
        :class="{ 'before:!bg-red !text-dark': item.step <= currentStep }"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="h-5 w-full"></div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  steps: Array<{
    name: string
    step: number
  }>
  currentStep: number
}
const props = defineProps<Props>()

const parent = ref<HTMLElement | null>(null)
const target = ref<HTMLElement | null>(null)
const activeWidth = computed(() => {
  if (target.value) {
    return target.value.offsetLeft
  }
  return 0
})
function getTargetElement() {
  return parent.value?.querySelector(
    `[data-step="${props.currentStep}"]`
  ) as HTMLElement
}
function setActiveWidth() {
  if (parent.value) {
    parent.value.style.setProperty(
      '--width-before',
      activeWidth.value + 1 + 'px'
    )
  }
}
watch(
  () => props.currentStep,
  () => {
    target.value = getTargetElement()
    setActiveWidth()
  }
)
onMounted(() => {
  target.value = getTargetElement()
  setActiveWidth()
})
</script>
<style>
:root {
  --width-before: auto;
}
#parent-element::before {
  content: '';
  width: var(--width-before);
  transition: 1s width ease-in-out;
  /* Additional styles for the ::before pseudo-element */
}
#parent-element::after {
  content: '';
  width: var(--width-before);
  transition: 1s width ease-in-out;
  background: linear-gradient(
    270deg,
    rgba(247, 72, 59, 0.17) 0%,
    rgba(247, 72, 59, 0.02) 100%
  );
  /* Additional styles for the ::before pseudo-element */
}
</style>
