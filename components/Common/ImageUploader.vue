<template>
  <div class="h-full w-auto inline-flex items-center">
    <input
      :id="randomNumber"
      ref="input"
      accept=".doc,.docx, .pdf"
      class="w-0 h-0 absolute"
      multiple
      name="file"
      type="file"
      @change="handleFile"
    />
    <div
      :class="{
        'border-red': error,
      }"
      class="flex w-full gap-3 p-1.5 pl-3 bg-gray-100 rounded-lg border border-gray-300 border-dashed items-center justify-between h-11"
    >
      <p v-if="docs?.name" class="font-medium text-sm text-dark truncate">
        {{ docs?.name }}
      </p>
      <p v-else class="font-medium text-sm text-gray line-clamp-1">
        {{ $t('drag_drop') }}
      </p>
      <label :for="randomNumber" @click="getFile">
        <BaseButton
          :text="$t('form.select_file')"
          size="small"
          variant="primary"
        />
      </label>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue'

import { useHandleError } from '~/composables/useHandleError'

type Timage = {
  url: string | undefined
  name: string
  file: File
  type: string
  status: string
}

const emit = defineEmits<{
  (e: 'showMediaReason', value: Timage): void
  (e: 'change', val: Timage): void
  (e: 'showGallery', index: number, type: string): void
  (e: 'removeMedia', value: string): void
}>()

const props = defineProps<{
  defaultFile: string
  error?: boolean
}>()
const { handleError } = useHandleError()
const docs = reactive<Timage>({})
const uploadType = ref('')
const editID = ref(0)
const randomNumber = ref(0)
const input = ref()
const config = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

watch(
  () => props.defaultFile,
  (value) => {
    if (value) {
      docs.url = value
      docs.name = ''
      docs.file = null
      docs.type = 'image'
      docs.status = 'pending'
    }
  },
  {
    immediate: true,
  }
)
const handleFile = async (event: Event) => {
  const target = event?.target as HTMLInputElement | null
  if (target?.files === null) {
    return
  }
  handleUploader(target)
  send()
}
const handleUploader = (target: FileList) => {
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.readAsDataURL(target?.files[0])
    reader.onerror = (error) => reject(error)
  })
    .then((res) => {
      const formData = new FormData()

      formData.append('file', target?.files[0])
      formData.append('file_type', 'doc')

      useApi()
        .$post('upload_file/', formData, config)
        .then((response: any) => {
          docs.id = response?.data?.id
          docs.url = res as string
          docs.name = target?.[0].name
          docs.file = target?.[0]
          docs.type = 'image'

          send()
        })
        .catch((response) => {
          handleError(response)
        })

      send()
    })
    .catch((err) => {
      handleError(err)
    })
}

const getFile = () => {
  uploadType.value = 'create'
  input.value?.click()
}
const editImage = (index: number) => {
  editID.value = index
  getFile()
}

function send() {
  emit('change', docs)
}

onMounted(() => {
  randomNumber.value = Math.floor(Math.random() * 101)
})
</script>
<style>
.color {
  color: #e74c3c;
}
</style>
