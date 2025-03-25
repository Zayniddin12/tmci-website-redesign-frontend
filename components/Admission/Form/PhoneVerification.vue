<script lang="ts" setup>
import CollapseTransition from '@ivanv/vue-collapse-transition/src/CollapseTransition.vue'
import { unref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TForm } from '@/composables/useForm'
import type { IPhoneVerification } from '~/types/admission/index.types'

const props = defineProps<{
  form?: TForm<IPhoneVerification>
}>()

const { form } = unref(props)
const { t } = useI18n()

// const statusList = computed(() => {
//   return [
//     { id: 1, name: t('resident'), value: 'resident' },
//     { id: 2, name: t('no_resident'), value: 'non_resident' },
//   ]
// })

const statusRegistration = [
  {
    name: t('verification_with_phone_number'),
    value: true,
  },
  {
    name: t('verification_without_phone_number'),
    value: false,
  },
]
</script>

<template>
  <form v-if="form" class="flex flex-col gap-4" @submit.prevent>
<!--    <FormGroup-->
<!--      :label="$t('select_the_type_of_registration')"-->
<!--      label-class="mb-1"-->
<!--    >-->
<!--      <FormSelect-->
<!--        v-model="form.values.with_otp"-->
<!--        :error="form.$v.value.with_otp.$error"-->
<!--        :options="statusRegistration"-->
<!--        :placeholder="$t('select_registration')"-->
<!--        value-key="value"-->
<!--      />-->
<!--    </FormGroup>-->
    <CollapseTransition>
      <FormGroup
        v-if="form.values.with_otp"
        :label="$t('apply_form.phone_verification.phone_number')"
        label-class="mb-1"
      >
        <FormPhoneNumber
          v-model="form.values.phoneNumber"
          :error="form.$v.value.phoneNumber.$error"
          class="bg-[#F6F7F8] border-none rounded-lg py-px"
        />
      </FormGroup>
    </CollapseTransition>

    <!--    <FormGroup-->
    <!--      :label="$t('apply_form.phone_verification.status')"-->
    <!--      label-class="mb-1"-->
    <!--    >-->
    <!--      <FormSelect-->
    <!--        v-model="form.values.status"-->
    <!--        :error="form.$v.value.status.$error"-->
    <!--        :options="statusList"-->
    <!--        :placeholder="$t('apply_form.phone_verification.select_status')"-->
    <!--        value-key="value"-->
    <!--      />-->
    <!--    </FormGroup>-->
  </form>
</template>
