<template>
  <div>
    <div
      class="h-[444px] w-full bg-[url('/images/cooperation-header.png')] bg-cover"
      :style="`background-image: url(${
        data?.background_image || data?.cover_image
      })`"
    >
      <div class="absolute w-full h-[444px] bg-dark/60"></div>
    </div>
    <div
      class="bg-white wrapper-bg relative container md:-top-[72px] pb-5 md:pb-10"
    >
      <button
        class="icon-arrow absolute top-3 md:top-10 left-4 md:left-10 text-3xl cursor-pointer hover:text-blue"
        @click="$router.back()"
      />

      <div class="md:w-3/4 mx-auto pt-12 md:pt-8">
        <div class="flex items-start justify-between gap-6">
          <div>
            <div
              v-if="showSingleInfo && !data?.cover_image"
              class="flex-y-center gap-1.5 mb-3 text-gray-1 text-base font-medium leading-normal"
            >
              <div class="flex-y-center gap-1">
                <i class="icon-calendar text-gray-1 text-xl leading-5" />
                {{
                  dayjs(data?.event_date ?? data?.published_at).format(
                    'DD.MM.YYYY'
                  )
                }}
              </div>
              <span class="w-1.5 h-1.5 bg-gray-2 rounded-full" />
              <div class="flex-y-center gap-1">
                <i class="icon-eye text-gray-1 text-xl leading-5" />
                {{ formatNumberSpace(data?.views_count) }}
              </div>
              <span
                v-if="singleType"
                class="w-1.5 h-1.5 bg-gray-2 rounded-full"
              />
              <span v-if="singleType">{{ singleType }}</span>
            </div>
            <h1
              class="mb-2 text-[32px] font-bold text-dark leading-130 group-hover:text-blue"
            >
              {{ data.title }}
            </h1>
            <p class="font-medium text-sm mt-3 text-gray-1 leading-tight">
              {{ data.subtitle }}
            </p>
          </div>
          <slot name="afterHead" />
        </div>
        <div>
          <slot name="beforeContent" />
          <div
            class="text-base font-normal pt-6 pb-8 static-text"
            v-html="data?.description"
          />

          <CommonSingleActions
            :title="data.title"
            :views="data.views_count"
            :is-show-eye="data?.cover_image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'

import type { ICooperationSingle } from '~/types/about/index.types'

interface Props {
  data: ICooperationSingle
  singleType?: string
  showSingleInfo?: boolean
}

defineProps<Props>()

const router = useRouter()
</script>
<style scoped>
.wrapper-bg {
  box-shadow: 0 2.767256498336792px 2.2138051986694336px 0 #00000008,
    0 6.650102138519287px 5.32008171081543px 0 #00000005,
    0 12.521552085876465px 10.017241477966309px 0 #00000005,
    0 22.3363094329834px 17.869047164916992px 0 #00000004,
    0 41.777610778808594px 33.422088623046875px 0 #00000003,
    0 100px 80px 0 #00000002;
}
</style>
