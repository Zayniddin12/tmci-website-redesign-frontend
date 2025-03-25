<template>
  <div class="relative flex-center-between !bg-transparent">
    <div class="flex-y-center">
      <img :src="images[type]" alt="icon" class="w-6 h-6" />
      <div class="ml-2">
        <h2 class="text-white font-medium text-xs !leading-130">
          {{ title ?? defaultMessage }}
        </h2>
      </div>
    </div>

    <span class="icon-close text-xl text-gray cursor-pointer"></span>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  type: 'success' | 'error' | 'warning'
  title: string
}

const props = defineProps<Props>()
const locale = useCookie('locale').value

const errorTranslations = computed(() => {
  if (locale === 'en') {
    return {
      success: 'Success',
      error: 'Error',
      warning: 'Warning',
    }
  } else if (locale === 'uz') {
    return {
      success: 'Muvaffaqiyatli',
      error: 'Xatolik',
      warning: 'Ogohlantirish',
    }
  } else {
    return {
      success: 'Успешно',
      error: 'Ошибка',
      warning: 'Предупреждение',
    }
  }
})

const defaultMessage = computed(() => {
  return errorTranslations.value[props.type]
})

const images = computed(() => {
  return {
    success: '/images/toast/success.svg',
    error: '/images/toast/error.svg',
    warning: '/images/toast/warning.svg',
  }
})
</script>
<style>
.toast {
  box-shadow: 0 8px 20px rgba(18, 28, 37, 0.16);
}

.Vue-Toastification__toast--default {
  border-radius: 12px !important;
  background: rgba(49, 49, 50, 0.8) !important;
  backdrop-filter: blur(10px) !important;
  color: #fff !important;
}
</style>
