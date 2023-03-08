import { Type } from 'class-transformer'

// export interface Category {
//     priority: number
//     slug: string
//     name: string
// }

// export interface Article {
//     category: Category
//     slug: string
//     title: string
//     date: string
//     digest: string
//     image: string
//     tags: string[]
//     special: boolean
//     private: boolean
// }

export class Model {

}

export class Category extends Model {
    slug: string
    name: string
    priority: number
}

export class Article extends Model {
    slug: string
    title: string
    date: string
    digest: string
    image: string
    tags: string[]
    special: boolean
    private: boolean
    @Type(() => Category)
    category: Category
}
