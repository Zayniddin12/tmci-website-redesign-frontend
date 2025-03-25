<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useAboutStore } from '~/store/about'
import { useCommonStore } from '~/store/common'
import type { IVacancyList } from '~/types/about/index.types'
import type { IVacancyDetail } from '~/types/home.types'

const { handleError } = useHandleError()
const store = useCommonStore()
const show = ref(false)
const router = useRouter()
const loading = ref(true)
const buttonLoading = ref(false)
const detailLoading = ref(true)
const vacancy = computed(() => aboutStore?.vacancyList?.results)
const allVacancies = ref<IVacancyList[]>([])
const { t } = useI18n()
const showSelect = ref(false)
const hasNext = computed(() => aboutStore?.vacancyList?.next)
const department = computed(() => aboutStore?.department)
const experience_years = ref<number[]>([])
const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('submenu.about.careers'),
    path: '/about-us',
  },
]
const filter = reactive({
  department__slug: '',
  experience_years: '',
  limit: 10,
  offset: 0,
})

const getVacancy = async (limit: number, offset: number) => {
  loading.value = true
  try {
    const data = await aboutStore.fetchVacancy({ limit, offset })
    allVacancies.value.push(...data?.results)
    loading.value = false
    buttonLoading.value = false
  } catch (error) {
    handleError(error)
  }
}

function loadMore() {
  buttonLoading.value = true
  getVacancy(8, allVacancies.value.length)
}

function getYear() {
  useApi()
    .$get('vacancy/experience-years/')
    .then((res: { years: number[] }) => {
      experience_years.value = res?.years.filter((el: number) => +el > 0)
    })
}

onMounted(() => {
  loading.value = true
  getVacancy(8, 0)
  aboutStore.fetchDepartment(15)
  getYear()
})

const data = ref({} as IVacancyDetail)

const openModal = (item: IVacancyList) => {
  detailLoading.value = true
  show.value = true
  store
    .fetchVacancyDetail(item.slug)
    .then((res) => {
      data.value = res

      detailLoading.value = false
    })
    .finally(() => {
      detailLoading.value = false
    })
}

const aboutStore = useAboutStore()

function getValue(year: number | string) {
  filter.experience_years = String(year)
  showSelect.value = !showSelect.value
}

function submit(item?: IVacancyList) {
  show.value = false
  router.push(
    `/about-us/careers/send/?vacancy=${data.value?.slug ?? item?.slug}`
  )
}

watch(
  () => filter,
  () => {
    if (filter.experience_years === 'All') {
      filter.experience_years = ''
    }
    if (filter.department__slug === 'all') {
      filter.department__slug = ''
    }
    aboutStore.fetchVacancy(filter).then(() => {
      allVacancies.value = vacancy.value
    })
  },
  {
    deep: true,
  }
)
</script>

<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <div class="container pb-8 sm:pb-10 md:pb-16">
      <h1 class="title-style mt-3 mb-3 md:mb-6">
        {{ $t('submenu.about.careers') }}
      </h1>
      <CommonBannerJoinUs />

      <div
        class="mt-5 md:mt-8 mb-4 md:mb-5 flex items-center max-sm:flex-col gap-3 sm:gap-5"
      >
        <FormSelect
          v-model="filter.department__slug"
          class="max-sm:w-full"
          selected-option-styles="!bg-white border-gray-200"
          :placeholder="$t('department')"
          :options="[{ title: $t('all'), slug: 'all' }, ...department]"
          label-key="title"
          value-key="slug"
        />

        <FormSelect
          v-model="filter.experience_years"
          class="max-sm:w-full"
          selected-option-styles="!bg-white border-gray-200"
          :placeholder="$t('experience')"
          :options="[$t('all'), ...experience_years]"
          :show-select
          hideScroll
          @on-toggle="showSelect = $event"
        >
          <template #selectedOption>
            <div class="text-sm font-medium leading-130 truncate mr-7">
              {{ $t('experience') }}
            </div>
            <div class="text-sm font-medium leading-130 mr-7">
              {{ filter.experience_years }}
            </div>
            <div class="flex items-center gap-2">
              <span
                v-if="!filter.experience_years"
                class="text-sm text-gray font-medium"
                >{{ $t('all') }}</span
              >

              <span
                class="icon-chevron-down transition-300 inline-block text-xl leading-5 text-gray"
                :class="{ '!-rotate-180': showSelect }"
              />
            </div>
          </template>

          <template #options>
            <Transition name="select">
              <div v-if="showSelect">
                <div
                  v-for="(year, idx) in [$t('all'), ...experience_years]"
                  :key="idx"
                  :class="{ 'bg-red/10': +filter.experience_years === year }"
                  class="hover:bg-gray-200/80 transition-300 pl-4 flex-center-between cursor-pointer"
                  @click="getValue(year)"
                >
                  <h4
                    :class="{
                      'font-medium text-red': +filter.experience_years === year,
                    }"
                    class="border-b border-gray-5 last:border-0 pl-0 p-3 text-dark text-2xs leading-130"
                  >
                    {{ year }} {{year !== $t('all') ? $t('years') : ''}}
                  </h4>
                  <i
                    v-if="+filter.experience_years === year"
                    class="icon-check text-xl text-red mr-3"
                  />
                </div>
              </div>
            </Transition>
          </template>
        </FormSelect>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-5">
        <template v-if="loading || allVacancies?.length">
          <CardCareer
            v-for="(item, i) in loading ? 6 : allVacancies"
            :key="i"
            :career="{
              job: item?.title,
              subtitle: item?.department?.title,
              content: item?.responsibilities,
              duration: item?.experience,
              slug: item?.slug,
            }"
            :loading
            @more="openModal(item)"
            @submit="submit($event)"
          />
        </template>
        <CommonNoData
          v-else
          class="w-full text-center col-span-12 mt-6 md:mt-10"
          :title="$t('careers_not_found')"
        />
      </div>

      <div
        v-if="hasNext && !loading && allVacancies?.length"
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

    <CommonModal
      v-bind="{ show, title: data?.title, loading: detailLoading }"
      @close="show = false"
    >
      <CommonCareerModal
        :career="data"
        :loading="detailLoading"
        @submit="submit"
      />
    </CommonModal>
  </div>
</template>

<style scoped></style>
