<script lang="ts" setup></script>

<template>
  <CardWrapper
    class="bg-white !p-5 md:!py-6 md:!px-7 flex flex-col md:flex-row gap-5 relative items-center md:items-end"
  >
    <img
      alt="logo"
      class="max-w-[260px] hidden md:block object-cover absolute bottom-0 right-[60px]"
      loading="lazy"
      src="~/assets/images/careers/logo.webp"
    />
    <div class="space-y-1 md:space-y-2 basis-[100%] md:basis-[55%]">
      <h2 class="text-xl md:text-[28px] font-bold">
        {{ $t('join_us') }}
      </h2>
      <p class="line-clamp-2 sm:text-base text-sm">
        {{ $t('join_us_content') }}
      </p>
    </div>

    <nuxt-link to="/about-us/careers/send/">
      <BaseButton type="button" :text="$t('submit')" variant="error" />
    </nuxt-link>
  </CardWrapper>
</template>

<style scoped></style>
