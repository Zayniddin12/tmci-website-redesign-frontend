<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { watch } from 'vue'
import { useRouter } from 'vue-router'

import FooterBottom from '~/components/Layout/FooterBottom.vue'
import FooterSocial from '~/components/Layout/FooterSocial.vue'
import { useHomeStore } from '~/store/home'
import type { IProgram } from '~/types/about/index.types'
import type { IMenu } from '~/types/home.types'

const router = useRouter()
const store = useHomeStore()
const activeIndex = ref<null | number>(null)
const programs = computed(() => store.programsList as IProgram[])
const menus = computed(() => store.menus)

const toggle = (idx: number) => {
  if (activeIndex.value === idx) {
    activeIndex.value = null
    return
  }
  activeIndex.value = idx
}

function getUrl(url: string, isUrl: boolean) {
  if (!isUrl) {
    router.push(`/${url}`)
    // toggleMenu()
  }
}

// watch(
//   () => [programs.value, menus.value],
//   () => {
//     if (menus.value.length) {
//       menus.value.forEach((item: IMenu) => {
//         if (item.url === 'programs') {
//           item.children = programs.value
//         }
//       })
//     }
//   },
//   { deep: true }
// )
</script>

<template>
  <footer id="main-footer" class="pt-12">
    <section class="container xl:max-w-[1216px] mx-auto">
      <div class="grid grid-cols-1 lg:grid-cols-4 lg:gap-5">
        <template v-for="(menu, idx) in menus" :key="menu?.id">
          <div
            v-if="menu?.children?.length"
            class="py-3 border-b border-b-gray-200"
          >
            <div
              class="h-6 flex items-center justify-between lg:mb-5"
              @click="toggle(idx)"
            >
              <h1
                class="text-base lg:text-2xl font-extrabold duration-200"
                :class="{
                  'cursor-pointer hover:text-red': !menu?.children?.length,
                }"
                @click="getUrl(menu?.url, !!menu?.children?.length)"
              >
                {{ menu?.title }}
              </h1>

              <span
                :class="{ '!-rotate-90 text-red': activeIndex === idx }"
                class="lg:hidden"
              >
                <i
                  :class="{
                    '!icon-chevron-right text-red': activeIndex === idx,
                  }"
                  class="icon-chevron-right text-2xl text-gray"
                />
              </span>
            </div>
            <CollapseTransition v-if="menu?.children?.length" class="lg:hidden">
              <ul v-if="activeIndex === idx" class="mt-6">
                <template v-if="menu?.url !== 'programs'">
                  <li v-for="(el, i) in menu?.children" :key="i" class="pb-6">
                    <nuxt-link
                      :to="`/${el?.url}`"
                      class="text-base lg:text-lg font-medium text-gray transition-300 hover:text-red"
                      >{{ el?.title }}
                    </nuxt-link>
                  </li>
                </template>
                <template v-else>
                  <li v-for="(item, i) in programs" :key="i" class="pb-6">
                    <nuxt-link
                      :to="`/programs/faculty/${item?.slug}`"
                      class="text-base lg:text-lg font-medium text-gray transition-300 hover:text-red"
                      >{{ item?.title }}
                    </nuxt-link>
                  </li>
                </template>
              </ul>
            </CollapseTransition>

            <ul class="hidden lg:block space-y-3">
              <li v-for="(el, i) in menu?.children" :key="i">
                <nuxt-link
                  v-if="el?.url"
                  :to="`/${el?.url}`"
                  class="text-lg font-medium text-gray transition-300 hover:text-red"
                  >{{ el?.title }}
                </nuxt-link>
              </li>
            </ul>
          </div>
        </template>
      </div>

      <footer-social />
    </section>
    <footer-bottom />
  </footer>
</template>

<style scoped></style>
