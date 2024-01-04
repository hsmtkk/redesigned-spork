<script setup lang="ts">
const paths = useRoute()
    .path.split("/")
    .filter((path) => path)
    .map((_path, index, array) => {
        const url = "/" + array.slice(0, index + 1).join("/")
        return url
    })

const urlList = ["/", ...paths]
</script>

<template>
    <span class="inline-flex items-center gap-4">
        <span v-for="(url, index) in urlList">
            <NuxtLink v-if="index < urlList.length - 1" v-bind:key="url" v-bind:href="url"
                class="inline-block h-7 w-7 rounded-full bg-accent-400 shadow-lg hover:opacity-70"></NuxtLink>
            <span v-else key="current" class="inline-block h-7 w-7 rounded-full bg-accent-700 dark:bg-accent-200"></span>
        </span>
    </span>
</template>