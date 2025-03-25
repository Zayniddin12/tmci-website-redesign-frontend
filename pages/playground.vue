<script lang="ts" setup>
import MilestoneInfo from '~/components/About/Card/MilestoneInfo.vue'
import MilestoneYear from '~/components/About/Card/MilestoneYear.vue'
import type { MilestoneCard } from '~/types/admission/index.types'

const fakeData: MilestoneCard[] = [
  {
    id: 1,
    year: '2015',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 2,
    year: '2016',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 3,
    year: '2017',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
  {
    id: 4,
    year: '2018',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
]
</script>

<template>
  <main class="my-10 bg-white py-10 space-y-10">
    <milestone-info :cards="fakeData" />
    <milestone-year />
  </main>
</template>
