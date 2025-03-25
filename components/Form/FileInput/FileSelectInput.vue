<template>
  <div
    class="relative"
    @dragover.prevent="handleDragOver"
    @drop.prevent="handleDrop"
    @dragenter.prevent="handleDragEnter"
    @dragleave.prevent="handleDragLeave"
  >
    <div
      :class="[
        { '!border-red': error },
        { '!border-red !border-dashed': dragging },
      ]"
      class="card flex items-center p-2.5 justify-between border border-gray-5 bg-gray-4 pl-4 relative"
    >
      <div v-if="media.file" class="flex-y-center">
        <p
          class="text-dark font-medium leading-130 text-sm line-clamp-1 break-all"
        >
          {{ Object.keys(media.media) ? media.file : media.media }}

          <slot name="image"></slot>
        </p>
      </div>
      <span
        v-else
        :class="{
          '!text-red': dragging,
        }"
        class="font-medium leading-130 text-gray-2 text-sm transition-300 line-clamp-1"
      >
        {{
          modelValue || dragging
            ? $t('drop_file_here')
            : $t('drag_file_here_or_select_file')
        }}
        <slot name="image"></slot>
      </span>
      <BaseButton
        v-if="false"
        :text="btnClearer ? $t('remove_file') : $t('choose_file')"
        class="!py-2 border border-red hover:bg-red hover:text-white transition-300"
        icon="icon-upload text-sm"
        size="small"
        variant="secondary"
        @click="btnHandler"
      />
    </div>
    <input
      id="media"
      ref="mediaInput"
      :accept="accept"
      class="w-0 h-0 absolute opacity-0"
      multiple
      name="file"
      type="file"
      @change="handleFile"
      @click="$event.target.value = ''"
    />
  </div>
</template>
<script lang="ts" setup>
import { useHandleError } from '~/composables/useHandleError'

interface Props {
  label?: string
  placeholder: string
  modelValue: object | string | File
  accept: string
  error?: boolean
}

const props = defineProps<Props>()
const { handleError } = useHandleError()
const emit = defineEmits<{
  (e: 'update:modelValue', val: File | string): void
}>()
const mediaInput = ref(null)
const btnClearer = ref(false)
const media = reactive({
  media: '',
  file: null,
})
const currentTarget = ref(null)
const handleFile = async (event: Event) => {
  const target = event?.target as HTMLInputElement | null
  if (target?.files === null) {
    return
  }
  if (target?.files) {
    handleUploader(target)
  }
}
const handleUploader = (target) => {
  const file = target.files?.[0]
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(target?.files[0])
    reader.onerror = (error) => reject(error)
  })
    .then(() => {
      // Do not touch this, or else You will find yourself DEAD!!!
      media.media = file?.name
      media.file = file
      emit('update:modelValue', file)
    })
    .catch((err) => {
      handleError(err)
    })
}
const getFile = () => {
  mediaInput?.value?.click()
}

function clearForm() {
  media.file = null
  media.media = ''
  emit('update:modelValue', '')
}

function btnHandler() {
  // form.media ? clearForm : handleMedia
  if (media.media && media.file) {
    clearForm()
  } else if (media.media && !media.file) {
    clearForm()
  } else {
    getFile()
  }
}

watch(
  () => media.media,
  (val) => {
    if (media.media && media.file) {
      btnClearer.value = true
    } else if (media.media && !media.file) {
      btnClearer.value = true
      emit('update:modelValue', media.media)
    } else {
      btnClearer.value = false
    }
    if (!val) {
      clearForm()
    }
  }
)
const dragging = ref(false)

const handleDragOver = (event: Event) => {
  event.preventDefault()
}

const handleDragEnter = (e: Event) => {
  dragging.value = true
  currentTarget.value = e?.target
}

const handleDragLeave = (e: Event) => {
  if (e?.target === currentTarget.value) {
    currentTarget.value = null
    dragging.value = false
  }
}

const handleDrop = (event: DragEvent) => {
  event.preventDefault()
  dragging.value = false
  const files = event.dataTransfer?.items
  if (files) {
    handleUploader(event.dataTransfer)
  }
}

onMounted(() => {
  media.media = props.modelValue
})

watch(
  () => props.modelValue,
  () => {
    if (!props.modelValue) {
      media.media = ''
      media.file = null
    } else {
      media.media = props.modelValue?.name
      media.file = props.modelValue?.name
    }
  },
  { deep: true, immediate: true }
)
</script>

<style scoped>
.card {
  border-radius: 8px;
  border: 1px dashed #cfd4d8;
  background: #f6f7f8;
}
</style>
