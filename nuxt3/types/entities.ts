export type RecipeEntity = {
    name: string
    items: {
        name: string
        amount: "" | number
        unit: string
    }[]
    howToCook: string
}