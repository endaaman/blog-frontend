
export interface Category {
    priority: number
    slug: string
    name: string
}

export interface Article {
    category: Category
    slug: string
    title: string
    date: string
    digest: string
    image: string
    tags: string[]
    special: boolean
    private: boolean
}

