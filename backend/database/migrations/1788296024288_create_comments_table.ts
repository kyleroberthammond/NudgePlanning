import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')

      // Polymorphic owner (a feature or a task) — there's no DB-level FK
      // here since it can point at either table; ownership is enforced in
      // the application layer instead (see app/services/ownership.ts).
      table.string('commentable_type').notNullable()
      table.integer('commentable_id').unsigned().notNullable()

      table.text('body').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()

      table.index(['commentable_type', 'commentable_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
