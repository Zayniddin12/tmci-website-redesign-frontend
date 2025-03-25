<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { useHomeStore } from '~/store/home'
import type { IProgram } from '~/types/about/index.types'
import type { IMenu } from '~/types/home.types'

const props = defineProps<{
  programs: IProgram[]
  menu: IMenu[]
  isExistImage: boolean
}>()

const emits = defineEmits<{
  (event: 'closeMobileHeader', isShow: boolean): void
}>()

const store = useHomeStore()
const router = useRouter()
const showMenu = ref<boolean>(false)
const activeIndex = ref<null | number>(null)
const activeSubIndex = ref<null | number>(null)

const announcement = computed(() => store.quickAnnouncement)

const toggleMenu = () => {
  showMenu.value = !showMenu.value
  emits('closeMobileHeader', showMenu.value)
}

const toggle = (idx: number) => {
  if (activeIndex.value === idx) {
    activeIndex.value = null
    return
  }
  activeIndex.value = idx
}

function toggleSub(index: number) {
  if (activeSubIndex.value === index) {
    activeSubIndex.value = null
    return
  }

  activeSubIndex.value = index
}

function getUrl(url: string, isUrl: boolean) {
  if (!isUrl) {
    router.push(`/${url}`)
    toggleMenu()
  }
}

// watch(
//   () => [props.programs, props.menu],
//   () => {
//     if (props.menu.length) {
//       props.menu.forEach((item: IMenu) => {
//         if (item.url === 'programs') {
//           item.children = props.programs
//         }
//       })
//     }
//   },
//   { deep: true }
// )

watch(
  () => showMenu.value,
  (val) => {
    if (val) {
      props.isExistImage = false
      document.body.style.overflow = 'hidden'
    } else {
      props.isExistImage = true
      document.body.style.overflow = 'auto'
    }
  }
)
</script>

<template>
  <nav
    :class="{
      'w-full h-screen flex flex-col gap-6 transition-300': showMenu,
    }"
    class="pt-3 pb-4 duration-200"
  >
    <div class="container flex items-center justify-between h-10">
      <transition mode="out-in" name="page-change">
        <span :key="showMenu" class="cursor-pointer" @click="toggleMenu">
          <i
            v-if="!showMenu"
            :class="{ 'text-white': isExistImage }"
            class="duration-200 icon-menu text-2.5xl"
          />
          <i
            v-else
            :class="{ 'text-white': isExistImage }"
            class="duration-200 icon-close text-2.5xl"
          />
        </span>
      </transition>
      <nuxt-link to="/">
        <NuxtImg
          alt="Logo TMC university"
          class="object-cover h-10 lg:h-11"
          height="40"
          loading="lazy"
          src="/images/logo.svg"
          title="Logo of TMC university"
          width="90"
        />
      </nuxt-link>
      <common-lang-switcher variant="default" />
    </div>

    <div
      v-if="showMenu"
      :class="{ '!w-full overflow-y-auto !opacity-100 !block': showMenu }"
      class="container"
    >
      <div
        v-for="(item, idx) in menu"
        :key="item?.id"
        class="py-3 border-b border-b-gray-200"
      >
        <div
          class="h-6 flex items-center justify-between lg:mb-5"
          @click="toggle(idx)"
        >
          <h1
            :class="{
              'cursor-pointer hover:text-red': !item?.children?.length,
            }"
            class="text-base lg:text-2xl duration-200 font-extrabold"
            @click="getUrl(item?.url, !!item?.children?.length)"
          >
            {{ item?.title }}
          </h1>

          <span
            v-if="item?.children?.length"
            :class="{ '!-rotate-90 text-red': activeIndex === idx }"
            class="lg:hidden"
          >
            <i
              :class="{ '!icon-chevron-right text-red': activeIndex === idx }"
              class="icon-chevron-right text-2xl text-gray"
            />
          </span>
        </div>

        <CollapseTransition v-if="item?.children?.length" class="lg:hidden">
          <ul v-if="activeIndex === idx" class="mt-6 space-y-6">
            <template v-if="item?.url !== 'programs'">
              <li v-for="(el, i) in item?.children" :key="i">
                <nuxt-link
                  :to="`/${el?.url}`"
                  class="text-base lg:text-lg font-medium text-gray transition-300 hover:text-red"
                  @click="toggleMenu"
                >
                  {{ el?.title }}
                </nuxt-link>
              </li>
            </template>

            <template v-else>
              <li v-for="(program, i) in item?.children" :key="i">
                <span
                  class="h-6 flex items-center justify-between lg:mb-5"
                  @click="toggleSub(i)"
                >
                  <h2
                    :class="{
                      'cursor-pointer hover:text-red':
                        !program?.children?.length,
                    }"
                    class="text-base lg:text-xl duration-200 font-medium"
                  >
                    {{ program?.title }}
                  </h2>
                  <span
                    v-if="item?.children?.length"
                    :class="{ '!-rotate-90 text-red': activeSubIndex === i }"
                    class="lg:hidden"
                  >
                    <i
                      :class="{
                        '!icon-chevron-right text-red': activeSubIndex === i,
                      }"
                      class="icon-chevron-right text-2xl text-gray"
                    />
                  </span>
                </span>

                <CollapseTransition v-if="program?.children?.length">
                  <ul v-if="activeSubIndex === i">
                    <li v-for="child in program.children">
                      <nuxt-link
                        :to="`/programs/${child?.slug}`"
                        class="inline-block mt-2 p-2 text-base lg:text-lg font-medium text-gray transition-300 hover:text-red"
                        @click="toggleMenu"
                      >
                        {{ child?.title }}
                      </nuxt-link>
                    </li>
                  </ul>
                </CollapseTransition>

                <!--                <nuxt-link v-else :to="`/programs/${program?.slug}`" class="text-base lg:text-lg font-medium text-gray transition-300 hover:text-red" @click="toggleMenu">-->
                <!--                  {{ program?.title }}-->
                <!--                </nuxt-link>-->
              </li>
            </template>
          </ul>
        </CollapseTransition>

        <ul class="hidden lg:block space-y-3">
          <template v-if="item?.url !== 'programs'">
            <li v-for="(el, i) in item?.children" :key="i">
              <nuxt-link
                :to="`/${el?.url}`"
                class="text-lg font-medium text-gray transition-300 hover:text-red"
              >{{ el?.title }}
              </nuxt-link>
            </li>
          </template>
          <template v-else>
            <li v-for="(program, i) in programs" :key="i">
              <nuxt-link
                :to="`/programs/faculty/${program?.slug}`"
                class="text-lg font-medium text-gray transition-300 hover:text-red"
              >{{ program?.title }}
              </nuxt-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped></style>