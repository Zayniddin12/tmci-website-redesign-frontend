<script lang="ts" setup>
import { unref } from 'vue'
import { useRoute } from 'vue-router'

// this is international direction
import type { TForm } from '@/composables/useForm'
import { useUniversityStore } from '~/store/unversity'
import type { IDirection } from '~/types/admission/index.types'

const props = defineProps<{
  form?: TForm<IDirection>
}>()

const { t } = useI18n()

const { form } = unref(props)
const universityStore = useUniversityStore()
const route = useRoute()
const agentSlug = route.params.slug || undefined
const faculties = computed(() => universityStore.programs)

// const programs = computed(() => universityStore.programLevels)'

const programs = computed(() => {
  if (route.path === '/apply/program' || route.path === `/agent/${agentSlug}/apply/program`) {
    return [
      {
        title: t('foundation'),
        slug: 'foundation',
      },
      {
        title: t('undergraduate'),
        slug: 'undergraduate',
      },
      {
        title: t('master'),
        slug: 'master',
      },
    ]
  } else if (route.path === '/apply/scholarship' || route.path === `/agent/${agentSlug}/apply/scholarship`) {
    return [
      {
        title: t('foundation'),
        slug: 'foundation',
      },
    ]
  }
})

universityStore.fetchProgramLevels()

watch(
  () => form?.values?.program,
  (value) => {
    if (value) {
      if (!value) return
      universityStore.fetchPrograms(value, 'international')
    }
  },
  { deep: true }
)
</script>

<template>
  <form v-if="form" class="grid grid-cols-2 gap-x-2 gap-y-4" @submit.prevent>
    <FormGroup
      :label="$t('apply_form.direction.programs')"
      class="col-span-2 md:col-span-1"
      label-class="mb-1"
    >
      <FormSelect
        v-model="form.values.program"
        :error="form.$v.value.program.$error"
        :options="programs"
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
        :options="faculties"
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
