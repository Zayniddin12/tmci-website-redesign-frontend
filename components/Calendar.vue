<template>
  <BaseSkeleton
    :loading="calendarLoading"
    border-radius="12px"
    height="600px"
    width="100%"
  >
    <FullCalendar ref="calendarRef" :options="calendarOptions" />
  </BaseSkeleton>
</template>

<script setup lang="ts">
import timeGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import FullCalendar from '@fullcalendar/vue3'

const api = useApi()
const router = useRouter()
const calendarLoading = ref(true)

const calendarRef = ref(null)

const calendarOptions = ref({
  plugins: [interactionPlugin, timeGridPlugin],
  initialView: 'dayGridMonth',
  nowIndicator: false,
  editable: false,
  height: '600px',
  events: [], // Placeholder for dynamic events
  eventClick: handleDateClick, // Set custom click event handler for dates
  dayCellClassNames: 'bg-[#FAFAFA]',
})

function handleDateClick(info) {
  router.push(
    `/life-at-tmc/academic-calendar/${info.event.title}?start_date=${
      info.event.startStr
    }&end_date=${
      info.event.endStr === '' ? info.event.startStr : info.event.endStr
    }`
  )
}

function getCalendar(limit: number) {
  calendarLoading.value = true
  api
    .$get('calendar/?limit=' + limit)
    .then((res) => {
      if (res?.count > limit) {
        limit += 10
        getCalendar(limit)
      }
      calendarOptions.value.events = res.results.map((event) => ({
        title: event.title,
        start: event.start_date,
        end: event.end_date || event.start_date,
        classNames: ['!bg-red !border-none h-6'],
      }))
    })
    .finally(() => {
      calendarLoading.value = false
    })
}

onMounted(() => {
  getCalendar(10)
})
</script>

<style scoped>
.app {
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}
</style>
