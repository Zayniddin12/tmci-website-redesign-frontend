<template>
  <div class="p-1 bg-white rounded-3xl shadow-testimonial select-none">
    <div
      class="flex flex-col lg:flex-row gap-x-4 bg-gray-50 rounded-3xl h-full items-center"
    >
      <div class="md:shrink-0 md:min-h-[360px] grid w-full lg:w-fit">
        <img
          :alt="student_name + ' testimonial'"
          :src="student_avatar?.s1000x1000"
          class="lg:w-[300px] w-full h-[368px] object-cover object-top rounded-3xl lg:rounded-l-3xl"
        />
      </div>

      <div class="grid gap-3 md:gap-8 p-3 md:py-8 md:pr-6">
        <div class="flex-center-between gap-2">
          <div class="grid gap-1">
            <h2 class="text-xl font-bold">{{ student_name }}</h2>
            <p class="text-sm text-gray">{{ program_title }}</p>
          </div>

          <img
            :alt="student_name"
            class="size-6 md:size-10"
            src="/images/quote.svg"
          />
        </div>
        <p class="text-sm">
          {{ richTextPurify(content, 1000) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { IStudentTestimonial } from '~/types/common'

defineProps<IStudentTestimonial>()
</script>
