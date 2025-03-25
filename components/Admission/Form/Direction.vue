<script lang="ts" setup>
import { unref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'

import type { TForm } from '@/composables/useForm'
import { useUniversityStore } from '~/store/unversity'
import type { IDirection } from '~/types/admission/index.types'

const props = defineProps<{
  form?: TForm<IDirection>
}>()

const { form } = unref(props)
const universityStore = useUniversityStore()
const { t } = useI18n()

const applicationType = localStorage.getItem('applicationType')
const route = useRoute()
const agentSlug = route.params.slug || undefined
// const areaOfStudy = computed(() => universityStore.areaOfStudy)
const faculties = computed(() => {
    if (route.path === '/apply/program' || route.path === `/agent/${agentSlug}/apply/program`) {
    return [
      {
        title: t('master'),
        slug: 'master',
      },
      {
        title: t('undergraduate'),
        slug: 'undergraduate',
      },
    ]
  } else {
    return [
      {
        title: t('undergraduate'),
        slug: 'undergraduate',
      },
    ]
  }
})
const areaOfStudy = computed(() => {
  if (route.path === '/apply/program' || route.path === `/agent/${agentSlug}/apply/program`) {
    return [
      {
        title: t('sirtqi'),
        slug: 'sirtqi',
      },
      {
        title: t('daytime'),
        slug: 'daytime',
      },
    ]
  } else {
    return [
      {
        title: t('daytime'),
        slug: 'daytime',
      },
    ]
  }
})

const programs = computed(() => universityStore.programs)
onMounted(() => {
  universityStore.fetchAreaOfStudy()
})

watch(
  () => form?.values?.program,
  (value) => {
    if (value) {
      if (!value) return
      universityStore.fetchPrograms(value, 'local', form?.values?.area_of_study)
    }
  },
  { deep: true }
)
watch(
  () => form?.values?.area_of_study,
  (value) => {
    if (value) {
      if (!value) return
      universityStore.fetchPrograms(form?.values?.program, 'local', value)
      form.values.faculty = ''
    }
  },
  { deep: true }
)
</script>

<template>
  <form v-if="form" class="grid grid-cols-2 gap-x-2 gap-y-4" @submit.prevent>
    <FormGroup
      :label="$t('apply_form.direction.area_of_study')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormSelect
        v-model="form.values.area_of_study"
        :error="form.$v.value.area_of_study.$error"
        :options="areaOfStudy"
        :placeholder="$t('apply_form.direction.select_area_of_study')"
        class="bg-[#F6F7F8] border-none rounded-lg py-[1px]"
        label-key="title"
        value-key="slug"
      />
    </FormGroup>

    <FormGroup
      :label="$t('apply_form.direction.programs')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormSelect
        v-model="form.values.program"
        :error="form.$v.value.program.$error"
        :options="faculties"
        :placeholder="$t('apply_form.direction.select_programs')"
        label-key="title"
        value-key="slug"
      />
    </FormGroup>

    <FormGroup
      :label="$t('apply_form.direction.faculties')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormSelect
        v-model="form.values.faculty"
        :disabled="!form.values.program"
        :error="form.$v.value.faculty.$error"
        :options="programs"
        :placeholder="$t('apply_form.direction.select_faculties')"
        label-key="title"
        value-key="slug"
      >
        <template #chevron="{ isOpen }">
          <span
            :class="{ '!-rotate-180': isOpen }"
            class="icon-chevron-down transition-300 inline-block text-xl leading-5 text-gray"
          />
        </template>
      </FormSelect>
    </FormGroup>
  </form>
</template>

<style scoped></style>
