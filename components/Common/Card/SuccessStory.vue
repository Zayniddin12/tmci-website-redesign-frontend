<template>
  <div
    class="grid grid-cols-1 grid-rows-2 md:grid-rows-1 md:grid-cols-7 gap-2 md:gap-5 md:bg-white rounded-3xl xl:bg-transparent lg:place-items-center"
  >
    <div
      :class="{
        'md:col-start-5 md:col-end-8 md:row-start-1 md:row-end-2': !reversed,
      }"
      class="w-full md:col-span-3 col-start-1 col-end-8 min-[425px]:h-[323px] grid"
    >
      <CommonImage
        :alt="student_name + ' TMC student'"
        :image-class="`object-cover object-center xl:!rounded-3xl rounded-2xl size-full xl:max-w-[482px] min-[425px]:h-[323px] md:aspect-[482/323] ${
          'md:!rounded-l-none md:!rounded-r-3xl'
            ? !reversed
            : 'md:!rounded-r-3xl md:!rounded-l-none'
        }`"
        :src="student_avatar?.s1000x1000"
      />
    </div>
    <div
      :class="{
        'md:col-start-1 md:col-end-5 md:rounded-r-none md:rounded-l-3xl md:row-start-1 md:row-end-2':
          !reversed,
      }"
      class="xl:p-6 p-3 bg-white md:rounded-l-none xl:rounded-3xl rounded-2xl md:col-span-4 col-start-1 col-end-8 h-full flex flex-col gap-4 md:gap-2"
    >
      <div>
        <h2 class="font-bold md:text-xl text-xl xl:text-2.5xl">
          {{ student_name }}
        </h2>
        <p
          class="text-red md:text-base text-base xl:text-lg font-medium xl:mt-1"
        >
          {{ program_title }}
        </p>
      </div>
      <p class="text-sm text-dark font-normal mt-2 xl:mt-4" v-html="content" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ISuccessStory } from '~/types/common'

interface Props extends ISuccessStory {
  reversed?: boolean
}

defineProps<Props>()
</script>
