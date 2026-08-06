import { faker } from '@faker-js/faker'
import { EntityGenerator } from '../entity-generator'
import { Article } from '../article/article'

export interface EmailNotification {
    id: string
    articleId: Article['id']
    recipients: string[] // emails
    subject: string
    sentAt: Date
    status: 'sent' | 'failed'
}

export class EmailNotificationGenerator implements EntityGenerator<EmailNotification> {
    generate(data: Partial<EmailNotification>): EmailNotification {
        return {
            id: data.id ?? faker.string.uuid(),
            articleId: data.articleId ?? faker.string.uuid(),
            recipients: data.recipients ?? [faker.internet.email()],
            subject: data.subject ?? faker.lorem.sentence(),
            sentAt: data.sentAt ?? faker.date.recent(),
            status: data.status ?? 'sent',
        }
    }
}
