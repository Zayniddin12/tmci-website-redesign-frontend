<template>
  <div
    :class="[bodyClass]"
    class="bg-white py-3 hidden-print md:py-5 hidden sm:block truncate no-scrollbar select-none overflow-x-auto"
    @mousedown="dragStart"
    @mouseleave="resetDragStartX"
    @mousemove="drag"
    @mouseup="resetDragStartX"
  >
    <div
      id="track"
      class="container flex items-center overflow-hidden w-full mt-6"
      :class="breadCrumpClass"
    >
      <NuxtLink
        class="shrink-0 hidden-print text-sm font-semibold flex items-center hover:text-red transition"
        to="/"
      >
        <i class="icon-home text-2xl mr-2 h-6 flex-center"></i>
        {{ $t('main') }}
      </NuxtLink>
      <span
        class="w-1.5 h-1.5 rounded-full shrink-0 bg-gray-300 block mx-3"
      ></span>
      <template v-for="(link, index) in routes" :key="index">
        <NuxtLink
          v-if="index !== routes.length - 1"
          :to="link.path"
          class="shrink-0 hidden-print text-sm truncate font-semibold flex items-center hover:text-red transition capitalize"
        >
          {{ link.name }}
        </NuxtLink>
        <span
          v-if="index !== routes.length - 1"
          class="w-1.5 hidden-print h-1.5 shrink-0 bg-gray-300 rounded-full block mx-3 capitalize"
        ></span>
        <span
          v-if="index === routes.length - 1"
          :class="linkClass"
          class="text-dark text-sm hidden-print font-semibold capitalize truncate"
        >
          {{ link.name }}
        </span>
      </template>
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  routes: {
    name: string
    path: string
  }[]
  linkClass?: string
  bodyClass?: string
  breadCrumpClass?: string
}

defineProps<Props>()

const dragStartX = ref<number | null>(null)

function dragStart(e: MouseEvent) {
  dragStartX.value = e.pageX - (e.currentTarget as HTMLElement).scrollLeft
}

function drag(e: MouseEvent) {
  const target = e.currentTarget as HTMLElement
  const breadCrumbTrack = target.querySelector('#track') as HTMLElement

  if (target && breadCrumbTrack) {
    if (breadCrumbTrack.offsetWidth >= breadCrumbTrack.scrollWidth) {
      return 0
    }
  }

  if (dragStartX.value) {
    if (target && breadCrumbTrack) {
      breadCrumbTrack.scrollLeft = dragStartX.value - e.pageX
    }
  }
}

function resetDragStartX() {
  dragStartX.value = null
}
</script>
