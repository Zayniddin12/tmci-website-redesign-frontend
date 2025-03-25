<script lang="ts" setup>
interface Props {
  show: boolean
  link: string
}

defineProps<Props>()
defineEmits(['close'])
</script>

<template>
  <CommonModal
    :show="show"
    body-class="w-[920px] md:min-h-[460px] mx-auto relative"
    header-style="bg-transparent border-none"
    @outer-click="$emit('close')"
  >
    <template #header>
      <button class="ml-auto group bg-transparent" @click="$emit('close')">
        <i class="icon-close text-gray text-2.5xl group-hover:text-red" />
      </button>
    </template>
    <template #default>
      <div class="w-full h-full overflow-hidden">
        <iframe
          :src="link"
          allowfullscreen
          class="size-full aspect-video rounded-b-3xl"
        />
      </div>
    </template>
  </CommonModal>
</template>
