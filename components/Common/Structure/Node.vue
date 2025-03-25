<template>
  <div class="w-full relative shrink-0">
    <!-- <<< SUBHEAD::: only has vertical lines  >>> -->
    <div
      v-if="isSubHead"
      :class="{ 'h-[110px] mb-6': isSubHead && staff_members?.length > 0 }"
      class="relative mb-4"
    >
      <!-- TOP SUB HEAD LEFT AND RIGHT HORIZONTAL LINES -->
      <div
        v-if="isLast || isFirst"
        :class="{ 'left-1/2': isLast, 'right-1/2': isFirst }"
        class="max-lg:hidden w-[60.5%] bg-gray-100 h-px absolute -top-3"
      />

      <!-- NODE IF HAS STAFF MEMBERS   -->
      <NuxtLink
        v-if="staff_members?.length > 0"
        :to="{
          name: 'about-us-structure-slug',
          params: { slug: slug },
        }"
        class="rounded-2xl border border-gray-300 bg-gray-100 px-3 flex-col gap-2 absolute z-3 size-full flex-x-center group transition-300 hover:border-red"
      >
        <CommonStructureMembers :members="staff_members" />
        <p class="text-center text-red mx-auto line-clamp-2">
          {{ title }}
        </p>
      </NuxtLink>

      <!--  NODE IF HAS NO STAFF MEMBERS-->
      <h3
        v-else
        class="font-medium bg-gray-200 border rounded-2xl p-4 text-center relative z-3"
      >
       {{ title }}
      </h3>

      <!-- VERTICAL LINE IN CENTER TOP/BOTTOM-->
      <div
        :class="{
          '-top-3 h-4': !subunits.length,
          'h-[calc(100%+22px)] -top-3 max-lg:': subunits.length > 0,
        }"
        class="absolute-x z-1 w-px bg-gray-300 max-lg:!h-[calc(100%+7px)] max-lg:top-1"
      />

      <!-- HORIZONTAL LINE FOR CHILD NODES IF HAS ONE OR MORE -->
      <div
        v-if="subunits?.length > 0"
        class="absolute z-1 h-0.5 right-[calc(50%-1px)] w-1/2 bg-gray-300 -bottom-3"
      />

      <!-- VERTICAL LINE TO CONNECT CHILD NODES -->
      <div
        :style="{ height: children?.clientHeight + 'px' }"
        class="absolute top-[calc(100%+10px)] w-0.5 bg-gray-300"
      />

      <!-- MOBILE LINE --- LEFT -->
      <div
        class="absolute-y h-px w-full bg-gray-300 z-3 right-full lg:hidden"
      />
      <div
        v-if="isLast"
        :style="{ height: children?.clientHeight + 'px' }"
        class="lg:hidden absolute z-1 h-72 w-0.5 bg-gray-100 top-1/2 right-[calc(100%+22px)]"
      />
    </div>

    <!-- <<< CHILD::: has left horizontal line.  if has children(subunits), then also bottom vertical line >>> -->

    <!-- <<< has left horizontal line.  has subunits bottom vertical line >>> -->
    <div
      v-else-if="staff_members?.length > 0"
      class="ml-3 w-[calc(100%-12px)] mt-3 relative h-[100px] mb-6"
    >
      <NuxtLink
        :to="{
          name: 'about-us-structure-slug',
          params: { slug: slug },
        }"
        class="rounded-2xl border border-gray-300 bg-gray-100 px-3 flex-col gap-2 absolute z-3 size-full flex-x-center transition-300 hover:border-red"
      >
        <CommonStructureMembers :members="staff_members" />
        <p class="text-center text-red line-clamp-2">
          {{ title }}
        </p>
      </NuxtLink>
      <!-- HORIZONTAL LEFT LINE -->
      <div class="absolute-y right-full w-2.5 h-px bg-gray-300 z-2" />

      <!-- VERTICAL BOTTOM LINE-->
      <div
        v-if="subunits.length > 0"
        class="absolute-x z-1 h-4 w-px bg-gray-300 top-full"
      />
      <!-- HORIZONTAL BOTTOM LINE -->
      <div
        v-if="subunits.length > 0"
        class="absolute z-1 h-0.5 right-[calc(50%-1px)] w-1/2 bg-gray-300 -bottom-4"
      />

      <div
        v-if="isLast"
        :class="{ '!h-52 max-lg:!h-40': type === 'subchild' }"
        :style="{ height: children?.clientHeight + 'px' }"
        class="absolute z-1 h-40 w-0.5 bg-gray-100 top-1/2 right-[calc(100%+10px)]"
      />

      <!-- BIG VERTICAL LINE FOR CHILD NODES-->
      <div
        v-if="subunits?.length > 0"
        :style="{ height: children?.clientHeight + 'px' }"
        class="absolute top-[calc(100%+15px)] w-0.5 bg-gray-300"
      />
    </div>

    <!-- CHILD: HAS NO STAFF MEMBERS-->
    <div
      v-else
      :class="{ 'mb-6': subunits.length > 0 }"
      class="ml-3 mt-3 relative !w-[calc(100%-12px)]"
    >
      <h3
        class="font-medium bg-gray-200 border rounded-2xl p-4 text-center relative z-3"
      >
        {{ title }}
      </h3>
      <!-- HORIZONTAL LEFT LINE -->
      <div class="absolute-y right-full w-2.5 h-px bg-gray-300 z-2" />
      <!-- VERTICAL BOTTOM LINE-->
      <div
        v-if="subunits.length > 0"
        class="absolute-x z-1 h-4 w-px bg-gray-300 top-full"
      />
      <!-- HORIZONTAL BOTTOM LINE -->
      <div
        v-if="subunits.length > 0"
        class="absolute z-1 h-0.5 right-[calc(50%-1px)] w-1/2 bg-gray-300 -bottom-4"
      />
      <div
        v-if="isLast"
        :class="{ 'max-lg:h-full h-72': type === 'subchild' }"
        :style="{ height: children?.clientHeight + 100 + 'px' }"
        class="absolute z-1 h-8 w-0.5 bg-gray-100 top-1/2 right-[calc(100%+10px)]"
      />

      <!-- BIG VERTICAL LINE FOR CHILD NODES-->
      <div
        v-if="subunits?.length > 0"
        :style="{ height: children?.clientHeight + 'px' }"
        class="absolute top-[calc(100%+15px)] w-0.5 bg-gray-300"
      />
    </div>

    <!-- <<<RECURSIVE RENDERING>>> -->
    <div v-if="subunits?.length > 0" ref="children" class="flex flex-col gap-3">
      <CommonStructureNode
        v-for="(subunit, idx) in subunits"
        :key="idx"
        :class="{ 'ml-3 !w-[calc(100%-12px)]': !isSubHead }"
        :is-last="idx === subunits.length - 1"
        v-bind="subunit"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IStructureNode } from '~/types/common'

