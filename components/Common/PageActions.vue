<script setup lang="ts">
defineProps<{
  title: string
  viewsCount?: number
}>()

const link = ref('')
const show = ref(false)

if (process.client) {
  link.value = window.location.href
}

function print() {
  window.print()
}
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

<template>
  <div class="space-y-2 md:space-y-5 hidden-print">
    <div class="w-full h-[1px] bg-gray-200" />

    <div
      class="flex flex-col-reverse gap-3 md:flex-row items-center justify-between"
    >
      <div
        class="flex justify-between max-sm:flex-col md:justify-auto gap-3 md:gap-5 w-full"
      >
        <CommonButtonShare title="" />
        <div class="relative w-full">
          <CommonActionButton
            class="!w-full sm:max-w-[210px] md:max-w-[240px]"
            :text="link"
            icon="icon-copy"
            @action="copy(link)"
          />
          <BaseTooltip v-bind="{ show }">
            {{ $t('copied') }}
          </BaseTooltip>
        </div>
      </div>

      <div
        class="flex justify-between md:justify-auto gap-2.5 md:gap-4 items-center w-full md:w-max"
      >
        <div v-if="viewsCount" class="flex gap-2 items-center">
          <span class="text-lg h-5 flex-center icon-eye text-gray" />
          <p class="font-semibold text-sm truncate">
            {{ viewsCount }}
          </p>
        </div>
        <CommonActionButton
          class="!w-full md:!w-max"
          :text="$t('print_out')"
          icon="icon-printer"
          @action="print"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.shadow-drop {
  box-shadow: 0 24px 24px 0 rgba(0, 0, 0, 0.01),
    0 60px 80px 0 rgba(0, 0, 0, 0.04);
}
</style>
