<template>
  <div>
    <div class="w-full bg-red lg:pl-32 py-6 pl-16">
      <p class="text-white text-2xl text-extrabold">
        {{ $t('academic_year') }}
      </p>
    </div>
    <section class="lg:pb-20 pt-6 py-10 container">
      <div
        class="flex gap-x-3 items-center group cursor-pointer w-fit"
        @click="router.go(-1)"
      >
        <div
          class="rounded-full bg-red w-9 h-9 flex justify-center items-center group-hover:-translate-x-1 transition-300"
        >
          <i class="icon-chevron-right text-white text-4xl rotate-180" />
        </div>
        <p class="text-xl font-semibold group-hover:text-red transition-300">
          {{ $t('back_to_calendar') }}
        </p>
      </div>
      <BaseSkeleton :loading border-radius="12px" height="250px" width="100%">
        <div
          v-for="event in events"
          :key="event?.id"
          class="mt-9 flex flex-col gap-y-6"
        >
          <div class="pb-6 border-b border-gray-300">
            <p class="text-gray-400 text-xl font-semibold">
              {{ event?.term + ' ' + event?.start_date.split('-')[0] }}
            </p>
            <p class="text-dark text-5xl font-semibold">{{ event?.title }}</p>
          </div>
          <div class="pb-6 border-b border-gray-300">
            <p class="text-red text-2xl font-semibold">
              {{
                formatDateToFullDate(event?.start_date ?? 0) +
                (event?.start_date === event?.end_date
                  ? ''
                  : ' - ' + formatDateToFullDate(event?.end_date ?? 0))
              }}
            </p>
            <p class="text-gray text-xl font-medium">
              {{ event?.location }}
            </p>
          </div>
          <p class="text-gray text-xl">
            {{ event?.description }}
          </p>
          <div>
            <p class="text-dark text-4xl font-semibold">{{ $t('audience') }}</p>
            <p class="text-red-200 text-xl">{{ event?.audience_content }}</p>
          </div>
          <div>
            <p class="text-dark text-4xl font-semibold">
              {{ $t('school_program') }}
            </p>
            <p class="text-red-200 text-xl">{{ event?.school_program }}</p>
          </div>
          <div>
            <p class="text-dark text-4xl font-semibold">{{ $t('type') }}</p>
            <p class="text-red-200 text-xl">{{ event?.event_type }}</p>
          </div>
        </div>
      </BaseSkeleton>
    </section>
  </div>
</template>
<script setup lang="ts">
import { useApi } from '#imports'
import { formatDateToFullDate } from '~/utils'

const api = useApi()

const route = useRoute()
const router = useRouter()

const events = ref()
const loading = ref(true)

function getEventSingle() {
  loading.value = true
  api
    .$get(
      `/calendar-events/?start_date=${route.query.start_date}&end_date=${route.query.end_date}`
    )
    .then((res) => {
      events.value = res.results
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => (loading.value = false))
}

onMounted(() => {
  getEventSingle()
})
</script>
