<script lang="ts" setup>
import type { IProgram } from '~/types/about/index.types'
import type { IMenu } from '~/types/home.types'

const props = defineProps<{
  activeMenu: string | number
  programs: IProgram[]
  menu: IMenu[]
}>()

const currentMenu = computed(() => {
  return props.menu.find((item) => item.url === props.activeMenu) as IMenu
})
</script>

<template>
  <section class="pb-7 pt-6 grid grid-cols-3">
    <div
      v-if="activeMenu !== 'programs'"
      :key="activeMenu"
      class="grid items-start grid-cols-2 col-span-2"
    >
      <h1 class="col-span-2 text-dark text-2xl font-[800] mb-4">
        {{ currentMenu?.title }}
      </h1>

      <ul class="grid grid-cols-2 gap-x-5 gap-y-3 w-full">
        <li v-for="(link, id) in currentMenu?.children" :key="id">
          <NuxtLink
            :to="link?.url.startsWith('http') ? link?.url : '/' + link?.url"
            :target="link?.url.startsWith('http') ? '_blank' : '_self'"
            class="text-base text-gray font-normal leading-normal transition-300 hover:text-red"
            >{{ link?.title }}
          </NuxtLink>
        </li>
      </ul>

      <div
        v-if="currentMenu?.showcase"
        class="flex items-center gap-4 w-full col-start-2 col-end-3"
      >
        <CommonImage
          :alt="currentMenu?.showcase?.title"
          :src="currentMenu?.showcase?.image?.s500x500"
          class="w-full h-full object-cover rounded-lg overflow-hidden min-w-[281px] min-h-[158px] aspect-[281/158]"
        />
        <div class="w-full">
          <h3 class="line-clamp-2 font-bold sm:text-lg mb-1 w-full">
            {{ currentMenu?.showcase?.title }}
          </h3>
          <p class="text-sm line-clamp-2 w-full">
            {{ currentMenu?.showcase?.subtitle }}
          </p>
          <a
            v-if="currentMenu?.showcase?.redirect_url"
            :href="currentMenu?.showcase?.redirect_url"
            class="text-gray block w-full mt-3 font-medium text-sm duration-200 group hover:text-red"
            target="_blank"
            >{{ $t('go_to_link') }}
            <span
              class="icon-external-link ml-1 -mb-0.5 text-gray font-medium text-lg inline-block translate-y-0.5 duration-200 group-hover:text-red"
            ></span
          ></a>
        </div>
      </div>
    </div>

    <div v-else class="col-span-3">
      <h1 class="text-dark text-2xl font-[800] mb-4">
        {{ currentMenu?.title }}
      </h1>

      <div
        class="grid grid-cols-4 grid-rows-2 gap-x-6 gap-y-6 [grid-auto-flow:_row-dense]"
        style="position: relative"
      >
        <div
          v-for="(item, idx) in currentMenu.children"
          :key="idx"
          :class="[
            item.children.length ? 'inline-block mb-6' : '',
            idx >= 4 ? 'col-start-4' : '',
            idx === currentMenu.children.length - 1 ? 'mt-10' : '', // Add margin for the last child
          ]"
          :style="
            idx === currentMenu.children.length - 1
              ? { position: 'absolute', top: '40px' }
              : {}
          "
        >
          <NuxtLink
            :to="item?.url?.startsWith('/') ? item?.url : '/' + item?.url"
            class="text-lg inline-block font-bold mb-3 transition-300 hover:text-red"
          >
            {{ item?.title }}
          </NuxtLink>

          <ul
            v-if="item?.children?.length > 0"
            :class="{ 'pb-3': item?.children?.length - 1 }"
            class="space-y-3"
          >
            <li v-for="(link, i) in item?.children" :key="i">
              <NuxtLink
                :to="'/' + link?.url"
                class="text-base text-gray inline font-normal leading-normal transition-300 hover:text-red"
              >
                {{ link?.title }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
