import { isTimestampable, Timestampable } from '../../abstract/timestampable'
import { EntityGenerator } from '../entity-generator'
import { faker } from '@faker-js/faker'
import { Category } from '../category/category'
import { User } from '../user/user'
import { Network } from '../network/network'

export interface Article extends Timestampable {
    id: string
    title: string
    content: string
    excerpt: string
    author: User['id']
    categories: Category['id'][]
    network: Network['id']
    status: 'draft' | 'published' | 'archived'
    featured: boolean
    publishedAt: Date | null
}

export class ArticleGenerator implements EntityGenerator<Article> {
    generate(data: Partial<Article>): Article {
        return {
            id: data.id ?? faker.string.uuid(),
            title: data.title ?? faker.lorem.sentence(),
            content: data.content ?? faker.lorem.paragraphs(3),
            excerpt: data.excerpt ?? faker.lorem.sentences(2),
            author: data.author ?? faker.person.fullName(),
            categories: data.categories ?? [],
            network: data.network ?? faker.string.uuid(),
            status: data.status ?? 'draft',
            featured: data.featured ?? false,
            publishedAt: data.publishedAt ?? null,
            ...isTimestampable(),
        }
    }
}
