<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useHomeStore } from '~/store/home'
import type { IMenu } from '~/types/home.types'

interface Item {
  value: string | number
  isShow: boolean
}

defineProps<{
  showMenu: boolean
  menu: IMenu[]
  isExistImage: boolean
}>()

const store = useHomeStore()

const emits = defineEmits<{
  (e: 'activeMenu', value: string): void
  (e: 'change', item: Item): void
}>()

const { t } = useI18n()
const activeTab = ref('programs')
const getActiveMenu = (val: Item) => {
  emits('change', val)
}

const pushToPage = (val: Item) => {
  if (val.value === 'contacts') {
    useRouter().push({ name: 'contacts' })
  }
}
</script>

<template>
  <nav>
    <base-tab
      v-model="activeTab"
      disable-clicks
      :active-class="[
        '!-bottom-[18px] z-50 rounded-[10px]',
        { '!hidden': !showMenu || activeTab === 'contacts' },
        { 'bg-white': showMenu },
      ]"
      :item-class="[
        {
          'text-sm font-medium leading-5 cursor-pointer transition-300 !text-white':
            isExistImage,
        },
        'text-sm font-medium leading-5 cursor-pointer transition-300',
      ]"
      :list="menu"
      button-class="!bg-none"
      is-menu
      parent-class="flex items-center !gap-4 !border-none mt-4"
      @change="$emit('activeMenu', $event)"
      @mouseleave="getActiveMenu({ value: $event, isShow: false })"
      @mouseover="getActiveMenu({ value: $event, isShow: true })"
      @click="pushToPage({ value: $event })"
    />
  </nav>
</template>

<style scoped></style>
