import { EntityGenerator } from '../entity-generator'
import { faker } from '@faker-js/faker'

export interface Category {
    id: string
    name: string
    slug: string
    description: string
    color: string // code couleur hex
    isUsed: boolean
}

export class CategoryGenerator implements EntityGenerator<Category> {
    generate(data: Partial<Category>): Category {
        return {
            id: data.id ?? faker.string.uuid(),
            name: data.name ?? faker.lorem.sentence(),
            slug: data.slug ?? faker.lorem.slug(),
            description: data.description ?? faker.lorem.paragraph(),
            color: data.color ?? faker.color.rgb({ format: 'hex' }),
            isUsed: data.isUsed ?? false,
        }
    }
}
