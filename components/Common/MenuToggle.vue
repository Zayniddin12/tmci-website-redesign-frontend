<script lang="ts" setup>
defineProps<{
  headerTitles: string[]
  titleClass: string | string[]
  activeTitleClass: string | string[]
}>()
</script>

<template>
  <section>
    <ul>
      <li
        v-for="(title, idx) in headerTitles"
        :key="idx"
        class="flex items-center justify-between py-3 border-b border-b-gray-200"
      >
        <span :class="[titleClass]" class="text-dark font-bold leading-120">{{
          title
        }}</span>
        <span>
          <i class="icon-chevron-right text-base text-gray" />
        </span>

        <slot name="title" v-bind="title" />
      </li>
    </ul>
  </section>
</template>

<style scoped></style>
