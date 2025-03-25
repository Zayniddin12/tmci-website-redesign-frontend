<template>
  <div>
    <div class="container mx-auto max-w-[944px] w-full pb-16">
      <Transition name="slide-up" mode="out-in">
        <div v-if="faqs.loading">
          <SectionFaqLoading v-for="i in 4" :key="i" />
        </div>
        <div v-else-if="!faqs.loading && faqs.list.length" class="pt-8">
          <h3
            v-if="title"
            class="text-[#101828] font-semibold leading-130 text-xl md:text-3xl"
          >
            <span class="text-blue underline leading-130">{{ title }}</span>
            {{ $t('letters_dict') }}
          </h3>
          <Faq :faqs />
        </div>
        <div v-else>
          <NoData />
        </div>
      </Transition>
    </div>
    <Pagination
      v-if="params.total > params.limit"
      v-bind="params"
      :current-page="page"
      pagination-buttons
      @input="(e) => (page = e)"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  type?: 'faq' | 'dictionary'
  title?: String
}
const props = defineProps<Props>()
const route = useRoute()

const faqs = ref({
  list: [] as any[],
  loading: true,
})
const params = ref({
  total: 0,
  limit: 10,
  currentPage: 1,
})
const page = ref(1)

function getFaqs() {
  useApi()
    .$get('/saylov/faq-list/', {
      params: {
        page: page.value,
        page_size: params.value.limit,
        type: props.type,
        title_starts_with: props.title,
      },
    })
    .then((res: any) => {
      faqs.value.list = res.results
      params.value.total = res.count
    })
    .finally(() => {
      faqs.value.loading = false
    })
}

getFaqs()

watch(
  () => props.title,
  () => {
    faqs.value.loading = true
    getFaqs()
  }
)

watch(
  () => page.value,
  () => {
    getFaqs()
  }
)
</script>

<style>
.faq-list {
  margin-top: 20px !important;
}

.faq-list:nth-child(1) {
  margin-top: 0 !important;
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
