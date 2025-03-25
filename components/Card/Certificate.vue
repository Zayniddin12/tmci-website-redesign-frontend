<script setup lang="ts">
defineProps<{
  doc: {
    image: string
    title: string
    subtitle: string
    file: string
  }
}>()

defineEmits<{
  (event: 'show'): void
}>()
</script>

<template>
  <div class="flex sm:flex-row flex-col items-center gap-4 sm:gap-6 md:gap-8">
    <CommonImage
      v-if="doc?.image"
      :src="doc?.image"
      alt="file image"
      class="overflow-hidden cursor-pointer w-[180px] sm:w-[240px] md:w-[281px] shrink-0 max-h-[292px] h-full rounded-3xl aspect-[281/293] border border-gray-300"
      @click="$emit('show')"
    />
    <div class="space-y-4 sm:space-y-6 md:space-y-8 text-center sm:text-left">
      <div class="space-y-1.5 md:space-y-3">
        <h3 class="font-bold text-xl sm:text-2xl md:text-[28px]">
          {{ doc?.title }}
        </h3>
        <p class="md:text-base text-sm">{{ doc?.subtitle }}</p>
      </div>

      <BaseButton
        v-if="doc?.file"
        type="button"
        :text="$t('download')"
        icon-position="right"
        icon="icon-download text-lg"
        class="font-bold"
        @click="downloadFile(doc?.file ?? '', doc?.title + '.pdf')"
      />
    </div>
  </div>
</template>

<style scoped></style>
