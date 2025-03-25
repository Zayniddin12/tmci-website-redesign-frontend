<template>
  <main class="w-full">
    <LayoutHeader />
    <div class="h-screen w-full flex-center">
      <div>
        <img
          alt="not found image"
          loading="lazy"
          src="~/assets/images/not-found.webp"
        />
        <div class="mt-3 sm:mt-4 md:mt-6 mb-4 sm:mb-8 md:mb-10 space-y-1">
          <h2
            class="text-xl sm:text-2xl md:text-4xl font-extrabold leading-130 text-center"
          >
            {{ $t('went_wrong') }}
          </h2>
          <p class="text-gray text-sm text-center px-4">
            {{ $t('provide_service') }}
          </p>
        </div>
        <div class="text-center w-full">
          <BaseButton
            :text="$t('back_to_home')"
            class="mx-auto"
            type="button"
            variant="primary"
            @click="$router.push('/')"
          />
        </div>
      </div>
    </div>
  </main>
</template>
<script lang="ts" setup>
defineProps<{
  error: Error
}>()
</script>
