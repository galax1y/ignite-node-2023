import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('users', (table) => {
    table.uuid('user_id').primary()
  })
  await knex.schema.createTable('meals', (table) => {
    table.uuid('meal_id').primary()
    table.text('name').notNullable()
    table.text('description').nullable()
    table.boolean('is_healthy').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable()
    
    // Relacionamento com a tabela users
    table.uuid('user_id').notNullable()
    table.foreign('user_id').references('user_id').inTable('users')
  })
}


export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('users')
  await knex.schema.dropTable('meals')
}