interface Props extends IStructureNode {
  isLast: boolean
  isFirst?: boolean
}

const props = defineProps<Props>()

const isSubHead = computed(() => props.type === 'subtree')

const children = ref<HTMLDivElement>({} as HTMLDivElement)

// onMounted(() => {
//   requestAnimationFrame(() => {
//     console.log(lastChild.value, headChild.value)
//     if (lastChild.value && headChild.value) {
//       const lastRect = lastChild.value.getBoundingClientRect()
//       const headRect = headChild.value.getBoundingClientRect()
//
//       console.log(lastChild.value, headChild.value)
//       if (lastRect && headRect) {
//         verticalLineHeight.value = lastRect.y - headRect.y
//       }
//     }
//   })
// })
// watch(
//   () => [lastChild.value, headChild.value],
//   ([last, head]) => {
//     console.log(last, head)
//     if (last && head) {
//       const lastRect = last.getBoundingClientRect()
//       const headRect = head.getBoundingClientRect()
//
//       if (lastRect && headRect) {
//         verticalLineHeight.value = lastRect.y - headRect.y
//       }
//     }
//   },
//   { deep: true } // Trigger the watch immediately
// ) hi from devops
</script>

<style>
:root {
  --font-h5: clamp(1rem, 0.9235rem + 0.3265vw, 1.25rem);
  --font-h6: clamp(1rem, 0.9617rem + 0.1633vw, 1.125rem);
}
</style>
