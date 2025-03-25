<script lang="ts" setup>
import type { LngLat } from '@yandex/ymaps3-types'
import { shallowRef } from 'vue'
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapMarker,
  YandexMapZoomControl,
} from 'vue-yandex-maps'

defineProps<{
  center: LngLat
  zoom?: number
  markers: LngLat[]
}>()

const map = shallowRef(null)
</script>

<template>
  <yandex-map
    v-model="map"
    :settings="{
      location: {
        center: center,
        zoom: zoom ?? 14,
      },
    }"
    height="500px"
    width="100%"
  >
    <yandex-map-default-scheme-layer />
    <yandex-map-default-features-layer />
    <yandex-map-controls :settings="{ position: 'right' }">
      <yandex-map-zoom-control />
    </yandex-map-controls>

    <yandex-map-marker
      v-for="(marker, index) in markers"
      :key="index"
      :settings="{
        coordinates: marker,
      }"
    >
      <div
        class="relative w-14 h-14 -top-6 -left-7 flex-y-center flex-x-center cursor-pointer"
      >
        <img
          alt="marker"
          class="absolute w-14 z-0 bottom-1/2"
          src="/images/marker.svg"
        />
      </div>
    </yandex-map-marker>

    <div class="relative z-50">
      <slot name="card" />
    </div>
  </yandex-map>
</template>

<style scoped></style>
