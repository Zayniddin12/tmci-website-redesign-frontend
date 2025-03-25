<template>
  <base-dropdown
    :head-class="`sm:px-4 py-3 flex items-center gap-2 text-sm font-medium leading-130 font-normal transition-300 cursor-pointer${
      isTransparent || isExistImage
        ? 'text-white border-white/10 hover:bg-white/10'
        : 'text-dark border-gray-3 hover:bg-gray-3'
    } ${headClass}`"
    :show="showDropdown"
    body-class="card-body !w-[200px] rounded-[16px]  border  bg-white max-md:right-0 max-md:left-auto"
    @toggle="handleDropdownToggle"
  >
    <template #head>
      <div class="flex items-center">
        <i
          :class="{ 'text-white': isExistImage }"
          class="icon-world hidden sm:block text-xl text-dark"
        />
        <span
          :class="{ 'text-white': isExistImage }"
          class="hidden sm:inline-block ml-2 mr-1 text-sm font-semibold leading-normal cursor-pointer"
          >{{ currentLanguage?.name }}</span
        >
        <span
          :class="{ 'text-white': isExistImage }"
          class="inline-block sm:hidden ml-2 mr-1 text-sm font-semibold leading-normal cursor-pointer"
          >{{
            currentLanguage?.name.includes("'")
              ? currentLanguage?.name?.slice(0, 3)
              : currentLanguage?.name?.slice(0, 2)
          }}</span
        >
        <i
          :class="
            isTransparent || isExistImage ? 'text-white' : 'text-dark'
          "
          class="icon-chevron-down text-base cursor-pointer"
        />
      </div>
    </template>
    <template #body>
      <div
        v-for="(lang, index) in languagesList"
        :key="index"
        class="w-full group bg-white hover:bg-gray-3 transition-300 duration-200 hover:!bg-red/[6%]"
        @click="changeLocale(lang?.code)"
      >
        <div
          class="group flex items-center justify-between gap-4 py-2.5 px-4 cursor-pointer transition-300 border-b border-b-gray-3 group-last:border-b-0"
        >
          <span
            class="text-[15px] font-normal leading-normal text-dark group-hover:text-red transition-300"
          >
            {{ lang.name }}
          </span>
          <transition name="fade">
            <i
              v-if="lang?.code === currentLanguage?.code"
              class="icon-check text-red text-xl"
            />
          </transition>
        </div>
      </div>
    </template>
  </base-dropdown>
</template>

<script lang="ts" setup>
import { useHomeStore } from '~/store/home'
import type { TClassName } from '~/types'
import {useWindowScroll} from "@vueuse/core";

interface Props {
  variant: 'default' | 'transparent'
  isTransparent?: boolean
  headClass?: TClassName
  isExistImage: boolean
}

defineProps<Props>()

const { setLocale } = useI18n()

const store = useHomeStore()

const { changeLocale, currentLanguage, languagesList } = useLanguageSwitcher()

const showDropdown = ref(false)

function handleDropdownToggle(val: boolean) {
  showDropdown.value = val
}

onMounted(async () => {
  if (useCookie('locale').value) {
    await setLocale(useCookie('locale').value || 'en')
  }
})
</script>

<style scoped>
.card-body {
  border-radius: 16px !important;
  background: #fff;
  box-shadow: 0 3.459px 2.214px 0 rgba(0, 0, 0, 0.01),
    0 8.313px 5.32px 0 rgba(0, 0, 0, 0.01),
    0 15.652px 10.017px 0 rgba(0, 0, 0, 0.01),
    0 27.92px 17.869px 0 rgba(0, 0, 0, 0.02),
    0 52.222px 33.422px 0 rgba(0, 0, 0, 0.02),
    0 125px 80px 0 rgba(0, 0, 0, 0.03), 0 1px 40.6px 0 rgba(131, 131, 131, 0.11);
}
</style>
