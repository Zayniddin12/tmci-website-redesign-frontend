<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'

import { useLifeStore } from '~/store/life'
import type { IStory } from '~/types/home.types'

const { t } = useI18n()
const store = useLifeStore()
const stories = computed(() => store.stories as IStory[])
const hasNext = computed(() => store.hasNextStory)
const allStories = ref<IStory[]>([])
const loading = ref(true)
const buttonLoading = ref(false)
const params = {
  limit: 2,
  offset: 0,
}
const routes = [
  {
    name: t('menu.life_at_tmc'),
    path: '/',
  },
  {
    name: t('submenu.life_at_tmc.student_stories'),
    path: '/',
  },
]

function loadMore() {
  buttonLoading.value = true
  params.offset += params.limit
  store.fetchStories(params)
}

onMounted(() => {
  store.fetchStories(params).finally(() => {
    loading.value = false
  })
})

watch(
  stories,
  () => {
    allStories.value.push(...stories.value)
  },
  { deep: true }
)
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <div class="container pb-8 sm:pb-10 md:pb-16">
      <h1 class="title-style my-3 mb-3 md:mb-6">
        {{ $t('submenu.life_at_tmc.student_stories') }}
      </h1>

      <div class="flex flex-col">
        <template v-if="loading">
          <div v-for="i in 3" :key="i">
            <CardStory :loading />

            <div
              v-if="i < 3"
              class="my-4 bg-gray-300 w-full md:w-[65%] ml-auto h-[1px]"
            ></div>
          </div>
        </template>

        <template v-else-if="allStories.length">
          <div v-for="(item, i) in allStories" :key="i">
            <CardStory
              v-bind="{
                story: {
                  title: item?.title,
                  content: item?.description,
                  image: item?.cover_image?.s500x500,
                  student: {
                    grade: item?.student?.position,
                    name: item?.student?.full_name,
                    image: item?.student?.photo?.s500x500,
                  },
                },
              }"
            />

            <div
              v-if="i < allStories?.length - 1"
              class="my-4 bg-gray-300 w-full md:w-[65%] ml-auto h-[1px]"
            />
          </div>
        </template>

        <CommonNoData
          v-else
          class="w-full text-center col-span-12 mt-6 md:mt-10"
          :title="$t('stories_not_found')"
        />
      </div>

      <div
        v-if="!loading && allStories.length && hasNext"
        class="w-full text-center mt-6 sm:mt-8"
      >
        <BaseButton
          :text="$t('see_more')"
          class="min-w-[164px] max-w-max"
          :loading="buttonLoading"
          :disabled="buttonLoading"
          @click="loadMore"
        />
      </div>
    </div>

    <div class="lg:mt-[160px]">
      <CommonDownloadApp />
    </div>
  </div>
</template>

<style scoped></style>
