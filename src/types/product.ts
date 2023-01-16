import { Category } from "./category"

export interface Product{
    id:number
    title:string
    description:string
    price:number
    category:Category
    images:string[]
}

export interface CreateProduct{
    title: string
    description: string
    price: number
    categoryId:number
    images: string[]
}

export interface ModifyProduct{
    id:number
    update:Partial<Product>
}

export interface CreateProductWithForm{
    images:File[]
    product:CreateProduct
}
export interface ProductList{
    list: Product[]
}


