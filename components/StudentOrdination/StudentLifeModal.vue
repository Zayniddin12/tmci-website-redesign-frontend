<template>
  <CommonModal
    v-bind="{ show }"
    no-header
    body-class="!bg-transparent shadow-none !overflow-visible max-w-[782px]"
    has-close-icon
    @close="$emit('close')"
  >
    <video
      class="md:min-h-[440px] sm:min-h-[340px] min-h-[215px] rounded-xl"
      :src="videoUrl"
      controls
      referrerpolicy="strict-origin-when-cross-origin"
      allowfullscreen
    ></video>
  </CommonModal>
</template>

<script setup lang="ts">
interface Props {
  videoUrl?: number
  show?: boolean
}
const props = defineProps<Props>()

defineEmits<{
  (e: 'close'): void
}>()
</script>
