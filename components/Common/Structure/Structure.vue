<template>
  <main class="flex flex-col text-dark">
    <section
      :class="{ [`grid lg:grid-cols-${head?.length} py-5`]: head.length > 1 }"
      class="grid-cols-1 lg:!flex-center py-3 gap-8 relative max-lg:pl-4"
    >
      <CommonStructureSection
        v-for="(node, key) in head"
        :key="key"
        :head="head"
        :idx="key"
        :structure="structure"
        :title="node.title"
      />
    </section>
    <section
      :class="{
        [`grid lg:grid-cols-${subHeadNodes?.length} py-5`]:
          subHeadNodes.length > 1,
      }"
      class="grid-cols-1 lg:!flex-center py-3 gap-8 relative max-lg:pl-4"
    >
      <CommonStructureSection
        v-for="(node, key) in subHeadNodes"
        :key="key"
        :head="subHeadNodes"
        :idx="key"
        :structure="structure"
        :title="node.title"
      />
    </section>
    <section
      ref="structure"
      :class="`grid-cols-${subTrees?.length === 5 ? 4 : subTrees.length}`"
      class="grid max-lg:!grid-cols-1 gap-8 p-6 relative overflow-y-hidden max-lg:overflow-x-hidden max-lg:px-6"
    >
      <div class="absolute-x w-full bg-gray-300 h-px top-3 max-lg:hidden" />
      <CommonStructureNode
        v-for="(node, key) in subTrees"
        :key="key"
        :index="key"
        :is-first="key === 0"
        :is-last="key === subTrees.length - 1"
        v-bind="node"
      />
    </section>
  </main>
</template>

<script lang="ts" setup>
import type { IStructureNode } from '~/types/common'

interface Props {
  nodes: IStructureNode[]
}

const props = defineProps<Props>()

const structure = ref<HTMLElement>({} as HTMLElement)

//! CATEGORIZED NODES         <<-<==\_^_/==>->>
const flattenedNodes = computed(() => categorizeAndFlattenNodes(props.nodes))

//*  TYPES OF NODES HERE       >>\^/<<
const head = computed(() =>
  flattenedNodes.value.filter((n) => n.type === 'head')
)
const subHeadNodes = computed(() =>
  flattenedNodes.value.filter((n) => n.type === 'subhead')
)

const subTrees = computed(() =>
  flattenedNodes.value.filter((n) => n.type === 'subtree')
)

// console.table(subHeadNodes.value.map((n) => n.slug))
// console.table(childNodes.value.map((n) => n.slug))
</script>
