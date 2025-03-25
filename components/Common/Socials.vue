<script lang="ts" setup>
const props = defineProps<{
  iconClass?: string
  bgClass?: string
  socials: {
    instagram?: string
    youtube?: string
    telegram?: string
    linkedin?: string
    facebook?: string
  }
}>()

const isTooltipVisible = ref(false)

function showTooltip(e: MouseEvent, item: { social: string; link: string }) {
  const target = e.currentTarget
  isTooltipVisible.value = true
}

function hideTooltip(e: MouseEvent, item: { social: string; link: string }) {
  isTooltipVisible.value = false
}

const socials = computed(() => [
  {
    social: 'Instagram',
    link: props.socials?.instagram ?? '',
  },
  {
    social: 'Telegram',
    link: props.socials?.telegram ?? '',
  },
  {
    social: 'Linkedin',
    link: props.socials?.linkedin ?? '',
  },
  {
    social: 'YouTube',
    link: props.socials?.youtube ?? '',
  },
  {
    social: 'Facebook',
    link: props.socials?.facebook ?? '',
  },
])
</script>

<template>
  <div class="flex-y-center gap-3 md:gap-4">
    <ul class="flex gap-4">
      <template v-for="i in socials" :key="i.social">
        <li
          v-if="i?.link"
          :data-key="i.social"
          class="relative bg-[#E6EAED] rounded-lg w-9 h-9 flex items-center justify-center hover:!bg-red group transition-300"
          :class="[bgClass]"
          @mouseenter="(e) => showTooltip(e, i)"
          @mouseleave="(e) => hideTooltip(e, i)"
        >
          <CommonSocialLink :social="i" :icon-class="iconClass" />
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped></style>
