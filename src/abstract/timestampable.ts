export interface Timestampable {
    createdAt: Date | null
    updatedAt: Date | null
}

export const isTimestampable = (): Timestampable => {
    return {
        createdAt: new Date(),
        updatedAt: new Date(),
    }
}
