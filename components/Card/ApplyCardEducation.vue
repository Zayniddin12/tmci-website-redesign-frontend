<script lang="ts" setup>
import dayjs from 'dayjs'
import { unref } from 'vue'
import { useI18n } from 'vue-i18n'

import type { TForm } from '~/composables/useForm'
import type { EntranceExam, IExamForm } from '~/types/admission/index.types'

interface Props {
  exam: EntranceExam
  form: TForm<IExamForm>
}

const props = defineProps<Props>()
const { form } = unref(props)
const { t } = useI18n()

const locale = useCookie('locale').value ?? 'en'

dayjs.locale(locale === 'uz' ? 'uz-latn' : locale)

const getStartDate = dayjs(props.exam.date).format('MMMM DD, YYYY')
const getEndDate = dayjs(props.exam.registration_deadline).format(
  'MMMM DD, YYYY HH:mm'
)
const price = formatNumberSpace(props.exam.fee)

// update form values exam_date when user click on the card
const update = () => {
  form.values.exam_date = props.exam.id
}
</script>

<template>
  <section
    :class="{ '!border-red': form?.$v.value.exam_date.$error }"
    class="bg-gray-100 border border-gray-200 rounded-2xl cursor-pointer"
    @click="update"
  >
    <div class="p-4 space-x-3 flex">
      <div class="flex-shrink-0">
        <FormRadio
          v-model="form.values.exam_date"
          :value="props.exam.id"
          name="activeEntranceExam"
        />
      </div>
      <div>
        <i18n-t
          class="mb-1 text-dark text-base leading-[20px] font-bold"
          keypath="entrance_exam_registration"
          scope="global"
          tag="h1"
        >
          <template #time>
            {{ getStartDate }}
          </template>
          <!--          <template #price>-->
          <!--            {{ price }}-->
          <!--          </template>-->
        </i18n-t>
        <i18n-t
          class="text-sm font-normal leading-normal text-[#757D83]"
          keypath="entrance_exam_registration_time"
          scope="global"
          tag="p"
        >
          <template #time>
            {{ getEndDate }}
          </template>
        </i18n-t>

        <div
          v-if="false"
          class="px-2 py-1 bg-[#9718370f] rounded-lg text-sm text-red"
        >
          {{
            t(
              'apply_form.english_proficiency.entrance_exam_registration_time',
              { time: getEndDate }
            )
          }}
        </div>
      </div>
    </div>
    <div
      class="px-3 py-2.5 bg-white rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[12px] rounded-br-[12px] mb-1 mx-1"
    >
      <p class="text-sm leading-normal font-semibold font-vela text-dark mb-2">
        {{ $t('apply_form.english_proficiency.entrance_exam_title') }}
      </p>
      <ul
        class="list-decimal pl-4 text-gray text-sm font-normal leading-[21px]"
      >
        <li>
          {{ $t('apply_form.english_proficiency.entrance_exam_condition_one') }}
        </li>
        <!--        <li class="mb-2">-->
        <!--          {{ $t('apply_form.english_proficiency.entrance_exam_condition_two') }}-->
        <!--        </li>-->
      </ul>
    </div>
  </section>
</template>

<style scoped></style>
