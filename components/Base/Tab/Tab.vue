<template>
  <div class="relative max-md:overflow-hidden">
    <Transition mode="out-in" name="fade">
      <div
        :key="loading"
        :class="[{ 'mini-x-scroll': !loading }, parentClass]"
        class="flex-y-center gap-3 md:gap-5 max-md:overflow-y-auto border-b border-gray-7"
        @scroll="handleScroll"
      >
        <button
          v-for="(tab, idx) in list"
          :id="`item_${tab?.url ?? tab.slug}`"
          :key="idx"
          :class="[
            { '!text-dark': modelValue === (tab?.url ?? tab.slug) },
            buttonClass,
          ]"
          class="mb-4 grid font-semibold text-xs md:text-sm text-gray-1 transition-300 relative cursor-pointer shrink-0"
          style="background-color: transparent"
          @click="
            disableClicks
              ? tab.children.length === 0 && move(tab, $event)
              : move(tab, $event)
          "
        >
          <span
            v-if="!clickable"
            :class="[
              itemClass,
              { '!text-dark': modelValue === (tab?.url ?? tab.slug) },
            ]"
            class="title"
            @mouseleave="
              () => {
                changeActive(tab?.url ?? tab.slug, $event)
                emit('mouseleave', tab?.url ?? tab.slug)
              }
            "
            @mouseover="
              () => {
                changeActive(tab?.url ?? tab.slug, $event)
                $emit('mouseover', tab?.url ?? tab.slug)
              }
            "
            @click="emit('click', tab?.url ?? tab.slug)"
            >{{ tab.title }}</span
          >

          <span
            v-else
            :class="[
              itemClass,
              { '!text-dark': modelValue === (tab?.url ?? tab.slug) },
            ]"
            class="title"
            @click="
              disableClicks
                ? tab?.children.length !== 0 &&
                  changeActive(tab?.url ?? tab.slug, $event)
                : changeActive(tab?.url ?? tab.slug, $event)
            "
          >
            {{ tab.title }}
          </span>

          <span v-if="tab?.icon" class="mr-2 inline-block">
            <i
              :class="[
                tab?.icon,
                iconClass,
                {
                  '!-rotate-90 !text-gray-1':
                    modelValue === (tab?.url ?? tab.slug),
                },
              ]"
            ></i>
          </span>
        </button>
      </div>
    </Transition>
    <div
      :class="[activeClass, { 'transition-all duration-200': !isScrolling }]"
      :style="{ width: `${active.width}px`, left: `${active.left}px` }"
      class="absolute h-0.5 bg-red -translate-y-1/2 -bottom-px rounded-t-lg"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'

import type { TClassName } from '~/types'
import type { IMenu } from '~/types/home.types'
import { debounce } from '~/utils'

interface INavs {
  id: number
  title: string
  slug: string | number
  has_program?: boolean
  order?: number
  icon?: string
}

interface Props {
  modelValue?: any
  list: Partial<IMenu>[]
  itemClass?: string
  activeClass: string | string[] | TClassName
  iconClass?: string
  parentClass?: string
  activeTextClass?: string | string[]
  buttonClass?: string
  loading?: boolean
  defaultTab?: string | number
  isMenu?: boolean
  clickable?: boolean
  disableClicks?: boolean
}

const props = defineProps<Props>()

const activeTab = ref(props.defaultTab)
const router = useRouter()

const isScrolling = ref(false)

interface Emits {
  (e: 'update:modelValue', value: string | number): void

  (e: 'change', value: string | number): void

  (e: 'customChange', value: string | number): void

  (e: 'mouseover', value: string | number): void

  (e: 'mouseleave', value: string | number): void
  (e: 'click', value: string | number): void
}

const emit = defineEmits<Emits>()

const active = ref({ left: 0, width: 0 })

function moveActive() {
  const item = document.getElementById(
    `item_${props.modelValue}`
  ) as HTMLButtonElement
  active.value = {
    left:
      item?.getBoundingClientRect().x -
        item?.parentElement?.getBoundingClientRect().x || 0,
    width: item?.offsetWidth || 0,
  }
}

function changeActive(tab: string | number, e: { target: HTMLButtonElement }) {
  pick(tab, e)
  emit('change', tab)
  // @ts-ignore
  activeTab.value = tab
}

const pick = (tab: string | number, e: { target: HTMLButtonElement }) => {
  moveActive()
  emit('update:modelValue', tab)
}

onMounted(() => {
  setTimeout(() => {
    const item = document.getElementById(
      `item_${props.modelValue}`
    ) as HTMLButtonElement
    pick(props.modelValue, { target: item })
  }, 300)
})

function handleScroll() {
  isScrolling.value = true
  debounce('scroll', () => (isScrolling.value = false))
  moveActive()
}

function moveTab(tab: string | number, e: { target: HTMLButtonElement }) {
  if (props.isMenu) {
    moveActive()
    emit('update:modelValue', tab)
  }
}

function move(tab: { slug: string; url: string }, $event: MouseEvent) {
  if (props.isMenu) {
    if (tab?.url ?? tab?.slug !== '/life-at-tmc') {
      router.push({ path: '/' + (tab?.url ?? tab.slug) })
    }
  }

  changeActive(tab?.url ?? tab.slug, $event)
}

watch(
  () => props.modelValue,
  () => {
    setTimeout(() => {
      const item = document.getElementById(
        `item_${props.modelValue}`
      ) as HTMLButtonElement
      pick(props.modelValue, { target: item })
    }, 100)
  }
)

watch(
  () => props.loading,
  () => {
    setTimeout(() => {
      const item = document.getElementById(
        `item_${props.modelValue}`
      ) as HTMLButtonElement
      pick(props.modelValue, { target: item })
    }, 500)
  }
)
</script>

<style scoped>
.title::after {
  content: attr(data-text);
  height: 0;
  visibility: hidden;
  overflow: hidden;
  user-select: none;
  pointer-events: none;
  font-weight: 600;
}

.mini-x-scroll::-webkit-scrollbar {
  height: 0 !important;
}

.mini-x-scroll::-webkit-scrollbar-track {
  background: transparent !important;
}

.mini-x-scroll::-webkit-scrollbar-thumb {
  background: transparent !important;
}
</style>
