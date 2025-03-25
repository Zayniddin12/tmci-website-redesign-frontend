<template>
  <main>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />

    <Transition mode="out-in" name="fade">
      <ContactsInitialStep v-if="step == 0" @next="step++" />

      <section v-else class="container grid gap-6">
        <h1 class="text-2xl md:text-4.5xl font-bold text-dark">
          {{ $t('feedback.send') }}
        </h1>
        <form class="grid gap-5" @submit.prevent>
          <ContactsFormPersonal v-model="form" :options="campusList" />

          <ContactsFormFeedback
            v-model="form"
            v-bind="{ feedbackTypes, questionTypes, loading }"
            @click="submitFeedback"
          />
        </form>
      </section>
    </Transition>
    <section class="mt-10 lg:mt-[190px] bg-gray-100">
      <CommonDownloadApp />
    </section>
  </main>
</template>

<script lang="ts" setup>
import { email, maxLength, minLength, required } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

import { useCustomToast } from '~/composables/useCustomToast'
import { useCommonStore } from '~/store/common'
import type { IFeedbackForm } from '~/types'

const { t } = useI18n()
const store = useCommonStore()
const { showToast } = useCustomToast()
const form = useForm<IFeedbackForm>(
  {
    name: '',
    campus: null,
    college_program: '',
    email: '',
    phone_number: '',
    details: '',
    feedback_type: null,
    question_type: null,
  },
  {
    name: { required, minLength: minLength(5) },
    campus: { required },
    email: { required, minLength: minLength(4), email },
    phone_number: {
      required,
      minLength: minLength(17),
      maxLength: maxLength(17),
    },
    details: { required },
  }
)

const step = ref(0)

const loading = computed(() => store.sendFeedbackLoading)
const campusList = computed(() => store.campusList)
const feedbackTypes = computed(() => store.feedbackTypes)
const questionTypes = computed(() => store.questionTypes)

onMounted(() => {
  store.fetchCampusList()
  store.fetchFeedbackTypes()
  store.fetchQuestionTypes()
})

function submitFeedback() {
  form.$v.value.$touch()

  if (!form.$v.value.$invalid) {
    store
      .sendFeedback({
        ...form.values,
        phone_number: form.values.phone_number.replace(/\s/, ''),
      })
      .then(() => {
        step.value = 0
      })
  } else {
    showToast(t('feedback_form_not_valid', 'error'))
  }
}

const routes = [
  {
    name: t('about_us'),
    path: '/about-us',
  },
  {
    name: t('menu.contacts'),
    path: '/contacts',
  },
  {
    name: t('menu.feedback'),
    path: '/contacts/send-feedback',
  },
]
</script>
