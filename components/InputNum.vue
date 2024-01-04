<script setup lang="ts">
interface Props {
    modelValue: "" | number
}

const props = defineProps<Props>()

const emits = defineEmits<{
    (e: "update:modelValue", value: "" | number): void
}>()

const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => {
        emits("update:modelValue", value)
    }
})
</script>

<template>
    <inpt v-model="modelValue" type="number" min="0" class="w-full rounded-lg border-2 p-2 dark:bg-coffee" />
</template>
