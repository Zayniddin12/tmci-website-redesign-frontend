<script setup lang="ts">
import { required, maxLength } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import ResultsCard from '~/components/Card/ResultsCard.vue'
import { useCustomToast } from '~/composables/useCustomToast'
import { useForm } from '~/composables/useForm'

const { showToast } = useCustomToast()

const loading = ref(false)
const showResults = ref(false)
const results = ref({})
const showData = ref(0)
const form = useForm(
  {
    passport: '',
  },
  {
    passport: { required, maxLength: maxLength(10) },
  }
)

function submit() {
  form.$v.value.$touch()
  if (!form.$v.value.$invalid) {
    loading.value = true
    const questionFormData = new FormData()
    questionFormData.append(
      'passport',
      form.values.passport.replaceAll(' ', '')
    )

    fetch('https://lms.tmci.uz/api/admission-exam/result', {
      method: 'POST',
      body: questionFormData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == 1) {
          showResults.value = true
          results.value = data.data
          form.$v.value.$reset()
          if (data.data.status == 0) {
            showData.value = 0
          } else {
            showData.value = 1
          }
        } else {
          showToast(t('passport_series_notfound'), 'error')
        }
      })
      .catch((error) => {
        console.log('err', error)
      })
      .finally(() => {
        loading.value = false
      })
  }
}

const { t } = useI18n()

const routes = computed(() => {
  return [
    {
      name: t('menu.admissions'),
      path: '/admission',
    },

    {
      name: t('submenu.admissions.exam_results'),
      path: '/admission',
    },
  ]
})
</script>

<template>
  <div>
    <base-breadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <div>
      <admission-wrapper-main
        :title="$t('submenu.admissions.exam_results')"
        class="mb-[211px]"
      >
        <template #content>
          <p class="text-[19px] leading-140">
            {{ $t('submenu.admissions.exam_results_desc') }}
          </p>
          <div
            class="w-full bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl space-y-4 md:space-y-6 mt-7"
          >
            <form @submit.prevent>
              <label class="text-dark font-semibold mb-1">
                {{ $t('submenu.admissions.passport_series_number') }}
              </label>
              <ClientOnly>
                <FormInput
                  v-model="form.values.passport"
                  v-maska="'AA #######'"
                  :error="form.$v.value.passport.$error"
                  required
                  :placeholder="$t('submenu.admissions.passport_series_number')"
                  class="w-full mt-1"
                />
              </ClientOnly>
              <div class="flex justify-end space-x-3 mt-6 items-end">
                <BaseButton
                  v-bind="{ loading }"
                  type="submit"
                  class="md:min-w-[174px] h-10"
                  variant="error"
                  @click="submit"
                >
                  {{ $t('submenu.admissions.show_results') }}
                </BaseButton>
              </div>
            </form>
          </div>
          <Transition name="slide-up">
            <div v-if="showResults" class="mt-8">
              <hr />
              <div
                class="w-full mt-8 bg-white p-4 md:p-6 rounded-2xl md:rounded-3xl space-y-4 md:space-y-6 grid grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <div class="!mt-0">
                  <p class="text-sm text-gray">{{ $t('form.first_name') }}</p>
                  <h3 class="text-dark font-semibold text-base">
                    {{ results.last_name }}
                  </h3>
                </div>
                <div class="!mt-0">
                  <p class="text-sm text-gray">{{ $t('form.last_name') }}</p>
                  <h3 class="text-dark font-semibold text-base">
                    {{ results.first_name }}
                  </h3>
                </div>
                <div class="!mt-0">
                  <p class="text-sm text-gray">
                    {{ $t('apply_form.personal_information.father_name') }}
                  </p>
                  <h3 class="text-dark font-semibold text-base">
                    {{ results.middle_name }}
                  </h3>
                </div>
                <div class="!mt-0">
                  <p class="text-sm text-gray">{{ $t('passport') }}</p>
                  <h3 class="text-dark font-semibold text-base">
                    {{ results.passport }}
                  </h3>
                </div>
              </div>
              <div
                class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 pt-6 gap-[18px]"
              >
                <ResultsCard
                  :title="results.labels?.block_1"
                  img="/images/book.svg"
                  :description="results.block_1"
                />
                <ResultsCard
                  :title="results.labels?.block_2"
                  img="/images/pen.svg"
                  :description="results.block_2"
                />
                <ResultsCard
                  :title="results.labels?.block_3"
                  img="/images/speaker.svg"
                  :description="results.block_3"
                />
                <ResultsCard
                  :title="$t('total')"
                  img="/images/logo1.svg"
                  :description="results.total"
                />
              </div>
              <AdmissionCardSuccessStatus
                v-if="showData"
                title="you_have_succesfully_passed_the_exam"
                description="you_have_succesfully_passed_the_exam_description"
                class="mt-10"
              >
                <template #actions>
                  <base-button
                    class="min-w-40 px-5"
                    size="large"
                    variant="error"
                    @click="downloadFile(results.certificate)"
                  >
                    {{ $t('download_certificate') }}
                  </base-button>
                </template>
              </AdmissionCardSuccessStatus>
              <AdmissionCardFailedStatus
                v-else
                title="your_have_failed_the_exam"
                description="you_have_failed_the_exam_description"
                class="mt-10"
              >
                <template #actions>
                  <base-button
                    class="min-w-40 px-5"
                    size="large"
                    variant="primary"
                    @click="downloadFile(results.certificate)"
                  >
                    {{ $t('download_certificate') }}
                  </base-button>
                </template>
              </AdmissionCardFailedStatus>
            </div>
          </Transition>
        </template>
      </admission-wrapper-main>
    </div>
  </div>
</template>

<style scoped>
.hello {
  display: none;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
