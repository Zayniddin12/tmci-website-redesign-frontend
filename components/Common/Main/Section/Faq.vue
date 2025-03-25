<template>
  <section class="p-8 md:py-16 mx-auto grid place-items-center bg-white">
    <BaseSkeleton :loading border-radius="24px" height="340px">
      <h2 class="title-style text-center text-dark max-w-screen-md mx-auto">
        {{ $t('faqs.title') }}
      </h2>
      <p
        class="text-center text-dark max-w-screen-md mx-auto mb-5 md:mb-8 text-base"
      >
        {{ $t('faqs.info') }}
      </p>

      <Transition mode="out-in" name="fade">
        <div v-if="loading" class="grid gap-3 w-full max-w-screen-md">
          <CommonLoadingCardFaq v-for="key in 4" :key />
        </div>
        <Faq v-else :home="false" :faqs="list"/>
      </Transition>
    </BaseSkeleton>
  </section>
</template>
<script lang="ts" setup>
import type { IDefaultResponse } from '~/types'
import type { IFaqs, IPartner } from '~/types/common'
import Faq from '../../../Faq.vue'

const list = ref<IFaqs[]>([])
const loading = ref(false)

function getInfo() {
  loading.value = true
  useApi()
    .$get<IDefaultResponse<IPartner>>('main/faq/')
    .then((response) => {
      list.value = response.results
    })
    .catch((error) => {
      console.log(error)
    })
    .finally(() => {
      loading.value = false
    })
}

onMounted(() => {
  getInfo()
})
</script>
