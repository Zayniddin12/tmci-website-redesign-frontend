<template>
  <section class="container">
    <h1 class="text-2xl md:text-4.5xl font-bold text-dark mb-6">
      {{ $t('feedback.title') }}
    </h1>

    <div class="bg-white rounded-xl p-4 md:p-8 flex justify-between relative">
      <div class="w-full grid gap-3">
        <h2 class="text-xl md:text-3.5xl text-dark font-black">
          {{ $t('feedback.card.title') }}
        </h2>

        <p>{{ $t('feedback.card.info') }}</p>

        <BaseButton
          :text="$t('feedback.send')"
          class="min-w-[174px] text-center flex-center !h-10 max-w-max mt-3"
          icon="icon-send-converted text-white text-lg"
          icon-position="right"
          variant="error"
          @click="$emit('next')"
        />
      </div>
      <div class="w-full hidden md:block"></div>
      <img
        alt="send feedback tmc"
        class="absolute right-0 h-96 w-full max-w-lg -bottom-10 hidden md:block"
        src="/images/chat.png"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
type Emits = {
  (e: 'next'): void
}

defineEmits<Emits>()
</script>
