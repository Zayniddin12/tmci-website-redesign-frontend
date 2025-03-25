<template>
  <div id="main-header" class="w-full !fixed top-0 z-50">
    <admission-header v-if="Object.keys(announcement).length" :announcement />
    <NuxtMarquee
      :class="{
        '!bg-black': isExistImage,
      }"
      class="py-2 bg-white"
    >
      <div class="flex-x-center space-x-4">
        <div v-for="key in 5" :key class="flex-y-center space-x-1">
          <CommonImage
            :class="key === 1 && '!ml-4'"
            class="w-4 h-4 rounded-full"
            src="/images/globe.svg"
          />
          <p
            :class="{
              '!text-white': isExistImage,
            }"
            class="text-xs font-normal leading-none text-[#373737]"
          >
            {{ $t('test_mode') }}
          </p>
        </div>
      </div>
    </NuxtMarquee>
    <ClientOnly>
      <header
        :class="[{
          'shadow-none h-screen': showMobileMenu,
        }, isExistImage ?  'header-shadow': 'bg-white']"
        class=" duration-300 transition-300"
        @mouseleave="showMenu = false"
      >
        <main class="container xl:max-w-[1216px] mx-auto hidden lg:block">
          <nav class="py-4 flex items-center">
            <nuxt-link to="/" @click="showMenu = false">
              <NuxtImg
                :src="
                  isExistImage
                    ? '/images/logo-light.svg'
                    : '/images/logo-dark.svg'
                "
                alt="Logo TMC university"
                class="object-cover"
                height="44"
                loading="lazy"
                title="Logo of TMC university"
                width="172"
              />
            </nuxt-link>
            <nuxt-link v-if="activeMenu === 'contacts'" :to="activeMenu">
            </nuxt-link>
            <layout-header-navigation
              :menu="data"
              :show-menu="showChildMenu || showMenu"
              class="ml-16"
              :is-exist-image="isExistImage"
              @change="getActiveMenu"
            />

            <common-lang-switcher :is-exist-image="isExistImage" class="ml-auto" variant="default" />
          </nav>

          <collapse-transition>
            <section
              v-if="(showChildMenu || showMenu) && activeMenu !== 'contacts'"
              @mouseleave="showMenu = false"
              @mouseover="showMenu = true"
            >
              <transition-group name="menu">
                <layout-header-active-tab />
                <layout-header-bottom
                  :active-menu="activeMenu"
                  :menu="data"
                  :programs
                />
              </transition-group>
            </section>
          </collapse-transition>
        </main>

        <layout-mobile-header
          :menu="data"
          :programs
          class="lg:hidden"
          :is-exist-image="isExistImage"
          @close-mobile-header="(val) => (showMobileMenu = val)"
        />
      </header>
    </ClientOnly>

  </div>
</template>

<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { useWindowScroll } from '@vueuse/core'
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'

import { useHomeStore } from '~/store/home'
import type { IProgram } from '~/types/about/index.types'

const store = useHomeStore()
const route = useRoute()

const { y } = useWindowScroll()

const activeMenu = ref<string | number>('')
const showMenu = ref<boolean>(false)
const showChildMenu = ref<boolean>(false)
const showMobileMenu = ref<boolean>(false)
const programs = computed(() => store.programsList as IProgram[])
const announcement = computed(() => store.quickAnnouncement)

const getActiveMenu = (val: { value: string | number; isShow: boolean }) => {

  activeMenu.value = val.value
  showChildMenu.value = val.isShow
  if (val.isShow) {
    showMenu.value = true
  }
}

onMounted(() => {
  store.fetchPrograms()
  store.fetchAnnouncement()
})

const data = computed(() => store.menus)
useAsyncData('menu', () => store.fetchMenu())

const isExistImage = computed(
  () => route.path === '/' && !showMenu.value && y.value < 100
)
watch(
  () => y.value,
  () => {
    showMenu.value = false
    showChildMenu.value = false
  }
)
</script>

<style scoped>
.header-shadow {
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 64px 0 rgba(0, 0, 0, 0.08);
  backdrop-filter: blur(26px);
}
</style>
