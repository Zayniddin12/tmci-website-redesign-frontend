<template>
  <div>
    <base-breadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <main>
      <!--      <pre>{{info}}</pre>-->
      <admission-wrapper-main :title="info?.title">
        <template #content>
          <div v-for="card of info?.content_items">
            <section class="mb-4 md:mb-6">
              <admission-card-scholarship
                v-if="card?.is_card"
                :card="{
                  title: info?.title,
                  image: info?.image?.s500x500,
                  subtitle: info?.card_description,
                }"
                :loading="loading"
              />
              <section
                v-else-if="!card?.is_card && card?.is_divided"
                class="bg-white rounded-3xl"
              >
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3 p-5">
                  <div class="h-full">
                    <BaseSkeleton
                      :loading="loading"
                      border-radius="20px"
                      height="350px"
                      class="h-full"
                    >
                      <CommonCardAssesment
                        class="h-full"
                        v-bind="{
                          icon: card?.icon,
                          content: card?.content,
                          title: card?.title,
                        }"
                      />
                    </BaseSkeleton>
                  </div>
                </div>
              </section>
              <admission-card-requirements
                v-else
                :card="{
                  headerTitle: card?.title,
                  headerContent: card?.content,
                }"
                :loading="loading"
              />
            </section>
          </div>

          <section class="bg-white rounded-3xl">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3 p-5">
              <div v-for="card of info?.content_items" class="h-full">
                <BaseSkeleton
                  :loading="loading"
                  border-radius="20px"
                  height="350px"
                  class="h-full"
                >
                  <CommonCardAssesment
                    class="h-full"
                    v-bind="{
                      icon: card?.icon,
                      content: card?.content,
                      title: card?.title,
                    }"
                  />
                </BaseSkeleton>
              </div>
            </div>
            <!--                        <admission-card-requirements-->
            <!--                          :card="{-->
            <!--                            headerTitle: $t('the_deans_scholarship'),-->
            <!--                            headerContent: info?.the_deans_scholarship,-->
            <!--                          }"-->
            <!--                          :loading="loading"-->
            <!--                        />-->
          </section>
        </template>
      </admission-wrapper-main>
    </main>

    <footer class="mt-10 lg:mt-[160px]">
      <CommonDownloadApp />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

import { useApi } from '~/composables/useApi'
import { useAdmissionStore } from '~/store/admission'
import type { IFinancialAid } from '~/types/admission/index.types'

const { t } = useI18n()
const store = useAdmissionStore()
const { slug } = useRoute().params

const info = ref()

const single = computed(() => store.scholarshipSingle)
const loading = ref(true)
const routes = computed(() => {
  return [
    {
      name: t('menu.admissions'),
      path: '/admission',
    },

    {
      name: t('submenu.admissions.financial_aid'),
      path: '/admission',
    },
  ]
})
const scholars = computed(() => {
  return [
    {
      icon: 'icon-file',
      title: t('eligibility'),
      subtitle: single.value?.eligibility,
    },
    {
      icon: 'icon-checks',
      title: t('assessment'),
      subtitle: single.value?.assessment,
    },
  ]
})
onMounted(() => {
  fetchFinancialAid(slug)
})

function fetchFinancialAid(slug: string) {
  loading.value = true
  useApi()
    .$get<IFinancialAid>(`/admission/financial-aid/${slug}/`)
    .then((data) => {
      info.value = data
    })
    .catch((err) => {
      console.log(err)
    })
    .finally(() => {
      loading.value = false
    })
}
</script>
