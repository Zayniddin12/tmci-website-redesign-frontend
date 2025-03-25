<template>
  <div class="pt-4">
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <main class="grid grid-cols-12 gap-3 md:gap-5 container">
      <section class="col-span-12 lg:col-span-9 md:mb-48">
        <h1 class="font-extrabold text-5xl mt-3">
          {{ studentOrientation?.title }}
        </h1>

        <div class="flex flex-row space-y-5">
          <Transition mode="out-in" name="fade">
            <CommonLoadingOrientation v-if="loading" class="w-full" />
            <div v-else class="flex-col flex mt-6">
              <p
                class="mt-2 text-lg leading-7 font-georgia !font-normal [&>p]:font-normal"
                v-html="studentOrientation?.content"
              />

              <div
                class="mt-6 relative h-[290px] md:h-[500px] overflow-hidden bg-[url('/images/studentLife.png')] w-full rounded-2xl bg-cover bg-center"
              >
                <div
                  class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#313132]/90"
                ></div>

                <span
                  class="absolute backdrop-filter backdrop-blur cursor-pointer top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-full border-2 border-white/20"
                  @click="show = true"
                >
                  <svg
                    fill="none"
                    height="75"
                    viewBox="0 0 74 75"
                    width="74"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M21.582 12.4583V61.7916L61.6654 37.125L21.582 12.4583Z"
                      fill="white"
                      fill-rule="evenodd"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </Transition>
        </div>
      </section>

      <aside
        class="col-span-12 lg:col-span-3 w-full space-y-3 md:space-y-5 mb-10 md:mb-0"
      >
        <BaseSkeleton :loading border-radius="16px" height="420px" width="100%">
          <common-banner-apply
            class="w-full"
            mini
            v-bind="{
              title: single?.card_title,
              description: single?.card_description,
            }"
          />
        </BaseSkeleton>
        <card-anti-corruption
          v-if="
            single?.anti_corruption_department &&
            Object.keys(single?.anti_corruption_department).length
          "
          :card="{
            title: single?.anti_corruption_department?.title,
            subtitle: single?.anti_corruption_department?.description,
            time: single?.anti_corruption_department?.application_time,
            phone: single?.anti_corruption_department?.phone,
            email: single?.anti_corruption_department?.email,
          }"
          :loading
        />
      </aside>

      <StudentLifeModal
        v-if="!loading && studentOrientation.video"
        v-bind="{
          show,
          videoUrl: studentOrientation.video,
        }"
        @close="show = false"
      />
    </main>

    <LazyCommonDownloadApp class="bg-white !pt-0" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import StudentLifeModal from '~/components/StudentOrdination/StudentLifeModal.vue'
import { useApi } from '~/composables/useApi'
import { useAdmissionStore } from '~/store/admission'
import type { IAdmissionInfo } from '~/types/admission/index.types'
import type { StudentOrientation } from '~/types/common'

const { t } = useI18n()
const store = useAdmissionStore()
const { handleError } = useHandleError()

const loading = ref(true)
const single = ref<IAdmissionInfo>()

const show = ref(false)
const studentOrientation = ref<StudentOrientation>('')

const fetchOrientation = () => {
  useApi()
    .$get<IAdmissionInfo>(`/student-life/student-orientation/`)
    .then((data) => {
      studentOrientation.value = data
    })
    .catch((error) => {
      handleError(error)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  store.fetchAdmission().then((res) => {
    single.value = res
    loading.value = false
  })

  fetchOrientation()
})

const routes = [
  {
    name: t('student_life.nav.student_life'),
    path: '',
  },
  {
    name: t('student_life.nav.student_orientation'),
    path: '/student-life/orientation',
  },
]
</script>
