<script lang="ts" setup>
import { formatPhoneNumber } from '~/utils'

const props = withDefaults(
  defineProps<{
    imgStyle: string
    card: {
      image?: string
      title?: string
      content?: string
      name?: string
      job?: string
      phone?: string
      time?: string
      email?: string
      socials?: {
        instagram?: string
        youtube?: string
        telegram?: string
        facebook?: string
        linkedin?: string
      }
    }
    titlePosition: 'top' | 'bottom'
    loading: boolean
  }>(),
  {
    titlePosition: 'bottom',
  }
)
const info = computed(() => props.card?.title && props.card?.content)
</script>

<template>
  <div class="flex md:flex-row flex-col gap-2 md:gap-5 w-full">
    <BaseSkeleton :loading border-radius="16px" height="396px" width="380px">
      <CommonImage
        v-if="card.image"
        :src="card?.image"
        alt="head image"
        :class="imgStyle"
        class="object-cover mx-auto aspect-square rounded-3xl overflow-hidden"
      />
    </BaseSkeleton>
    <div
      class="py-4 md:py-8 px-4 md:px-7 bg-gray-200 rounded-3xl w-full flex flex-col justify-between"
    >
      <div >
        <BaseSkeleton
          :loading
          border-radius="12px"
          height="40px"
          preloader-class="mb-3"
          width="300px"
        >
          <h3 v-if="card?.title" class="text-xl md:text-[28px] font-bold mb-3">
            {{  card?.title }}
          </h3>
        </BaseSkeleton>
        <BaseSkeleton :loading border-radius="12px" height="24px" width="380px">
          <p v-if=" card?.content" class="line-clamp-8">{{card?.content}}</p>
          <p v-if=" card?.job" class="line-clamp-8">{{card?.job}}</p>
        </BaseSkeleton>
      </div>
      <div class="space-y-3 md:space-y-5">
        <CommonSocials
          :socials="{
            instagram: card?.socials?.instagram,
            youtube: card?.socials?.youtube,
            telegram: card?.socials?.telegram,
            facebook: card?.socials?.facebook,
            linkedin: card?.socials?.linkedin,
          }"
          bg-class="bg-white"
        />

        <div class="flex flex-wrap gap-3 gap-y-1.5 md:gap-4">
          <BaseSkeleton
            :loading
            border-radius="12px"
            height="24px"
            width="120px"
          >
            <a
              v-if="card?.phone"
              :href="`tel:${card?.phone}`"
              class="flex items-center gap-1 group"
            >
              <span class="text-red icon-phone text-xl" />
              <p
                class="text-sm font-semibold duration-200 group-hover:text-red"
              >
                {{ formatPhoneNumber(card.phone) }}
              </p>
            </a>
          </BaseSkeleton>

          <BaseSkeleton
            :loading
            border-radius="12px"
            height="24px"
            width="120px"
          >
            <a
              v-if="card?.email"
              :href="`mailto:${card?.email}`"
              class="flex items-center gap-1 group"
            >
              <i class="text-red text-xl icon-mail" />
              <p
                class="text-sm font-semibold duration-200 group-hover:text-red"
              >
                {{ card?.email }}
              </p>
            </a>
          </BaseSkeleton>

          <div v-if="card?.time" class="flex items-center gap-1 group">
            <i class="icon-clock text-red text-xl" />
            <div
              class="text-sm font-semibold duration-200 group-hover:text-red"
              v-html="card?.time"
            />
          </div>
        </div>
      </div>

      <div v-if="titlePosition === 'bottom'" class="space-y-2">
        <BaseSkeleton :loading border-radius="12px" height="32px" width="120px">
          <h4 v-if="card.name" class="text-lg md:text-xl font-bold">
            {{ card?.name }}
          </h4>
        </BaseSkeleton>
        <BaseSkeleton :loading border-radius="12px" height="24px" width="120px">
          <p v-if="card?.job" class="text-gray font-medium text-sm">
            {{ card?.job }}
          </p>
        </BaseSkeleton>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
