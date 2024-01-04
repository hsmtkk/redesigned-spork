<script setup lang="ts">
interface Props {
    modelValue: string
}

defineProps<Props>()

const emits = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()
</script>

<template>
    <input v-model="modelValue" type="text" class="w-full rounded-lg border-2 p-2 dark:bg-coffee" />
</template>