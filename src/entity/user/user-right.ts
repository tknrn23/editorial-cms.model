import { isTimestampable, Timestampable } from '../../abstract/timestampable'
import { UserRightEnum } from '../../enum/user-right.enum'
import { EntityGenerator } from '../entity-generator'
import { faker } from '@faker-js/faker'
import { User } from './user'

export interface UserRight extends Timestampable {
    userId: User['id']
    right: UserRightEnum
}

export class UserRightGenerator implements EntityGenerator<UserRight> {
    generate(data: Partial<UserRight>): UserRight {
        return {
            userId: data.userId || faker.string.uuid(),
            right: data.right || UserRightEnum.USER_MANAGER,
            ...isTimestampable(),
        }
    }
}
