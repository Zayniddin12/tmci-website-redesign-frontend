<template>
  <div class="pt-6">
    <BaseBreadcrumb
      body-class="!bg-transparent relative z-20"
      v-bind="{ routes }"
    />

    <BaseSkeleton
      :line="8"
      :loading
      border-radius="40px"
      height="600px"
      preloader-class="container"
      width="100%"
    >
      <main v-if="!loading" class="container grid grid-cols-10 gap-5">
        <CommonStepsAdmission :list="steps" class="col-span-10 lg:col-span-2" />

        <section
          class="col-span-10 lg:col-span-8 flex flex-col gap-8 lg:gap-16"
        >
          <div
            v-for="step in info?.process_steps"
            :key="step?.title"
            class="grid gap-4 lg:gap-5"
          >
            <h3 class="text-2.5xl font-medium">{{ step?.title }}</h3>

            <article class="article custom" v-html="step?.description" />

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <CommonCardFile
                v-for="(file, key) in step?.step_files"
                :key
                v-bind="file"
              />
            </div>
          </div>
        </section>
      </main>
    </BaseSkeleton>
    <footer class="mt-10 lg:mt-[160px]">
      <CommonDownloadApp />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import type { IAdmissionProcess } from '~/types/common'

const { t } = useI18n()

const info = ref<IAdmissionProcess>()
const loading = ref(true)

const steps = computed(() =>
  info.value?.process_steps.map((s, id) => ({ label: s.title, id }))
)

onMounted(() => {
  fetchProcessDetails()
})

function fetchProcessDetails() {
  loading.value = true
  useApi()
    .$get<IAdmissionProcess>('/admission/process/')
    .then((response) => {
      console.log(response)
      info.value = response
    })
    .finally(() => (loading.value = false))
}

const routes = [
  {
    name: t('menu.admissions'),
    path: '/admission',
  },

  {
    name: t('submenu.admissions.admission_this_year', {
      year: new Date().getFullYear(),
    }),
    path: '/admission',
  },
]
</script>
<style>
article.custom strong {
  display: block;
  margin-bottom: 16px !important;
}
.custom p, .custom span {
  font-size: 18px;
}
</style>