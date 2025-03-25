<script lang="ts" setup>
import { useHomeStore } from '~/store/home'

const store = useHomeStore()

const infoAbout = computed(() => store.aboutHome)
const checkImage = computed(() => infoAbout.value.home_image?.url?.original)
// fetch home info
useAsyncData('fetch-home', () => store.fetchHomeAbout())
</script>

<template>
  <div class="bg-gray-100 h-screen">
    <CommonEntrance :list="infoAbout?.slider_items" />
    <section
      v-if="checkImage"
      class="relative w-full h-full flex items-end overflow-hidden"
    >
      <CommonEntrance :list="infoAbout?.slider_items" />
      <!--      all overlay-->
      <div class="overlay-all"></div>

      <!--      left overlay -->
      <div class="overlay-left"></div>

      <!--      bg -logo -->

      <img
        alt="Images of overlay"
        class="hidden lg:inline-block overlay-full w-1/2 h-screen object-cover absolute top-0 right-0 z-2"
        src="/images/bg-logo.webp"
      />
      <div
        class="overlay-glow-effect w-full md:w-1/2 h-screen object-cover absolute top-1/2 md:top-0 left-0 z-3"
      ></div>

      <div class="container relative z-50 bottom-[60px] lg:bottom-[100px]">
        <h1 class="text-2xl lg:text-[48px] header-title">
          {{ infoAbout.wellcome_title }}
        </h1>
        <p class="header-description">{{ infoAbout.wellcome_description }}</p>

        <LazyNuxtLink to="/apply">
          <BaseButton
            :text="$t('apply')"
            class="min-w-[164px] max-w-max mt-4 lg:mt-10"
            variant="error"
          />
        </LazyNuxtLink>
      </div>
    </section>
    <section v-else class="h-full flex flex-col justify-between">
      <div></div>
      <div
        class="max-w-[582px] w-full mx-auto flex flex-col justify-center items-center"
      >
        <h2
          class="mb-2 sm:mb-3 text-center text-2xl sm:text-3xl md:text-[48px] font-extrabold !leading-120"
        >
          {{ $t('tmci_title') }}
        </h2>
        <p class="max-w-[390px] sm:text-base text-sm text-center mx-auto">
          {{ $t('tmci_text') }}
        </p>

        <nuxt-link class="w-full text-center mt-6 sm:mt-8" to="/apply">
          <BaseButton
            :text="$t('apply')"
            class="min-w-[164px] max-w-max"
            variant="error"
          />
        </nuxt-link>
      </div>

      <div class="main-bg flex items-center flex-col">
        <CommonImage
          alt="image of people"
          class="object-cover md:max-w-[500px] lg:max-w-[608px]"
          src="/images/main-people.webp"
        />
        <div class="h-1 max-w-[608px] w-full bg-red"></div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.main-bg {
  background: url('~/assets/images/main/main-bg.svg') no-repeat;
  background-size: cover;
}

.header-title {
  max-width: 500px;
  color: white;
  font-size: 48px;
  font-style: normal;
  font-weight: 800;
  line-height: 120%; /* 57.6px */
  letter-spacing: -1.44px;
  margin-bottom: 12px;
}

@media (max-width: 768px) {
  .header-title {
    font-size: 36px;
    line-height: 120%;
    letter-spacing: -0.72px;
  }

  .header-description {
    font-size: 16px;
    line-height: 120%;
    letter-spacing: -0.48px;
  }
}

.header-description {
  color: #fff;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 0.8;
}

.overlay-all {
  background: linear-gradient(
    214deg,
    #171719 18.43%,
    #171719 18.44%,
    rgba(23, 23, 25, 0.52) 30.05%,
    rgba(23, 23, 25, 0.48) 46.14%,
    rgba(23, 23, 25, 0.8) 62.4%,
    #171719 88.87%
  );
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.overlay-left {
  background: linear-gradient(
    90deg,
    #171719 0%,
    rgba(23, 23, 25, 0.64) 0.01%,
    rgba(23, 23, 25, 0) 100%
  );
  position: absolute;
  top: 0;
  left: 0;
  width: 50%;
  height: 100%;
}

.overlay-glow-effect {
  border-radius: 560px;
  background: #971837;
  filter: blur(600px);
  top: 533px;
  left: -1066px;
  opacity: 80%;
}
</style>
