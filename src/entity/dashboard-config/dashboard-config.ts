import { User } from '../user/user'
import { EntityGenerator } from '../entity-generator'
import { faker } from '@faker-js/faker'

export interface DashboardConfig {
    id: string
    ownerId: User['id']
    stats: boolean
    categoryRepartition: boolean
    lastFivePublishedArticle: boolean
    lastNotificationSent: boolean
}

export class DashboardConfigGenerator implements EntityGenerator<DashboardConfig> {
    generate(data: Partial<DashboardConfig>): DashboardConfig {
        return {
            id: data.id ?? faker.string.uuid(),
            ownerId: data.ownerId ?? faker.string.uuid(),
            stats: data.stats ?? true,
            categoryRepartition: data.categoryRepartition ?? true,
            lastFivePublishedArticle: data.lastFivePublishedArticle ?? true,
            lastNotificationSent: data.lastNotificationSent ?? true,
        }
    }
}
