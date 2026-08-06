export interface EntityGenerator<T> {
    generate(data: Partial<T>): T
}
