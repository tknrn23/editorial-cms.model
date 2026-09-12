import { UserRightEnum } from '../enum/user-right.enum'
import { CreatorAndCurrentUserInfo, UserPerformActionMatrix } from './security-matrix.interface'
import { UserActionEnum } from '../enum/user-action.enum'

export const securityMatrix: UserPerformActionMatrix = {
    [UserActionEnum.VIEW_DASHBOARD]: (userRights: UserRightEnum[]): boolean => {
        return [UserRightEnum.ADMINISTRATOR, UserRightEnum.USER_MANAGER].some((right: UserRightEnum): boolean =>
            userRights.includes(right),
        )
    },
    [UserActionEnum.UPDATE_DASHBOARD]: (userRights: UserRightEnum[]): boolean => {
        return [UserRightEnum.ADMINISTRATOR].some((right: UserRightEnum): boolean => userRights.includes(right))
    },
    [UserActionEnum.VIEW_USER]: (userRights: UserRightEnum[]): boolean => {
        return [UserRightEnum.ADMINISTRATOR, UserRightEnum.USER_MANAGER].some((right: UserRightEnum): boolean =>
            userRights.includes(right),
        )
    },
    [UserActionEnum.ADD_USER]: (userRights: UserRightEnum[]): boolean => {
        return [UserRightEnum.ADMINISTRATOR, UserRightEnum.USER_MANAGER].some((right: UserRightEnum): boolean =>
            userRights.includes(right),
        )
    },
    [UserActionEnum.DELETE_USER]: (userRights: UserRightEnum[]): boolean => {
        return [UserRightEnum.ADMINISTRATOR, UserRightEnum.USER_MANAGER].some((right: UserRightEnum): boolean =>
            userRights.includes(right),
        )
    },
    [UserActionEnum.EDIT_USER_MAIN_INFORMATION]: (userRights: UserRightEnum[]): boolean => {
        return [UserRightEnum.ADMINISTRATOR].some((right: UserRightEnum): boolean => userRights.includes(right))
    },
    [UserActionEnum.EDIT_USER_RIGHT_INFORMATION]: (userRights: UserRightEnum[]): boolean => {
        return [UserRightEnum.ADMINISTRATOR].some((right: UserRightEnum): boolean => userRights.includes(right))
    },
    [UserActionEnum.TEST_EXCLUDED_ACTION]: (
        userRights: UserRightEnum[],
        complementary: CreatorAndCurrentUserInfo,
    ): boolean => {
        // Rights can always modify, whether they are creator or not
        const alwaysCanEditRights: UserRightEnum[] = [UserRightEnum.ADMINISTRATOR, UserRightEnum.USER_MANAGER]

        // Check that the user has one of the rights that can always modify
        if (alwaysCanEditRights.some((right: UserRightEnum): boolean => userRights.includes(right))) {
            return true
        }

        // Only the creator can perform this action
        return (
            userRights.includes(UserRightEnum.NETWORK_MANAGER) &&
            complementary.currentUserId === complementary.creatorId
        )
    },
}

export const securityMatrixTableGenerator = () => {
    const table: string[][] = []
    const header: string[] = ['actions\\rights', ...Object.values(UserRightEnum)]

    table.push(header)

    for (const matrixAction in securityMatrix) {
        const row: string[] = [matrixAction]

        for (const right of header.slice(1)) {
            row.push(securityMatrix[matrixAction]([right], { currentUserId: '', creatorId: '' }) ? 'X' : '')
        }

        table.push(row)
    }

    return table
}
