<template>
  <div ref="select" class="relative">
    <!--  SELECTED OPTION  -->
    <div
      :class="[
        selectedOptionStyles,
        { '!border-red !bg-white': showOptions },
        { 'border-red': error },
        { 'opacity-60 cursor-none': disabled },
      ]"
      class="bg-gray-100 pl-3 p-[11px] rounded-lg border border-gray-100 cursor-pointer flex-center-between transition-300"
      @click="toggleSelect(!showOptions)"
    >
      <slot :value="value" name="selectedOption">
        <input
          v-if="searchInput"
          v-model.trim="optionsSearch"
          :class="{ 'bg-white': showOptions }"
          :placeholder="placeholder"
          class="border-0 outline-none w-full h-4 truncate text-base sm:text-sm leading-130 placeholder:text-sm placeholder:leading-130 placeholder:font-medium"
        />

        <div
          v-if="!value && !searchInput"
          class="text-base sm:text-sm leading-130 truncate mr-7"
        >
          {{ placeholder }}
        </div>

        <div
          v-if="value && !searchInput"
          class="text-base sm:text-sm font-medium leading-130 mr-7"
        >
          {{ value[labelKey] || modelValue }}
        </div>

        <slot :is-open="showOptions" name="chevron">
          <div class="flex items-center gap-2">
            <span
              :class="{ '!-rotate-180': showOptions }"
              class="icon-chevron-down transition-300 inline-block text-xl leading-5 text-gray"
            />
          </div>
        </slot>
      </slot>
    </div>

    <!--  OPTIONS  -->
    <Transition name="select">
      <div
        v-if="showOptions"
        :key="showOptions"
        :class="{ hideScrollStyle: hideScroll }"
        class="absolute top-full w-full bg-white border border-gray-500 rounded-lg z-1 translate-y-3 overflow-x-hidden max-h-[220px] scroll-style options pt-0.5"
      >
        <slot name="options">
          <template v-if="options?.length">
            <div
              v-for="(option, idx) in options"
              :key="idx"
              :class="{ 'bg-red/10': isActive(option) }"
              class="hover:bg-gray-300 transition-300 pl-4 flex-center-between cursor-pointer"
              @click="onSelect(option)"
            >
              <slot :index="idx" :option="option" name="option">
                <h4
                  :class="{ 'font-medium text-red': isActive(option) }"
                  class="border-b border-gray-5 last:border-0 pl-0 p-3 text-dark text-2xs leading-130"
                >
                  {{ option[labelKey] }}
                </h4>
              </slot>
              <i
                v-if="isActive(option)"
                class="icon-check text-xl text-red mr-3"
              />
            </div>
          </template>
          <div v-else class="text-center py-2 text-sm text-dark">
            {{ $t('options_not_found') }}
          </div>
          <div v-if="infiniteScroll" ref="target" class="py-0.5 w-full" />
          <Transition name="fade">
            <BaseLoader v-if="loading" />
          </Transition>
        </slot>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { onClickOutside, useIntersectionObserver } from '@vueuse/core'

type TOption =
  | string
  | number
  | { [key: string]: string | number }
  | { [key: string]: string | number }[]

export interface Props {
  modelValue: TOption
  options: TOption[]
  labelKey?: string
  valueKey?: string
  selectedOptionStyles?: string
  placeholder?: string
  infiniteScroll?: boolean
  searchText?: string
  loading?: boolean
  showSelect?: boolean
  error?: boolean
  searchInput?: boolean
  disabled?: boolean
  hideScroll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  labelKey: 'name',
  valueKey: 'id',
  selectedOptionStyles: '',
  hideScroll: false,
  searchText: '',
})

const emit = defineEmits<{
  (e: 'on-toggle', value: boolean): void
  (e: 'on-select', value: any): void
  (e: 'update:modelValue', value: boolean): void
  (e: 'infinite-scroll'): void
  (e: 'searchOptions', value: string): void
}>()

const showOptions = ref(false)
const target = ref(null)
const targetIsVisible = ref(false)
const optionsSearch = ref('')

function toggleSelect(newValue = showOptions.value) {
  if (props.disabled) return

  showOptions.value = newValue
  emit('on-toggle', showOptions.value)
}

function findOption(option: TOption) {
  return props.options?.find((o) => {
    return o === option || o[props.valueKey] === option
  })
}

const value = ref(findOption(props.modelValue))

function onSelect(option: TOption) {
  value.value = option
  toggleSelect(false)
  emit('update:modelValue', option[props.valueKey] ?? option)
  emit('on-select', option)
  optionsSearch.value = option[props.labelKey] ?? option
  emit('searchOptions', '')
}

const select = ref()
onClickOutside(select, () => toggleSelect(false))

function isActive(option: TOption) {
  return (
    option === value.value ||
    (value.value && value.value[props.valueKey] === option[props.valueKey]) ||
    option[props.valueKey] === value.value
  )
}

useIntersectionObserver(target, ([{ isIntersecting }]) => {
  targetIsVisible.value = isIntersecting
})
watch(
  () => targetIsVisible.value,
  (newValue) => {
    if (newValue) {
      emit('infinite-scroll')
    }
  }
)
watch(
  () => props.modelValue,
  (newV) => {
    value.value = findOption(newV)
    showOptions.value = props?.showSelect ?? false
    if (value.value) {
      optionsSearch.value = value.value[props.labelKey] || value.value
    }
  },
  {
    immediate: true,
    deep: true,
  }
)

watch(
  () => props.options,
  () => {
    value.value = findOption(props.modelValue)
  },
  {
    deep: true,
  }
)

watch(
  () => optionsSearch.value,
  (val) => {
    if (!val) {
      emit('searchOptions', '')
    }
    emit('searchOptions', val)
  }
)
</script>

<style scoped>
.select-enter-active,
.select-leave-active {
  transition: all 0.2s ease-in-out;
}

.select-enter-from,
.select-leave-to {
  opacity: 0;
  transform: translateY(-5px);
}

.options {
  box-shadow: 0 2.76726px 2.21381px 0 rgba(0, 0, 0, 0.03),
    0 6.6501px 5.32008px 0 rgba(0, 0, 0, 0.02),
    0 12.52155px 10.01724px 0 rgba(0, 0, 0, 0.02),
    0 22.33631px 17.86905px 0 rgba(0, 0, 0, 0.01),
    0 41.77761px 33.42209px 0 rgba(0, 0, 0, 0.01),
    0 100px 80px 0 rgba(0, 0, 0, 0.01);
}

.hideScrollStyle::-webkit-scrollbar {
  width: 0px;
  height: 20px;
}
</style>
