<template>
  <div
    :class="home ? 'grid md:grid-cols-2 gap-7' : ''"
    class="!w-full max-w-screen-md"
  >
    <div
      v-for="(faq, i) in faqs"
      :key="i"
      :class="{
        'faq-item-active bg-white border-red border-2': selectedItem === i,
        'faq-item': selectedItem !== faq?.id,
        'bg-white !mt-0 h-max': home,
      }"
      class="group transition-300 bg-[#F6F7F8] rounded-xl mt-4 max-w-screen-md w-full"
    >
      <div
        class="flex-y-center justify-between faq-list gap-3 transition-300 p-5 b-0 group rounded-lg cursor-pointer group"
        @click="openItem(i)"
      >
        <h4
          :class="home ? 'line-clamp-2' : ''"
          class="font-medium leading-140 transition-300 group-hover:text-red text-gray-900 text-lg md:text-xl group-hover:text-blue"
        >
          {{ faq?.title }}
        </h4>
        <div
          :class="selectedItem === i ? 'rotate-180' : ''"
          class="ml-4 text-center pt-1 px-[5px] bg-white-300 border border-gray-100 rounded-full transition-300"
        >
          <i
            class="icon-chevron-down text-2xl text-gray-400 group-hover:text-blue transition"
          ></i>
        </div>
      </div>

      <CollapseTransition>
        <div v-if="selectedItem === i" class="!pt-0 rounded-b-lg">
          <p
            class="font-normal leading-148 text-sm md:text-base text-gray pt-0 p-5 w-full"
            v-html="faq.content"
          />
        </div>
      </CollapseTransition>
      <!--      <div-->
      <!--        v-if="!home"-->
      <!--        class="bg-[#000]/10 w-full h-[1px] line"-->
      <!--        :class="{ hidden: i + 1 == faqs?.list.length }"-->
      <!--      ></div>-->
    </div>
  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'

import type { IFaqs } from '~/types/common'
import { purifyDOMContent } from '~/utils'

const selectedItem = ref<number | null>(null)

interface Props {
  faqs?: IFaqs
  home: boolean
}

const props = defineProps<Props>()
watch(
    () => props.faqs,
    () => {
      console.log()
    },
    {immediate: true}
)
const openItem = (id: string) => {
  selectedItem.value = selectedItem.value === id ? null : id
}
</script>

<style scoped></style>
