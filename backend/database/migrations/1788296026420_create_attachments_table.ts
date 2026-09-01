import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'attachments'

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

      // Same polymorphic-owner approach as comments.
      table.string('attachable_type').notNullable()
      table.integer('attachable_id').unsigned().notNullable()

      table.string('filename').notNullable()
      table.string('mime_type').notNullable()
      table.integer('size').unsigned().notNullable()
      // Random on-disk filename under storage/uploads/ — never the
      // original filename, to avoid path traversal / collisions.
      table.string('storage_key').notNullable()

      table.timestamp('created_at').notNullable()

      table.index(['attachable_type', 'attachable_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
