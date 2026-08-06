import { EntityGenerator } from '../entity-generator'
import { faker } from '@faker-js/faker'
import { isTimestampable, Timestampable } from '../../abstract/timestampable'

export interface User extends Timestampable {
    id: string
    identifier: string
    password: string
    firstName: string
    lastName: string
    email: string
}

export class UserGenerator implements EntityGenerator<User> {
    generate(data: Partial<User>): User {
        const firstName: string = data.firstName ?? faker.person.firstName()

        const lastName: string = data.lastName ?? faker.person.lastName()

        const email: string =
            data.email ??
            faker.internet.email({
                firstName: firstName,
                lastName: lastName,
                provider: 'yopmail.com',
            })

        return {
            id: data.id ?? faker.string.uuid(),
            identifier: data.identifier ?? faker.internet.userName() + '-' + faker.string.numeric(4),
            password: data.password ?? faker.internet.password(),
            firstName: firstName,
            lastName: lastName,
            email: email,
            ...isTimestampable(),
        }
    }
}
