import { User } from '../entity/user/user'
import { UserRightEnum } from '../enum/user-right.enum'
import { UserActionEnum } from '../enum/user-action.enum'

export interface CreatorAndCurrentUserInfo {
    creatorId: User['id']
    currentUserId: User['id']
}

export type UserPerformActionFunction<T = undefined> = (userRights: UserRightEnum[], complementary?: T) => boolean

export type UserPerformActionMatrix = {
    [action in Exclude<UserActionEnum, UserActionEnum.TEST_EXCLUDED_ACTION>]: UserPerformActionFunction
} & {
    [UserActionEnum.TEST_EXCLUDED_ACTION]: UserPerformActionFunction<CreatorAndCurrentUserInfo>
}
