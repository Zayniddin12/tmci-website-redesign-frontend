<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/pagination'

import type { SwiperClass } from 'swiper/swiper-react'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { ref } from 'vue'

import type { MilestoneCard } from '~/types/admission/index.types'

defineProps<{
  cards: MilestoneCard[]
}>()

const settings = {
  el: '.swiper',
  slidesPerView: 'auto',
  spaceBetween: 50,
  autoHeight: true,
  mousewheel: true,
}
const activeIndex = ref<number>(0)
const changeActiveIndex = (swiper: SwiperClass) => {
  activeIndex.value = swiper.activeIndex
}
</script>

<template>
  <section class="container">
    <swiper
      class="swiper relative"
      v-bind="{ ...settings }"
      @scroll="changeActiveIndex"
      @active-index-change="changeActiveIndex"
    >
      <!--      left and right shadow-->
      <div
        class="box-el-shadow-left absolute left-0 z-10 top-0 w-full h-full"
      ></div>

      <div
        class="box-el-shadow-right absolute z-10 right-0 top-0 w-full h-full"
      ></div>
      <swiper-slide
        v-for="(card, idx) in cards"
        :key="idx"
        class="!w-[482px] relative"
        @click="activeIndex = idx"
      >
        <!--      overlay shadow-->
        <div
          :class="{ 'border-red': activeIndex == idx }"
          class="p-6 rounded-3xl bg-white shadow-milestoneCard border border-gray-300"
        >
          <h2
            :class="{ 'text-red': activeIndex === idx }"
            class="mb-2 text-2.5xl font-extrabold leading-130 text-gray"
          >
            {{ card.year }}
          </h2>
          <p class="text-xl font-medium leading-140">{{ card.content }}</p>
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<style scoped>
.box-el-shadow-left {
  width: 250px;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
}

.box-el-shadow-right {
  width: 250px;
  height: 100%;
  flex-shrink: 0;
  background: linear-gradient(90deg, #fff 0%, rgba(255, 255, 255, 0) 100%);
  transform: rotate(180deg);
}
</style>
