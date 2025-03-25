<script lang="ts" setup>
import dayjs from 'dayjs'

const currentYear = dayjs().format('YYYY')
</script>

<template>
  <section class="bg-gray-200 py-5">
    <div
      class="container xl:max-w-[1216px] mx-auto flex flex-col md:flex-row space-y-4 lg:space-y-0 md:items-center justify-between"
    >
      <p class="text-dark">
        Copyright © {{ currentYear }} TMC. All Rights Reserved
      </p>
    </div>
  </section>
</template>

<style scoped>
p,
span {
  font-size: 14px;
  font-feature-settings: 'clig' off, 'liga' off;
  font-style: normal;
  line-height: 140%; /* 19.6px */
}

p {
  font-weight: 400;
}

span {
  font-weight: 500;
}
</style>
