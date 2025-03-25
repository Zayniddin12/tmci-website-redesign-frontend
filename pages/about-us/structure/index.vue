<template>
  <main>
    <div class="container">
      <h1 class="title-style mt-3 mb-3 md:mb-6">
        {{ $t('structures.title') }}
      </h1>

      <!-- TABS -->
      <BaseTab
        v-model="activeTab"
        :list="tabs"
        active-class="!h-1 !rounded-none"
        clickable
        item-class="hover:text-red duration-200 md:text-xl"
        parent-class="!border-b-4 w-fit"
      />

      <section :class="{ 'mt-4': loading }">
        <BaseSkeleton :loading border-radius="20px" height="350px" width="100%">
          <CommonStructure
            v-if="activeTab !== 'examination_boards'"
            :key="activeTab"
            :nodes
          />
          <div v-else class="flex flex-col pt-4 gap-5 items-center">
            <CommonCardSuccessStory
              v-for="(story, idx) in nodes[0]?.staff_members"
              :key="idx"
              :reversed="idx % 2 > 0"
              v-bind="transformMembersData(story)"
            />
          </div>
        </BaseSkeleton>
      </section>
    </div>
    <div class="mt-40">
      <LazyCommonDownloadApp class="bg-white !pt-0" />
    </div>
  </main>
</template>

<script lang="ts" setup>
import type { ISupervisoryBoardMember } from '~/types/about/index.types'
import type { IStructureNode, ISuccessStory } from '~/types/common'
import type { IMenu } from '~/types/home.types'

const activeTab = ref()
const nodes = ref<IStructureNode[]>([])
const loading = ref(true)

function getTabData(slug: string) {
  loading.value = true
  useApi()
    .$get<{ result: IStructureNode[] }>(`/structures/${slug}/`)
    .then((res) => {
      nodes.value = res.result
    })
    .finally(() => {
      loading.value = false
    })
}

function transformMembersData(member: ISupervisoryBoardMember): ISuccessStory {
  return {
    student_avatar: member?.avatar,
    student_name: member?.full_name,
    program_title: member?.position,
    content: member?.biography,
  }
}

watchEffect(() => {
  if (activeTab.value) {
    getTabData(activeTab.value)
  }
})
onMounted(() => {
  activeTab.value = 'departments'
})

const tabs: Partial<IMenu>[] = [
  {
    title: 'General',
    slug: 'departments',
  },
  {
    title: 'Faculties',
    slug: 'faculties',
  },
  {
    title: 'Supervisory board',
    slug: 'examination_boards',
  },
]
</script>
