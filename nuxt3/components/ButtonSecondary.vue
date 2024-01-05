<script setup lang="ts">
interface Props {
    onClick: Function
}

defineProps<Props>()
</script>

<template>
    <button class="rounded-md bg-sub-100 p-1 text-sm shadow-md hover:opacity-70 dark:bg-sub-700" v-on:click="onClick()">
        <slot />
    </button>
</template>