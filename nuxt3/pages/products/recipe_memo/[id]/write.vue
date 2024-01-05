<script setup lang="ts">
import type { RecipeEntity } from "@/types/entities"
import { onMounted } from "vue";

const route = useRoute()
const id = route.params.id as string

const dbName = "recipe-memo"
const tableName = "recipe"

const form = reactive<RecipeEntity>({
    name: "",
    items: [{
        name: "",
        amount: "",
        unit: "",
    }],
    howToCook: ""
})

onMounted(() => {
    const openRequest = indexedDB.open(dbName)
    openRequest.onsuccess = (event) => {
        const db = (event.target as IDBRequest).result
        const transaction = db.transaction(tableName, "readonly")
        const table = transaction.objectStore(tableName) as IDBObjectStore
        const getRequest = table.get(id)
        getRequest.onsuccess = (event) => {
            const r = (event.target as IDBRequest).result
            form.name = r.name
            form.items = r.items
            form.howToCook = r.howToCook
        }
    }
})

const goBack = () => {
    navigateTo(`/products/recipe_memo/${id}`)
}

const deleteItem = () => {
    if (!confirm(`${record.value?.name}のレシピを本当に削除してもよろしいですか?`)) { }
}
</script>

<template>
    <TheContainer>
        <AppH1>{{ form && form.name ? `${form.name}のレシピを編集する` : "レシピを編集する" }}</AppH1>
        <div class="text-right">
            <ButtonSecondary v-on:click="goBack">編集をやめる</ButtonSecondary>
        </div>
        <RecipeMemoForm v-bind:id="id" v-bind:redirectOnSuccess="`/products/recipe_memo/${id}`" v-model="form" />
    </TheContainer>
</template>