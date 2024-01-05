<script setup lang="ts">
const links = ref<{
    url: string
    text: string
}[]>([])

const dbName = "recipe-memo"
const tableName = "recipe"

onMounted(() => {
    const openRequest = indexedDB.open(dbName)
    openRequest.onsuccess = (event) => {
        const db = (event.target as IDBRequest).result
        const transaction = db.transaction(tableName, "readonly")
        const table = transaction.objectStore(tableName) as IDBObjectStore
        const cursorRequest = table.openCursor()
        cursorRequest.onsuccess = (event) => {
            const cursor = (event.target as IDBRequest).result
            if (!cursor) return
            const record = cursor.value
            links.value.push({
                url: `/products/recipe_memo/${record.id}`,
                text: record.name,
            })
            cursor.continue()
        }
    }
    openRequest.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest).result
        db.createObjectStore(tableName, { keyPath: "id" })
    }
})

const goWrite = () => {
    navigateTo("/products/recipe_memo/write")
}
</script>

<template>
    <TheContainer>
        <AppH1>レシピをメモできるアプリ</AppH1>
        <AppH2>レシピ一覧</AppH2>
        <AppUl>
            <li v-for="link in links" v-bind:key="link.url">
                <AppLink v-bind:href="link.url">{{ link.text }}</AppLink>
            </li>
        </AppUl>
        <div class="p-4 text-right">
            <ButtonCircularPlus v-on:click="goWrite" />
        </div>
    </TheContainer>
</template>