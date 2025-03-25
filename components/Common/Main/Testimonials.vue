<template>
  <section class="pt-16 pb-8 px-4">
    <h2 class="title-style text-center text-dark max-w-screen-md mx-auto">
      {{ $t('testimonials.title') }}
    </h2>
    <p class="text-center text-dark max-w-screen-md mx-auto mb-5 md:mb-8">
      {{ $t('testimonials.info') }}
    </p>

    <Transition mode="out-in" name="fade">
      <div v-if="!loading" class="relative">
        <Swiper
          :center-insufficient-slides="true"
          :centered-slides-bounds="true"
          :loop="true"
          :modules="[Navigation]"
          :navigation="{
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }"
          :slides-per-view="'auto'"
          :space-between="10"
          class="mb-3 md:mb-5 flex-x-center"
          @slide-change="onSlideChange"
        >
          <SwiperSlide
            v-for="(testimonial, index) in testimonials"
            :key="index"
            :class="{
              '!opacity-100': index === activeSlide,
            }"
            class="pt-4 pb-8 lg:!max-w-screen-md !max-w-sm sm:!max-w-md md:!max-w-lg !z-1 transition-opacity duration-500 opacity-50"
          >
            <CommonCardTestimonial v-bind="testimonial" />
          </SwiperSlide>
        </Swiper>
        <div
          class="container bg-transparent absolute-center !top-1/3 z-50 h-10"
        >
          <div
            class="slider-button slider-button-prev absolute left-2 rotate-180"
          >
            <i
              class="icon-chevron-right text-3xl hover:text-white size-10 rounded-full bg-white border border-gray-200 hover:bg-red transition-300 cursor-pointer hover:border-red grid place-items-center"
            />
          </div>
          <div class="slider-button slider-button-next absolute right-2">
            <i
              class="icon-chevron-right text-3xl size-10 hover:text-white rounded-full bg-white border border-gray-200 hover:bg-red transition-300 cursor-pointer hover:border-red grid place-items-center"
            />
          </div>
        </div>
      </div>
      <div v-else>
        <Swiper
          :center-insufficient-slides="true"
          :loop="true"
          :modules="[Navigation]"
          :navigation="{
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }"
          :slides-per-view="'auto'"
          :space-between="10"
          class="mb-3 md:mb-5 flex-x-center"
        >
          <SwiperSlide
            v-for="key in 4"
            :key="key"
            class="py-4 lg:!max-w-screen-md !max-w-sm sm:!max-w-md md:!max-w-lg !z-1"
          >
            <CommonLoadingCardTestimonial />
          </SwiperSlide>
        </Swiper>
      </div>
    </Transition>
  </section>
</template>

<script lang="ts" setup>
import 'swiper/css'
import 'swiper/css/navigation'

import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { computed, ref } from 'vue'

import { useHomeStore } from '~/store/home'

const store = useHomeStore()

const activeSlide = ref(1)

const testimonials = computed(() => store.testimonials)
const loading = computed(() => store.testimonialsLoading)

const onSlideChange = (swiper) => {
  activeSlide.value = swiper.realIndex
}

onMounted(() => {
  store.fetchStudentTestimonials()
})
</script>
