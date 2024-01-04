<script setup lang="ts">
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365
const mode = useCookie("mode", {
    maxAge: ONE_YEAR_SECONDS,
    default: () => {
        return "dark"
    },
})

const switchMode = () => {
    mode.value = mode.value ? "" : "dark"
}

const goBack = () => {
    navigateTo("/")
}

const isNotTopPage = useRoute().path != "/"
</script>

<template>
    <div v-bind:class="mode">
        <div class="min-h-screen bg-main-200 py-2 px-4 text-coffee dark:bg-coffee dark:text-main-100">
            <div class="my-2 flex justify-between">
                <TheBreadcrumbs />
                <TheModeSwitcher v-bind:darkOrEmpty="mode" v-bind:switchMode="switchMode" />
            </div>
            <div
                class="container mx-auto mt-4 rounded-md bg-main-50 p-4 dark:border-2 dark:bg-coffee dark:shadow-2x1 dark:shadow-main-300">
                <slot />
            </div>
            <div class="container mx-auto my-10 text-right">
                <ButtonSecondary v-if="isNotTopPage" v-bind:onClick="goBack">サイトTOPに戻る</ButtonSecondary>
            </div>
        </div>
    </div>
</template>