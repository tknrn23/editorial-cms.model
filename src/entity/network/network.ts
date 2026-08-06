import { EntityGenerator } from '../entity-generator'
import { faker } from '@faker-js/faker'

export interface Network {
    id: string
    name: string
    description: string
}

export class NetworkGenerator implements EntityGenerator<Network> {
    generate(data: Partial<Network>): Network {
        return {
            id: data.id ?? faker.string.uuid(),
            name: data.name ?? faker.lorem.sentence(),
            description: data.description ?? faker.lorem.paragraph(),
        }
    }
}
