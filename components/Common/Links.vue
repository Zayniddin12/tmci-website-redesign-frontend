<template>
  <div class="flex-row md:flex gap-2 md:gap-8 items-center mt-2 sm:mt-0">
    <a
      v-for="i in socials"
      :key="i.ico"
      :href="i?.link"
      class="flex gap-2 items-center group"
    >
      <i class="text-2xl text-red" :class="`icon-${i?.ico}`" />
      <p class="text-gray font-medium group-hover:!text-red duration-300">
        {{ i?.display }}
      </p>
    </a>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  socials?: {
    phone_number?: string
    email?: string
  }
}>()

const socials = computed(() => [
  {
    ico: 'phone',
    link: `tel:${props.socials?.phone_number}`,
    display: props.socials?.phone_number,
  },
  {
    ico: 'mail',
    link: `mailto:${props.socials?.email}`,
    display: props.socials?.email,
  },
])
</script>
