<template>
  <CommonModal :show="show" no-header @close="$emit('close')">
    <div
      class="max-w-[782px] rounded-3xl bg-white sm:mx-auto justify-center flex flex-col items-center text-center pt-[30px] pb-8 relative px-5 md:px-0 mx-5"
    >
      <span
        class="w-[360px] h-0.5 bg-[#1EC977] rounded-t-none rounded-r-none rounded-b-2 rounded-l-2 absolute top-0 hidden md:block"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="158"
        height="158"
        viewBox="0 0 158 158"
        fill="none"
      >
        <g filter="url(#filter0_d_609_62643)">
          <circle
            cx="78.9998"
            cy="67"
            r="42.1053"
            fill="url(#paint0_linear_609_62643)"
          />
          <circle
            cx="78.9998"
            cy="67"
            r="41.1053"
            stroke="url(#paint1_linear_609_62643)"
            stroke-width="2"
          />
        </g>
        <path
          d="M64.0344 67.397L74.1298 77.5008L95.2773 56.371"
          stroke="white"
          stroke-width="5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <defs>
          <filter
            id="filter0_d_609_62643"
            x="0.894531"
            y="0.894775"
            width="156.211"
            height="156.21"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="12" />
            <feGaussianBlur stdDeviation="18" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.117647 0 0 0 0 0.788235 0 0 0 0 0.466667 0 0 0 0.28 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_609_62643"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_609_62643"
              result="shape"
            />
          </filter>
          <linearGradient
            id="paint0_linear_609_62643"
            x1="78.9998"
            y1="24.8948"
            x2="78.9998"
            y2="109.105"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#1EC977" />
            <stop offset="1" stop-color="#1BB36A" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_609_62643"
            x1="78.9998"
            y1="24.8948"
            x2="78.9998"
            y2="109.105"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="white" stop-opacity="0.24" />
            <stop offset="1" stop-color="white" stop-opacity="0.04" />
          </linearGradient>
        </defs>
      </svg>
      <h2 class="text-dark text-xl leading-130 font-extrabold mt-4 mb-2">
        {{ $t('thanks_for_joining') }}
      </h2>
      <p class="text-gray mb-4 font-normal text-xs leading-5 max-w-[432px]">
        {{ $t('thanks_for_joining_subtitle') }}
      </p>
      <slot name="actions">
        <BaseButton
          class="min-w-40 px-5"
          size="large"
          variant="error"
          @click="$emit('close')"
        >
          {{ $t('back_to_club', { club: title }) }}
        </BaseButton>
      </slot>
    </div>
  </CommonModal>
</template>
<script lang="ts" setup>
interface Props {
  title: string
  show: boolean
}

defineProps<Props>()
defineEmits(['close'])
</script>
