<template>
  <div
    class="relative flex items-center z-0 w-full overflow-hidden py-9 bg-dark"
  >
    <img
      loading="lazy"
      src="~/assets/images/bg-pattern.webp"
      alt="bg image"
      class="absolute hidden sm:block max-w-[75%] w-full h-full top-0 left-0 -z-2"
    />
    <img
      loading="lazy"
      src="~/assets/images/svg/bg-pattern.svg"
      alt="bg image"
      class="absolute block sm:hidden w-full h-full -top-[68px] left-0 -z-2"
    />
    <span class="absolute w-full h-full top-0 left-0 bg-banner -z-1" />
    <div class="container flex items-center gap-4 justify-between">
      <slot />
      <div
        v-if="url?.length"
        class="border-8 hidden sm:block border-white/10 !z-10 relative qr-code rounded-2xl"
      >
        <div class="absolute !z-[9] qr-shadow -left-[100%]"></div>
        <client-only>
          <QRCodeVue3 :value="url" v-bind="qrConfig" />
        </client-only>
      </div>
    </div>
    <slot name="outer"></slot>
  </div>
</template>

<script setup lang="ts">
import QRCodeVue3 from 'qrcode-vue3'

import qrConfig from '~/data/qr-code'

interface Props {
  url: string
}
defineProps<Props>()
</script>
<style>
.qr-code img {
  width: 180px;
  height: 180px;
  border-radius: 10px;
}
</style>
<style scoped>
@media screen and (max-width: 640px) {
  .bg-banner {
    max-width: 94%;
  }
}

.qr-shadow {
  background: linear-gradient(
    272deg,
    rgba(255, 255, 255, 0.2) 0.53%,
    rgba(255, 255, 255, 0) 87.98%
  );
  mix-blend-mode: hard-light;
  filter: blur(42px);
  width: 358px;
  height: 244px;
  transform: rotate(-29.536deg);
}
</style>
