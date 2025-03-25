<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps<{
  show: boolean
  seconds: number
}>()
const emits = defineEmits<{
  (event: 'submit', value: string): void
  (event: 'close'): void
  (event: 'resend'): void
}>()

const timeOut = ref(false)
const currentSeconds = ref(props.seconds)

const { t } = useI18n()

const otp = ref('')

function sendAgain() {
  if (timeOut.value) {
    timeOut.value = false
    emits('resend')
  }
}
</script>

<template>
  <CommonModal
    :show="show"
    :title="t('verification')"
    body-class="!max-w-[382px]"
    disable-outer-close
    @close="emits('close')"
  >
    <template #default>
      <div class="p-5">
        <p class="mb-4 text-dark text-base font-medium leading-6">
          {{ $t('verify_otp_desc') }}
        </p>
        <FormOtpInput v-model="otp" :length="6" />

        <div class="mt-3 flex items-center gap-2">
          <span
            v-if="timeOut"
            class="cursor-pointer text-sm font-normal leading-130 text-gray transition-300 hover:text-red hover:text-underline"
            @click="sendAgain"
            >{{ $t('send_again_sms_code') }}</span
          >
          <span v-else class="text-sm font-normal leading-130 text-gray"
            >{{ $t('rest_time') }}:
          </span>
          <FormOtpTimer
            v-if="!timeOut"
            :second="currentSeconds"
            @timeout="timeOut = true"
          />
        </div>

        <BaseButton
          :class="{ 'cursor-not-allowed': otp.length < 6 }"
          :disabled="otp.length < 6"
          :text="$t('verify')"
          class="mt-5 w-full h-10"
          variant="error"
          @click.prevent="emits('submit', otp)"
        />
      </div>
    </template>
  </CommonModal>
</template>
