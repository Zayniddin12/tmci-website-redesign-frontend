<script setup lang="ts">
interface Props {
  defaultValue?: string
}
const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'search', value: string): void
}>()

const search = ref('')

const clear = () => {
  search.value = ''
  emit('search', search.value)
}

watch(
  () => props.defaultValue,
  (newValue) => {
    if (newValue === search.value) return
    search.value = newValue || ''
  },
  { immediate: true }
)
</script>

<template>
  <FormInput
    v-model="search"
    class="max-w-[380px] w-full bg-white !p-1 !pl-3 !gap-1.5"
    input-class="!caret-blue"
    :placeholder="$t('what_are_you_looking_for')"
    suffix-class="flex-y-center gap-1"
  >
    <template #prefix>
      <i class="icon-search text-gray-2 text-xl leading-5" />
    </template>
    <template #suffix>
      <button
        class="icon-x-mark text-gray-2 leading-5 scale-0 opacity-0 hover:text-red transition-300"
        :class="{ '!scale-100 !opacity-100': search.length }"
        @click="clear"
      />
      <button
        class="w-8 h-8 flex-center bg-blue icon-search text-xl leading-5 text-white shrink-0 hover:bg-blue-100 transition"
        @click="$emit('search', search)"
      />
    </template>
  </FormInput>
</template>

<style scoped></style>
