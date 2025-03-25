<script lang="ts" setup>
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import type { IPhoto } from '~/types/about/index.types'

interface IImage {
  media_type: 'image' | 'video'
  image?: IPhoto // For images
}

const props = defineProps<{
  list: IImage[]
}>()

const show = ref(false)
const activeItem = ref<number>()
const settings = {
  spaceBetween: 12,
  grabCursor: true,
  keyboard: { enabled: true },
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  loop: true,
  breakpoints: {
    '350': {
      slidesPerView: 2,
    },
    '640': {
      slidesPerView: 3,
    },
    '1024': {
      slidesPerView: 4,
    },
  },
  centeredSlides: true,
  modules: [Navigation],
}

const handleImg = (item: number) => {
  show.value = true
  activeItem.value = item
}
</script>

<template>
  <div class="relative overflow-hidden">
    <div class="container relative z-1">
      <Swiper
        v-if="list?.length"
        class="!overflow-visible z-0"
        v-bind="settings"
      >
        <SwiperSlide
          v-for="(listItem, index) in list"
          :key="index"
          class="cursor-pointer relative aspect-[287/332]"
          @click="handleImg(index)"
        >
          <div class="w-full h-full overflow-hidden relative">
            <template v-if="listItem.media_type === 'image'">
              <CommonImage
                :src="listItem?.image?.s1000x1000"
                alt="image"
                class="w-full h-full object-cover"
              />
            </template>
            <template v-else-if="listItem.media_type === 'video'">
              <video
                :src="listItem?.image"
                class="w-full h-full object-cover"
                autoplay
                muted
                loop
                playsinline
              ></video>
            </template>
            <div class="image-overlay absolute top-0 w-full h-full z-1"></div>
          </div>
        </SwiperSlide>
      </Swiper>

      <button
        class="slider-prev max-xl:hidden w-8 h-8 lg:w-12 lg:h-12 group rounded-full flex items-center justify-center shrink-0 bg-white border border-gray-200 shadow-slider-button absolute -translate-y-1/2 top-1/2 left-0 -translate-x-1/2 z-1 cursor-pointer"
      >
        <i
          class="icon-arrow-narrow-left text-xl lg:text-3xl text-dark transition-300 group-hover:text-red"
        />
      </button>

      <button
        class="slider-next max-xl:hidden w-8 h-8 lg:w-12 lg:h-12 group rounded-full flex items-center justify-center shrink-0 bg-white border border-gray-200 shadow-slider-button absolute -translate-y-1/2 top-1/2 right-0 translate-x-1/2 z-1 cursor-pointer"
      >
        <i
          class="icon-arrow-narrow-left text-xl lg:text-3xl text-dark transition-300 group-hover:text-red block rotate-180"
        />
      </button>
    </div>
    <div
      class="absolute z-2 h-full w-full linear-gradient inset-0 pointer-events-none"
    ></div>

    <LightBoxGallery
      v-bind="{
        show,
        item: activeItem,
        list,
      }"
      @close="show = false"
    />
  </div>
</template>

<style scoped>
.image-overlay {
  background: linear-gradient(
    180deg,
    rgba(49, 49, 50, 0.32) 0%,
    rgba(49, 49, 50, 0.92) 100%
  );
}

.linear-gradient {
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.28) 0%,
    transparent 19.5%,
    transparent 50%,
    transparent 81.5%,
    rgba(255, 255, 255, 0.28) 100%
  );
}
</style>