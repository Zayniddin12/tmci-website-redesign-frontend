<template>
  <div class="relative">
    <section
      v-if="club"
      :style="{
        backgroundImage: `url(${club.main_image.original})`,
      }"
      class="min-h-[724px] object-cover relative bg-center bg-no-repeat bg-cover"
    >
      <div
        class="w-full md:w-[39%] h-full grid justify-items-center backdrop-blur-xl absolute top-0 left-0"
      >
        <div class="pr-2.5 text-white relative z-10">
          <BaseBreadcrumb
            bread-crump-class="!pl-0"
            body-class="!bg-transparent text-white !pl-0"
            link-class="text-white"
            v-bind="{ routes }"
          />

          <div
            class="w-full md:max-w-[426px] pt-10 md:pt-0 h-full flex flex-col items-center md:items-start"
          >
            <h1 class="text-[40px] font-extrabold">{{ club?.title }}</h1>
            <p class="text-2xl mt-3 font-extrabold text-center md:text-left">
              {{ club?.subtitle }}
            </p>

            <img
              class="w-[331px] h-[420px] mt-7 object-cover"
              src="/images/flag.png"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="lg:py-16 lg:px-32 py-10 bg-white">
      <div class="container">
        <div class="flex flex-col lg:flex-row justify-between gap-12">
          <div class="w-full lg:w-1/2">
            <h2 class="font-bold text-3xl mb-5">{{ club?.title }}</h2>
            <p class="text-xl font-normal" v-html="club?.about" />
          </div>
          <div
            v-if="club"
            class="w-full lg:w-1/2 flex items-center justify-center min-h-[536px] overflow-hidden"
          >
            <div class="flex flex-col space-y-4 items-center justify-center">
              <div class="flex flex-row items-end justify-center gap-4">
                <img
                  :src="club?.images[0].original"
                  class="size-[160px] object-cover"
                />
                <img
                  :src="club?.images[1].original"
                  class="w-[160px] h-[240px] object-cover"
                />
              </div>
              <div class="flex flex-row items-start justify-center gap-4">
                <img
                  :src="club?.images[2].original"
                  class="w-[192px] h-[128px] object-cover"
                />
                <img
                  :src="club?.images[3].original"
                  class="w-[160px] h-[240px] object-cover"
                />
                <img
                  :src="club?.images[4].original"
                  class="w-[192px] h-[128px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="lg:py-16 lg:pb-20 lg:px-32 py-10">
      <div
        class="flex flex-col gap-y-4 md:gap-y-0 md:flex-row items-center justify-center container"
      >
        <div
          class="px-6 py-9 bg-white rounded-[20px] w-full grid border border-gray-300"
        >
          <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
            <div class="col-span-1">
              <FormGroup :label="$t('form.first_name')">
                <FormInput
                  v-model="form.values.firstName"
                  :placeholder="$t('form.enter_first_name')"
                />
              </FormGroup>
            </div>
            <div class="col-span-1">
              <FormGroup :label="$t('form.last_name')">
                <FormInput
                  v-model="form.values.lastName"
                  :placeholder="$t('form.enter_last_name')"
                />
              </FormGroup>
            </div>
            <div class="col-span-1">
              <FormGroup :label="$t('form.student_id')">
                <FormInput
                  v-model="form.values.studentId"
                  :placeholder="$t('form.enter_student_id')"
                />
              </FormGroup>
            </div>
            <div class="col-span-1">
              <FormGroup :label="$t('form.group_n')">
                <FormInput
                  v-model="form.values.groupN"
                  :placeholder="$t('form.enter_group_n')"
                />
              </FormGroup>
            </div>
            <div class="col-span-1 xl:col-span-2">
              <FormGroup :label="$t('form.phone_number')">
                <FormPhoneNumber
                  v-model="form.values.phoneNumber"
                  :placeholder="$t('feedback.form.phone.placeholder')"
                />
              </FormGroup>
            </div>
          </div>
          <BaseButton
            variant="error"
            :text="$t('send')"
            icon="icon-send-converted"
            class="mt-6 justify-self-end"
            :loading="submitLoading"
            :disabled="form.$v.value.$invalid"
            @click="submitClub()"
          />
        </div>
        <div
          class="bg-white py-7 px-9 rounded-[20px] border border-gray-300 md:border-transparent md:rounded-r-[20px] md:rounded-l-none !h-fit w-full"
        >
          <div>
            <i18n-t
              keypath="join_club"
              class="text-dark !text-3.5xl !font-extrabold"
              tag="p"
            >
              <template #club>
                <span class="text-red">{{ $t('club') }}</span>
              </template>
            </i18n-t>
            <p class="text-dark text-base font-medium mt-3 max-w-[400px]">
              {{ $t('join_club_subtitle') }}
            </p>
            <div
              class="mt-5 flex flex-col xl:flex-row gap-x-5 gap-y-4 xl:gap-y-0"
            >
              <div
                class="border border-gray-300 max-w-[200px] rounded-lg p-3 flex items-center gap-4"
              >
                <i class="icon-phone text-gray" />
                <p class="text-gray text-base leading-snug font-medium">
                  {{ formatPhoneNumber(socials?.phone_number) }}
                </p>
              </div>
              <div
                class="border border-gray-300 max-w-[200px] rounded-lg p-3 flex items-center gap-4"
              >
                <i class="icon-mail text-gray" />
                <p class="text-gray text-base leading-snug font-medium">
                  {{ socials?.email }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <LazyCommonDownloadApp class="bg-white" />
    <ClubsJoinClubSuccessModal
      :title="club?.title"
      :show="showModal"
      @close="showModal = false"
    />
  </div>
</template>

<script lang="ts" setup>
import { minLength, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useForm } from '~/composables/useForm'
import { useHomeStore } from '~/store/home'
import type { ISocial } from '~/types/about/index.types'
import type { TClubSlug } from '~/types/common'

const { t } = useI18n()

const route = useRoute()

const club = ref<TClubSlug | null>(null)
const loading = ref(true)
const submitLoading = ref(false)
const showModal = ref(false)

const form = useForm(
  {
    firstName: '',
    lastName: '',
    studentId: '',
    phoneNumber: '998',
    groupN: '',
  },
  {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
    studentId: {
      required,
    },
    phoneNumber: {
      required,
      minLength: minLength(17),
    },
    groupN: {
      required,
    },
  }
)

function getClub() {
  if (!route.params.slug) return

  loading.value = true
  useApi()
    .$get(`/student-life/student-clubs/${route.params.slug}/`)
    .then((res: any) => {
      club.value = res
    })
    .finally(() => {
      loading.value = false
    })
}

function submitClub() {
  console.log(form.values.firstName)
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    submitLoading.value = true
    useApi()
      .$post(`/student-life/student-clubs/join-club/`, {
        body: {
          first_name: form.values.firstName,
          surname: form.values.lastName,
          student_id: form.values.studentId,
          phone_number: form.values.phoneNumber.replaceAll(' ', ''),
          group: form.values.groupN,
          club_slug: route.params.slug,
        },
      })
      .then(() => {
        showModal.value = true
      })
      .catch((err) => {
        useHandleError().handleError(err)
      })
      .finally(() => {
        submitLoading.value = false
      })
  }
}

const store = useHomeStore()
const socials = computed(() => store.socials as ISocial)

onMounted(() => {
  getClub()
})

const routes = [
  {
    name: t('student_life.nav.student_clubs'),
    path: '/student-life/clubs',
  },
]
</script>

<style scoped>
.backdrop-blur-xl {
  backdrop-filter: blur(24px);
}
</style>
