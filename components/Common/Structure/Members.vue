<template>
  <div class="flex-center flex-wrap gap-1.5">
    <img
      v-for="(staff, index) in members.slice(0, 4)"
      :key="index"
      :alt="staff?.full_name + ' ' + staff?.position"
      :src="
        staff?.avatar?.s100x100 || 'https://api.dicebear.com/9.x/pixel-art/svg'
      "
      class="w-9 h-9 rounded-full border border-dashed border-gray-300 p-px object-cover object-center"
    />
  </div>
</template>

<script lang="ts" setup>
import type { IStaffMember } from '~/types/common'

interface Props {
  members: IStaffMember[]
}

defineProps<Props>()
</script>
