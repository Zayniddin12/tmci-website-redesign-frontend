<script lang="ts" setup>
defineProps<{
  mini?: boolean
  title?: string
  description?: string
}>()
</script>

<template>
  <div
    :class="{ '!px-5 !rounded-2xl': mini }"
    class="container px-3 sm:px-5 sm:w-[90%] hidden-print sm:w-full banner rounded-3xl border-2 border-white/[24%] relative"
  >
    <div
      :class="{ '!flex-col !gap-6 !items-start': mini }"
      class="flex items-center py-4 sm:py-5 md:py-7 justify-between gap-4 sm:gap-5 flex-wrap lg:flex-nowrap"
    >
      <img
        v-if="!mini"
        alt="main logo"
        class="mx-auto md:mx-20"
        loading="lazy"
        src="/images/logo-light.svg"
      />
      <img
        v-else
        alt="main logo"
        class="mx-auto md:mx-20"
        loading="lazy"
        src="~/assets/images/admission/mini-logo.svg"
      />
      <div
        :class="{ 'md:mt-5': mini }"
        class="flex items-center gap-3 md:gap-9"
      >
        <img
          v-if="!mini"
          alt="line"
          loading="lazy"
          src="~/assets/images/apply/line.svg"
        />
        <div class="space-y-1.5">
          <CardAdmission :title />
          <p class="max-w-[330px] text-white/80 text-sm font-medium">
            {{ description ?? $t('submenu.admissions.content') }}
          </p>
        </div>
      </div>

      <nuxt-link
        :class="{ '!mx-0 !ml-0 !mr-0 !min-w-max mb-10 md:mb-[129px]': mini }"
        class="border-2 mx-auto md:ml-auto border-white/[16%] rounded-lg min-w-[140px] md:min-w-[200px] max-w-max"
        to="/admission/process"
      >
        <BaseButton
          :text="$t('apply')"
          class="w-full relative z-50"
          main-class="!text-red"
          type="button"
          variant="secondary"
        />
      </nuxt-link>
    </div>

    <img
      alt="Apply Banner"
      class="w-full h-full object-cover absolute-x -bottom-4"
      src="/images/apply-banner-bg.svg"
    />
  </div>
</template>

<style scoped>
.banner {
  background: linear-gradient(180deg, #b01c40 0%, #971837 100%);
  box-shadow: 0 -16px 80px -20px rgba(0, 0, 0, 0.16) inset;
}
</style>
