<script setup lang="ts">
import { v4 } from "uuid"
import type { RecipeEntity } from "@/types/entities"
import { onMounted, reactive } from "vue"

const dbName = "recipe-memo"
const tableName = "recipe"

onMounted(() => {
    const openRequest = indexedDB.open(dbName)
    openRequest.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest).result
        db.createObjectStore(tableName, { keyPath: "id" })
    }
})

const form = reactive<RecipeEntity>({
    name: "",
    items: [{
        name: "",
        amount: "",
        unit: "",
    }],
    howToCook: "",
})

const goBack = () => {
    navigateTo("/products/recipe_memo")
}

</script>

<template>
    <TheContainer>
        <AppH1>レシピをメモできるアプリ</AppH1>
        <div class="text-right">
            <ButtonSecondary v-on:click="goBack">アプリTOPに戻る</ButtonSecondary>
        </div>
        <AppH2>レシピを書く</AppH2>
        <RecipeMemoForm v-bind:id="v4()" redirectOnSuccess="/products/recipe_memo" v-model="form"></RecipeMemoForm>
    </TheContainer>
</template>