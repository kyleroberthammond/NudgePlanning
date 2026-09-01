import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tasks'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('feature_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('features')
        .onDelete('CASCADE')
      table
        .integer('release_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('releases')
        .onDelete('SET NULL')

      table.string('name').notNullable()
      table.date('start_date').nullable()
      table.date('due_date').nullable()
      table.string('status').notNullable().defaultTo('not_started')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
