import { Article, ArticleGenerator } from '../entity/article/article'
import { Category, CategoryGenerator } from '../entity/category/category'
import { User, UserGenerator } from '../entity/user/user'
import { DashboardConfig, DashboardConfigGenerator } from '../entity/dashboard-config/dashboard-config'
import { Network, NetworkGenerator } from '../entity/network/network'
import { UserRightEnum } from '../enum/user-right.enum'
import { UserRight, UserRightGenerator } from '../entity/user/user-right'

export interface FixturesData {
    articles: Article[]
    categories: Category[]
    users: User[]
    dashboardConfigs: DashboardConfig[]
    networks: Network[]
    userRights: UserRight[]
}

export class GenerateFixtures {
    private articleGenerator: ArticleGenerator
    private categoryGenerator: CategoryGenerator
    private userGenerator: UserGenerator
    private userRightGenerator: UserRightGenerator
    private dashboardConfigGenerator: DashboardConfigGenerator
    private networkGenerator: NetworkGenerator

    constructor() {
        this.articleGenerator = new ArticleGenerator()
        this.categoryGenerator = new CategoryGenerator()
        this.userGenerator = new UserGenerator()
        this.userRightGenerator = new UserRightGenerator()
        this.dashboardConfigGenerator = new DashboardConfigGenerator()
        this.networkGenerator = new NetworkGenerator()
    }

    private prepareEmptyData(): FixturesData {
        return {
            articles: [],
            categories: [],
            users: [],
            userRights: [],
            dashboardConfigs: [],
            networks: [],
        }
    }

    generate(): FixturesData {
        const data: FixturesData = this.prepareEmptyData()
        // Generate fixtures for each entity type
        this.generateUsers(data)
        this.generateCategories(data)
        this.generateNetworks(data)
        this.generateArticles(data)

        return data
    }

    private generateUsers(data: FixturesData): void {
        Object.values(UserRightEnum).forEach((right: UserRightEnum): void => {
            const user: User = this.userGenerator.generate({})
            data.users.push(user)

            const userRight: UserRight = this.userRightGenerator.generate({
                userId: user.id,
                right: right as UserRightEnum,
            })
            data.userRights.push(userRight)

            const dashboardConfig: DashboardConfig = this.dashboardConfigGenerator.generate({
                ownerId: user.id,
            })
            data.dashboardConfigs.push(dashboardConfig)
        })
    }

    private generateCategories(data: FixturesData): void {
        const categories: Category[] = []

        let nbCategoriesToCreate: number = 5

        while (nbCategoriesToCreate--) {
            categories.push(this.categoryGenerator.generate({}))
        }

        data.categories.push(...categories)
    }

    private generateNetworks(data: FixturesData): void {
        const networks: Network[] = []

        let nbNetworksToCreate: number = 3

        while (nbNetworksToCreate--) {
            networks.push(this.networkGenerator.generate({}))
        }

        data.networks.push(...networks)
    }

    private generateArticles(data: FixturesData): void {
        const articles: Article[] = []

        for (const user of data.users) {
            let nbArticlesToCreate: number = 2

            while (nbArticlesToCreate--) {
                const nbRandomCategory: number = Math.floor(Math.random() * (data.categories.length + 1))

                const categoryIds: string[] = [...data.categories]
                    .sort((): number => Math.random() - 0.5)
                    .slice(0, nbRandomCategory)
                    .map((category: Category): Category['id'] => category.id)

                const article: Article = this.articleGenerator.generate({
                    author: user.id,
                    categories: categoryIds,
                    network: data.networks[Math.floor(Math.random() * data.networks.length)].id,
                })
                articles.push(article)
            }
        }

        data.articles.push(...articles)
    }
}
