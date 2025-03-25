<script lang="ts" setup>
import 'swiper/css'

import { Scrollbar } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'

import type { TAbout } from '~/types/about/index.types'

interface Props {
  about: TAbout
  loading?: boolean
}

const props = defineProps<Props>()

const settings = {
  slidesPerView: 3,
  spaceBetween: 50,
  centeredSlides: true,
  scrollbar: {
    el: '.swiper-scrollbar',
    hide: false,
    draggable: true,
  },
  breakpoints: {
    '350': {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    '540': {
      slidesPerView: 1,
      spaceBetween: 50,
    },
  },
  modules: [Scrollbar],
}

const years = computed(() => props.about?.milestones.map((el) => el.year))
</script>

<template>
  <div class="milestone-slider pb-8 md:pb-16">
    <BaseSkeleton
      :loading
      border-radius="12px"
      height="55px"
      preloader-class="mb-5"
      width="100%"
    >
      <h2 class="container title-style mb-4 md:mb-8">
        {{ $t('tmc_milestones') }}
      </h2>
    </BaseSkeleton>
    <div class="container relative overflow-hidden md:pb-[140px]">
     <ClientOnly>
       <Swiper class="max-w-[482px] mx-auto relative z-0" v-bind="settings">
         <SwiperSlide
             v-for="(item, key) in loading ? 6 : about.milestones"
             :key
             class="max-w-[300px] md:max-w-[max-content] bg-white border border-gray-300 rounded-2xl md:rounded-3xl p-3 md:p-6 transition-300 !h-auto"
         >
           <BaseSkeleton
               :loading
               border-radius="12px"
               height="36px"
               preloader-class="mb-5"
               width="100%"
           >
             <h5
                 class="text-xl md:text-[28px] leading-130 font-extrabold text-red"
             >
               {{ item?.year }}
             </h5>
           </BaseSkeleton>

           <BaseSkeleton
               :loading
               border-radius="12px"
               height="36px"
               preloader-class="mb-5"
               width="100%"
           >
             <p
                 class="mt-2 text-sm md:text-xl font-medium leading-140 text-dark"
             >
               {{ item?.description }}
             </p>
           </BaseSkeleton>
         </SwiperSlide>
       </Swiper>
     </ClientOnly>
      <div
        class="absolute max-md:hidden z-2 right-0 top-0 bg-gradient-to-r from-transparent to-white h-full w-[232px]"
      ></div>
      <div
        class="absolute max-md:hidden z-2 left-0 top-0 bg-gradient-to-l from-transparent to-white h-full w-[232px]"
      ></div>
    </div>
    <div class="container max-md:hidden mt-[-70px] relative z-2">
      <div
        class="swiper-scrollbar w-full h-16 bg-black/5 rounded-full relative"
      >
        <div
          v-if="years?.length"
          class="absolute left-6 right-6 top-1/2 -translate-y-1/2 flex justify-between cursor-pointer"
        >
          <p
            v-for="(item, key) in years"
            :key
            class="text-xl font-medium leading-130 text-dark"
          >
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.milestone-slider .swiper {
  overflow: visible !important;
}

.milestone-slider .swiper-scrollbar .swiper-scrollbar-drag {
  height: 100%;
  border-radius: 99999px;
  cursor: ew-resize;
  background-color: transparent;
}

.milestone-slider .swiper-scrollbar .swiper-scrollbar-drag:before {
  content: url('/images/dragger.svg');
  position: absolute;
  left: 50%;
  top: 50%;
  height: 36px;
  width: 64px;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 40px 0 rgba(151, 24, 55, 0.24);
  border-radius: 9999px;
}

.milestone-slider .swiper-slide.swiper-slide-active {
  border-color: #971837 !important;
}

@media screen and (min-width: 768px) {
  .milestone-slider .swiper-slide.swiper-slide-active {
    box-shadow: 0px 125px 80px 0px rgba(0, 0, 0, 0.03),
      0px 52.222px 33.422px 0px rgba(0, 0, 0, 0.02),
      0px 27.92px 17.869px 0px rgba(0, 0, 0, 0.02),
      0px 15.652px 10.017px 0px rgba(0, 0, 0, 0.01),
      0px 8.313px 5.32px 0px rgba(0, 0, 0, 0.01),
      0px 3.459px 2.214px 0px rgba(0, 0, 0, 0.01);
  }
}
</style>
