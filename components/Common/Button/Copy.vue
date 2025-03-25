<template>
  <div
    class="w-full bg-gray-4 flex-center-between gap-4 relative max-w-[240px]"
  >
    <p class="truncate text-sm font-semibold leading-130 text-dark pl-4">
      {{ link }}
    </p>
    <button
      class="w-[42px] h-[42px] bg-[#E9EBEE] flex-center hover:bg-gray-3 relative shrink-0 icon-copy text-gray-1 text-xl leading-5 transition-300"
      @click="copy(link)"
    >
      <BaseTooltip v-bind="{ show }">
        {{ $t('copied') }}
      </BaseTooltip>
    </button>
  </div>
</template>

<script setup lang="ts">
const link = ref('')
if (process.client) {
  link.value = window?.location?.href
}
const show = ref<boolean>(false)

function copy(text: string) {
  const input = document.createElement('input')
  input.value = text
  document.body.appendChild(input)

  input.select()
  document.execCommand('copy')

  document.body.removeChild(input)

  show.value = true

  setTimeout(() => {
    show.value = false
  }, 1500)
}
</script>
