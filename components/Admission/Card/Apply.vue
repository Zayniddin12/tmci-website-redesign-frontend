<script lang="ts" setup>
import {useCustomToast} from "~/composables/useCustomToast";
import { useI18n } from 'vue-i18n'

defineProps<{
  card: {
    title: string
    description: string
    url: string
  }
}>()
const { showToast } = useCustomToast()
const {t} = useI18n()

function showToaster(url?: string) {
  if(url === 'apply/scholarship' || url === '/apply/scholarship') {
    showToast(t('apply_is_closed'), 'error')
  }
}

</script>

<template>
  <NuxtLink
      @click="showToaster(card?.url)"
      :to="card.url === '/apply/scholarship'  || card.url === 'apply/scholarship' ? '' : card?.url" class="relative transition-300 group" :class="{'cursor-not-allowed': card.url === '/apply/scholarship'  || card.url === 'apply/scholarship'}">
    <div class="absolute w-full h-full overflow-hidden">
      <img
        loading="lazy"
        alt="bg card"
        class="absolute right-0 top-0"
        src="/assets/images/admission/card-bg.svg"
      />
    </div>
    <div
      class="p-3 md:py-6 md:px-7 bg-white rounded-xl md:rounded-[24px] group-hover:shadow-header transition-300"
    >
      <h2
        class="text-lg md:text-2.5xl font-bold leading-normal mb-2 transition-300 group-hover:text-red "
      >
        {{ card?.title }}
      </h2>
      <p
        class="text-sm md:text-base font-normal leading-6 text-gray mb-4 md:mb-6"
      >
        {{ card?.description }}
      </p>

      <BaseButton
          type="button" :class="{'cursor-not-allowed !bg-gray-200 !border-none !text-white': card.url === 'apply/scholarship' || card.url === '/apply/scholarship'}" class="w-full" variant="error">{{
        $t('apply')
      }}</BaseButton>
    </div>
  </NuxtLink>
</template>

<style scoped></style>
