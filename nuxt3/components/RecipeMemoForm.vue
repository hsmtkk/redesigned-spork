<script setup lang="ts">
type RecipeModel = {
    name: string
    items: {
        name: string
        amount: "" | number
        unit: string
    }[]
    howToCook: string
}

const props = defineProps<{
    modelValue: RecipeModel
    id: string
    redirectOnSuccess: string
}>()

const emits = defineEmits<{
    (e: "update:modelValue", value: RecipeModel): void
}>()

const form = computed({
    get: () => props.modelValue,
    set: (value) => {
        emits("update:modelValue", value)
    }
})

const removeItem = (index: number) => {
    form.value.items.splice(index, 1)
}

const addItem = () => {
    form.value.items.push({
        name: "",
        amount: "",
        unit: "",
    })
}

const dbName = "recipe-memo"
const tableName = "recipe"

const submit = () => {
    const { name, items, howToCook } = form.value
    if (!name || !howToCook || !items.some((item) => !item.name || !Number.isFinite(item.amount) || !item.unit)) {
        console.log("form.value")
        console.log(form.value)
        alert("いずれかのフォームが空白です")
        return
    }
    const openRequest = indexedDB.open(dbName)
    openRequest.onsuccess = (event) => {
        const db = (event.target as IDBRequest).result
        const transaction = db.transaction(tableName, "readwrite")
        const table = transaction.objectStore(tableName) as IDBObjectStore
        const id = props.id
        const putRequest = table.put({ id, name, items: items.map((i) => ({ name: i.name, amount: i.amount, unit: i.unit })), howToCook })
        putRequest.onsuccess = () => {
            alert("保存に成功しました")
            navigateTo(props.redirectOnSuccess)
        }
        putRequest.onerror = () => {
            alert("保存に失敗しました")
        }
    }
}
</script>

<template>
    <div class="grid gap-8">
        <label>レシピの名前
            <InputText v-model="form.name" />
        </label>
        <div v-for="(item, index) in form.items" class="bg-cyan-100 rounded-md p-4 shadow-md">
            <div class="w-full text-right">
                <ButtonSecondary v-on:click="() => removeItem(index)">材料{{ index + 1 }}を削除する</ButtonSecondary>
            </div>
            <div class="grid gap-4 sm:grid-cols-3">
                <label>材料{{ index + 1 }}の名前
                    <InputText v-model="item.name" />
                </label>
                <label>材料{{ index + 1 }}の個数
                    <InputNum v-model="item.amount" />
                </label>
                <label>材料{{ index + 1 }}の単位
                    <InputText v-model="item.unit" />
                </label>
            </div>
        </div>
        <div>
            <ButtonPrimary v-on:click="submit">レシピを保存する</ButtonPrimary>
        </div>
    </div>
</template>