<script setup lang="ts">
interface Props {
    src: string
}

defineProps<Props>()
</script>

<template>
    <img class="h-32 w-32 rounded-full border-4 object-cover object-center sm:h-48 sm:w-48" v-bind:src="src" />
</template>