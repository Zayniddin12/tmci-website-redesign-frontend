<template>
  <a
    :href="file"
    class="flex-center-between gap-2 p-2 pr-3 border border-red rounded-xl bg-white"
    rel="noopener noreferrer"
    target="_blank"
  >
    <div class="flex-y-center gap-2 max-w-[80%]">
      <div class="flex-center w-8 h-8 bg-white border rounded-lg">
        <i
          :class="
            videoTypeList?.includes(getFileType(name))
              ? 'icon-player-stroke'
              : 'icon-file'
          "
          class="text-gray/70 text-2xl"
        />
      </div>
      <div>
        <span
          class="text-sm w-full font-medium text-black line-clamp-1 hover:text-red transition-300"
        >
          {{ slicedFileName }}
        </span>
        <p class="text-xs leading-130 font-medium text-gray-300">
          {{ convertBytes(size) }}
        </p>
      </div>
    </div>
    <div
      :key="loading"
      class="shrink-0 w-5 h-5 text-center flex-center"
      @click.prevent="downloadFile(file, name)"
    >
      <i
        v-if="!loading"
        class="icon-download text-xl text-red cursor-pointer hover:text-red/50 transition-300"
      />
      <div v-else class="spinner" />
    </div>
  </a>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

interface Props {
  file?: string
  name: string
  size: number
}

const props = defineProps<Props>()

function getFileType(fileName: string) {
  // Use a regular expression to extract the file extension
  const regex = /(?:\.([^.]+))?$/
  const extension = regex.exec(fileName)?.[1]

  // Ensure the extension is in lowercase for consistency
  if (extension) {
    return extension.toLowerCase()
  } else {
    // If there's no extension, you can handle it in a way that makes sense for your application
    // For example, you could return 'unknown' or throw an error.
    return 'unknown'
  }
}

const loading = ref(false)

const videoTypeList = [
  'mp4',
  'avi',
  'mkv',
  'mov',
  'wmv',
  'flv',
  'webm',
  'm4v',
  '3gp',
  'mpeg',
  'm2ts',
  'ts',
  'vob',
  'rm',
  'divx',
  'ogv',
  'mpg',
  'qt',
  'swf',
  'mxf',
  'asf',
  'rmvb',
  'ogm',
  'tsv',
  'flv',
  'ogx',
  'nut',
  'h264',
  'h265',
  'ts',
  'mts',
  'm2v',
  'm2ts',
  'm4p',
  'm4v',
  'f4v',
  '3g2',
  'ogg',
  'mp3',
  'wav',
  'flac',
  'amr',
  'aac',
  'wma',
  'ra',
  'ogg',
  'au',
  'aiff',
  'mka',
  'mpc',
  'opus',
  'ac3',
  'dts',
]

const slicedFileName = computed(() => {
  if (props.name?.length > 30) {
    return props.name.slice(0, 30) + '...'
  } else {
    return props.name
  }
})
</script>

<style scoped>
.spinner {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 3.8px solid #8898aa;
  animation: spinner-bulqg1 0.8s infinite linear alternate,
    spinner-oaa3wk 1.6s infinite linear;
}

@keyframes spinner-bulqg1 {
  0% {
    clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
  }

  12.5% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 0%,
      100% 0%,
      100% 0%
    );
  }

  25% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      100% 100%,
      100% 100%
    );
  }

  50% {
    clip-path: polygon(
      50% 50%,
      0 0,
      50% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }

  62.5% {
    clip-path: polygon(
      50% 50%,
      100% 0,
      100% 0%,
      100% 0%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }

  75% {
    clip-path: polygon(
      50% 50%,
      100% 100%,
      100% 100%,
      100% 100%,
      100% 100%,
      50% 100%,
      0% 100%
    );
  }

  100% {
    clip-path: polygon(
      50% 50%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      50% 100%,
      0% 100%
    );
  }
}

@keyframes spinner-oaa3wk {
  0% {
    transform: scaleY(1) rotate(0deg);
  }

  49.99% {
    transform: scaleY(1) rotate(135deg);
  }

  50% {
    transform: scaleY(-1) rotate(0deg);
  }

  100% {
    transform: scaleY(-1) rotate(-135deg);
  }
}
</style>
