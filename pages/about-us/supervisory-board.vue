<template>
  <main class="w-full">
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <section class="container !pt-4 py-8 md:py-16">
      <h1 class="title-style mt-3 mb-3 md:mb-6">
        {{ info?.title || $t('supervisory_board') }}
      </h1>
      <CardProgramHead
        :card="{
          title: info?.card_title,
          content: info?.card_description,
          image: info?.head_of_board?.photo?.s500x500,
          name: info?.head_of_board?.full_name,
          job: info?.head_of_board?.position,
        }"
        :loading
      />

      <article class="py-6">
        <p class="font-georgia text-base md:text-lg leading-[160%]">
          {{ richTextPurify(info?.description, 100_000) }}
        </p>
      </article>

      <Transition mode="out-in" name="fade">
        <div v-if="loading" class="flex flex-col gap-5">
          <CommonLoadingCardSuccessStory
            v-for="idx in 2"
            :key="idx"
            :reversed="idx % 2 > 0"
          />
        </div>
        <div v-else class="flex flex-col gap-5 items-center">
          <CommonCardSuccessStory
            v-for="(story, idx) in info?.members"
            :key="idx"
            :reversed="idx % 2 > 0"
            v-bind="transformMembersData(story)"
          />
        </div>
      </Transition>
    </section>
    <LazyCommonMainSectionFaq />
  </main>
</template>
<script lang="ts" setup>
import type {
  IOfficeOfSupervisoryBoard,
  ISupervisoryBoardMember,
} from '~/types/about/index.types'
import type { ISuccessStory } from '~/types/common'

const { t } = useI18n()

const info = ref<IOfficeOfSupervisoryBoard>()
const loading = ref(true)

onMounted(() => {
  loading.value = true
  useApi()
    .$get<IOfficeOfSupervisoryBoard>('student-life/supervisory-board/')
    .then((res) => {
      info.value = res
    })
    .catch((error) => console.log(error))
    .finally(() => (loading.value = false))
})

function transformMembersData(member: ISupervisoryBoardMember): ISuccessStory {
  return {
    student_avatar: member?.avatar,
    student_name: member?.full_name,
    program_title: member?.position,
    content: member?.biography,
  }
}

const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },

  {
    name: t('supervisory_board'),
    path: '/supervisory-board',
  },
]
</script>
