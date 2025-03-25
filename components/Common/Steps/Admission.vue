<template>
  <div
    class="flex flex-row lg:flex-col bg-white w-full justify-center lg:justify-start lg:w-fit p-3 lg:p-5 rounded-xl lg:rounded-3xl gap-6 relative h-fit"
  >
    <button
      v-for="(item, idx) in list"
      :key="item[valueKey]"
      class="flex-y-center gap-1 lg:gap-3 bg-transparent relative px-px"
    >
      <span
        :class="{
          'text-red border border-red/20 bg-red/5': idx + 1 <= activeIndex,
        }"
        class="shrink-0 size-7 sm:size-9 rounded-full grid place-items-center bg-gray-100 text-gray text-sm sm:text-base"
      >
        {{ idx + 1 }}
      </span>
      <span
        :class="{ 'text-red': idx + 1 <= activeIndex }"
        class="text-gray text-xs sm:text-base"
      >
        {{ item[labelKey] }}
      </span>
      <div
        v-if="idx !== list?.length - 1"
        :key="idx"
        :class="{ 'bg-red': activeIndex > idx + 1 }"
        class="bg-gray w-6 h-px lg:w-px lg:h-8 shrink-0 absolute-y left-[97%] min-[530px]:left-full lg:absolute lg:!left-4 lg:translate-x-0.5 lg:top-full"
      />
    </button>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  list: Record<string, string | number>[]
  valueKey?: string
  labelKey?: string
  activeIndex?: number
}

withDefaults(defineProps<Props>(), {
  labelKey: 'label',
  valueKey: 'id',
  activeIndex: 1,
})
</script>
