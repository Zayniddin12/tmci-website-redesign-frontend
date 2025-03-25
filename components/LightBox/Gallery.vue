<template>
  <CommonModal
    body-class="!bg-transparent !overflow-visible max-w-[782px]"
    has-close-icon
    no-header
    v-bind="{ show }"
    @close="$emit('close')"
  >
    <div v-if="loading">
      <LightBoxLoader />
    </div>
    <div v-else class="relative w-full">
      <button
        class="slider-prev w-12 h-12 rounded-full flex-center group backdrop-blur-sm bg-white/[12%] hover:!backdrop-blur-0 border border-white/[16%] hover:!bg-white transition-300 group absolute -left-16 absolute-y cursor-pointer"
      >
        <i
          class="icon-arrow-narrow-left text-3xl text-white transition-300 group-hover:text-red block"
        />
      </button>

      <!-- Main Swiper -->
      <Swiper
        v-if="list.length"
        :initial-slide="item"
        :thumbs="{ swiper: thumbsSwiper }"
        v-bind="settings"
      >
        <SwiperSlide
          v-for="(listItem, index) in list"
          :key="index"
          class="w-full"
        >
          <!-- Image Slide -->
          <div v-if="listItem.media_type === 'image'" class="aspect-video relative rounded-2xl overflow-hidden grid">
            <CommonImage
              :src="listItem?.image?.s1000x1000"
              alt="image"
              image-class="h-full md:h-[440px] object-cover object-center aspect-video"
            />
          </div>

          <!-- Video Slide -->
          <div v-else-if="listItem.media_type === 'video'" class="aspect-video relative rounded-2xl overflow-hidden grid">
            <video
              controls
              :src="listItem.image"
              class="h-full md:h-[440px] object-cover object-center aspect-video"
            />
          </div>
        </SwiperSlide>
      </Swiper>

      <!-- Pagination Thumbnails -->
      <Swiper
        v-if="list.length"
        :initial-slide="item"
        class="mySwiper thumbs-swiper"
        v-bind="thumbsSettings"
        @swiper="setThumbsSwiper"
      >
        <SwiperSlide
          v-for="(listItem, index) in list"
          :key="index"
          class="mt-4 thumb"
        >
          <div class="relative cursor-pointer">
            <!-- Image Thumbnail -->
            <CommonImage
              v-if="listItem.media_type === 'image'"
              :image-class="`object-cover aspect-video cursor-pointer rounded-lg overflow-hidden ${
                item === index ? 'opacity-100' : 'opacity-60'
              }`"
              :src="listItem?.image?.s500x500"
              alt="thumbnail"
            />

            <!-- Video Thumbnail -->
            <video
              v-else-if="listItem.media_type === 'video'"
              muted
              class="object-cover aspect-video cursor-pointer rounded-lg overflow-hidden"
              :class="{ 'opacity-100': item === index, 'opacity-60': item !== index }"
            >
              <source :src="listItem.image" type="video/mp4" />
            </video>
          </div>
        </SwiperSlide>
      </Swiper>

      <button
        class="slider-next w-12 h-12 rounded-full flex-center group backdrop-blur-sm bg-white/[12%] border border-white/[16%] hover:!bg-white hover:!backdrop-blur-0 hover:bg-transparent transition-300 group absolute -right-16 absolute-y cursor-pointer"
      >
        <i
          class="icon-arrow-narrow-left text-3xl text-white group-hover:text-red transition-300 block rotate-180"
        />
      </button>
    </div>
  </CommonModal>
</template>

<script lang="ts" setup>
import 'swiper/css';
import 'swiper/css/thumbs';

import type SwiperClass from 'swiper';
import { FreeMode, Navigation, Pagination, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

import type { IPhoto } from '~/types/about/index.types';

interface MediaItem {
  media_type: 'image' | 'video';
  image?: IPhoto; // For images
}

const props = defineProps<{
  list: MediaItem[];
  item?: number;
  show?: boolean;
}>();

defineEmits<{
  (e: 'close'): void;
}>();

const loading = ref(true);
const thumbsSwiper = ref<SwiperClass>();

watch(
  () => props.show,
  () => {
    if (!props.show) {
      thumbsSwiper.value = undefined; // Reset thumbsSwiper when the component is hidden
    }
  }
);

watch(
  () => props.list,
  () => {
    if (props.list?.length) loading.value = false;
  },
  {
    immediate: true,
    deep: true,
  }
);

const settings = {
  spaceBetween: 10,
  grabCursor: true,
  loop: true,
  keyboard: { enabled: true },
  navigation: {
    nextEl: '.slider-next',
    prevEl: '.slider-prev',
  },
  thumbs: { swiper: thumbsSwiper.value },
  modules: [Thumbs, FreeMode, Navigation, Pagination],
};

const thumbsSettings = {
  spaceBetween: 10,
  loop: true,
  slidesPerView: 5,
  freeMode: true,
  watchSlidesProgress: true,
  modules: [Thumbs, FreeMode],
};

watch(thumbsSwiper, (newVal) => {
  settings.thumbs.swiper = newVal;
});

const setThumbsSwiper = (swiper: SwiperClass) => {
  thumbsSwiper.value = swiper;
  settings.thumbs.swiper = thumbsSwiper.value;
};
</script>

<style scoped>
.thumbs-swiper .swiper-slide-thumb-active {
  border: 2px solid #dd3333 !important;
  border-radius: 12px;
  position: relative;
}

.thumbs-swiper .swiper-slide-thumb-active::before {
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  top: 0;
  left: 0;
  z-index: 2;
  background: linear-gradient(
    180deg,
    rgba(49, 49, 50, 0.32) 0%,
    rgba(49, 49, 50, 0.92) 100%
  );
}

.thumb div::before {
  position: absolute;
  content: '';
  width: 100%;
  height: 100%;
  display: block;
  top: 0;
  left: 0;
  z-index: 10;
  color: red;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(
    180deg,
    rgba(49, 49, 50, 0.32) 0%,
    rgba(49, 49, 50, 0.92) 100%
  );
}

.swiper-slide-thumb-active.thumb div::before {
  content: none !important;
}

video {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
}
</style>
