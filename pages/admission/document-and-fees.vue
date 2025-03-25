<template>
  <div>
    <BaseBreadcrumb body-class="!bg-transparent" v-bind="{ routes }" />
    <main class="grid grid-cols-12 gap-3 md:gap-5 container">
      <section class="col-span-12 lg:col-span-9">
        <admission-wrapper-main :loading :title="info?.title">
          <template #content>
            <BaseSkeleton :loading border-radius="20px" height="200px">
              <div class="flex flex-col gap-3 md:gap-5">
                <!-- SECTIONS -->
                <div
                  v-for="(section, key) in info?.contents"
                  :key
                  class="bg-white rounded-3xl p-4 md:p-6"
                >
                  <h2 class="text-xl md:text-2xl font-medium">
                    {{ section?.title }}
                  </h2>
                  <article
                    class="article font-georgia mt-4"
                    v-html="section?.description"
                  />

                  <!-- FILES -->
                  <div
                    v-if="section?.step_files?.length"
                    class="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4 md:mt-6"
                  >
                    <CommonCardFile
                      v-for="(file, idx) in section?.step_files"
                      :key="idx"
                      v-bind="file"
                    />
                  </div>

                  <a
                    v-if="section?.action_link"
                    :href="section?.action_link"
                    class="mt-2 block"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <BaseButton :text="$t('learn_more')" variant="primary" />
                  </a>
                </div>
              </div>
            </BaseSkeleton>

            <BaseSkeleton
              v-for="key in 4"
              :key
              :loading
              border-radius="20px"
              height="320px"
              preloader-class="my-2"
            />
          </template>
        </admission-wrapper-main>
      </section>

      <aside class="col-span-12 lg:col-span-3 w-full space-y-3 md:space-y-5">
        <BaseSkeleton :loading border-radius="16px" height="420px" width="100%">
          <common-banner-apply
            class="w-full"
            mini
            v-bind="{
              title: info?.card_title,
              description: info?.card_description,
            }"
          />
        </BaseSkeleton>
        <card-anti-corruption
          v-if="
            info?.anti_corruption_department &&
            Object.keys(info?.anti_corruption_department).length
          "
          :card="{
            title: info?.anti_corruption_department?.title,
            subtitle: info?.anti_corruption_department?.description,
            time: info?.anti_corruption_department?.application_time,
            phone: info?.anti_corruption_department?.phone,
            email: info?.anti_corruption_department?.email,
          }"
          :loading
        />
      </aside>
    </main>

    <footer class="mt-10 lg:mt-[160px]">
      <CommonDownloadApp />
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const loading = ref(true)
const info = ref()

const routes = computed(() => {
  return [
    {
      name: t('menu.admissions'),
      path: '/admission',
    },

    {
      name: t('submenu.admissions.document_and_fees'),
      path: '/admission/document-and-fees',
    },
  ]
})

onMounted(() => {
  fetchDocuments()
})

function fetchDocuments() {
  loading.value = true
  useApi()
    .$get('/admission/documents-fees/')
    .then((res) => (info.value = res))
    .finally(() => {
      loading.value = false
    })
}
</script>
