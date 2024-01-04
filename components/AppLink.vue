<script setup lang="ts">
interface Props {
    href: string
}

defineProps<Props>()
</script>

<template>
    <NuxtLink
        class="inline-block w-full rounded-md border-b-2 border-r-2 border-main-400 bg-main-100 px-4 py-2 shadow-md hover:opacity-70 dark:border-t-[1px] dark:border-l-[1px] dark:border-main-300 dark:bg-coffee dark:text-main-300"
        v-bind:href="href">
        <slot />
    </NuxtLink>
</template>