<script lang="ts" setup>
defineProps<{
  card: {
    title: string
    subtitle: string
    image: string
  }
  loading: boolean
}>()

const element = ref<HTMLElement>()

defineExpose({
  element
})

</script>

<template>
  <div
      ref="element"
    v-if="card?.title && card?.subtitle"
    class="border border-gray-200 bg-white rounded-3xl p-5 lg:pt-8 lg:pl-9 md:pb-14 relative overflow-hidden"
  >
    <h4 class="text-dark font-bold text-[28px] font-vela">
      {{ card.title }}
    </h4>
    <p class="text-dark font-normal font-vela leading-6 mt-5 lg:max-w-[747px]">
      {{ card.subtitle }}
    </p>

    <div class="max-xl:!hidden absolute right-[55px] bottom-0">
      <div class="relative">
        <img alt="image" class="z-10 w-[235px] relative top-8" :src="card.image" />
        <img
          alt="image"
          class="w-[235px] blur-[80px] absolute-center"
          :src="card.image"
        />
      </div>
    </div>
  </div>
</template>
