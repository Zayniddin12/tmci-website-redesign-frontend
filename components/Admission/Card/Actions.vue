<script lang="ts" setup>
defineProps<{
  currentStep: number
  loading: boolean
  disabled: boolean
  buttonLoading: boolean
}>()

defineEmits<{
  (event: 'continue'): void
  (event: 'back'): void
}>()
</script>

<template>
  <div class="flex justify-end space-x-3 mt-6 items-end">
    <BaseButton
      v-show="currentStep > 1"
      class="md:min-w-[174px] h-10"
      variant="primary"
      @click="$emit('back')"
    >
      {{ $t('back') }}
    </BaseButton>

    <BaseButton
      :disabled="disabled"
      :loading="buttonLoading"
      class="md:min-w-[174px] h-10"
      variant="error"
      @click="$emit('continue')"
    >
      {{ $t('continue') }}
    </BaseButton>
  </div>
</template>

<style scoped></style>
