<template>
  <section class="w-full h-screen object-cover absolute top-0 left-0 z-0">
    <Swiper
      v-bind="imageSettings"
      :autoplay="autoplayOptions"
      :modules="modules"
      @swiper="setThumbsSwiper"
    >
      <SwiperSlide v-for="(item, i) in list" :key="i">
        <video
          v-if="item?.type === 'video'"
          :key="activeIndex"
          class="w-full h-full object-cover pointer-events-none"
          autoplay
          loop
          muted
          playsinline
        >
          <source :src="item?.url" type="video/mp4" />
        </video>
        <img
          v-else
          class="w-full h-full object-cover pointer-events-none"
          :src="item?.url.original"
          :alt="item?.title"
        />
      </SwiperSlide>
    </Swiper>
  </section>
</template>

<script setup lang="ts">
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
  Thumbs,
} from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, ref } from 'vue'

const thumbsSwiper = ref(null)
const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper
}

const autoplayOptions = {
  delay: 3000,
  disableOnInteraction: false,
}

const modules = [Thumbs, Navigation, Pagination, Autoplay, EffectFade]
const imageSettings = {
  class: '!absolute inset-0 z-0 !w-full',
  loop: true,
  autoplay: autoplayOptions,
  allowTouchMove: false,
  freeMode: true,
  modules: [Navigation, Thumbs, Pagination],
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
}
const activeIndex = ref(0)

interface Props {
  list: {
    video: string
    image: string
    title: string
  }[]
  bodyClass?: string
}

defineProps<Props>()
</script>
