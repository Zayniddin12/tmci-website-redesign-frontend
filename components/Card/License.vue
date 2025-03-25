<script lang="ts" setup>
defineProps<{
  doc: {
    image: string
    title: string
    file: string
  }
}>()
</script>

<template>
  <div class="p-4 md:p-6 pl-3 md:pl-5 rounded-3xl bg-gray-100 relative">
    <img
      v-if="doc?.image"
      :src="doc?.image"
      alt="file image"
      class="absolute rounded-tl-2xl rounded-tr-2xl overflow-hidden left-5 md:left-6 bottom-0 max-w-[134px] md:w-auto md:max-w-[204px] h-[110%] md:h-[130%] aspect-[204/229] !object-contain"
    />

    <div class="pl-6 ml-[134px] md:ml-[204px] space-y-3 md:space-y-5">
      <h3 class="sm:text-xl md:text-2xl font-extrabold line-clamp-2">
        {{ doc?.title }}
      </h3>

      <BaseButton
        v-if="doc?.file"
        :text="$t('download')"
        class="font-bold"
        icon="icon-download text-lg"
        icon-position="right"
        @click="downloadFile(doc?.file ?? '', doc?.title + '.pdf')"
      />
    </div>
  </div>
</template>

<style scoped></style>
