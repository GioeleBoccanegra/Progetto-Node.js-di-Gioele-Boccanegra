/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('ordini_swap_utenti', function (table) {
    table.integer('ordine_swap_id').unsigned().notNullable();
    table.integer('utente_id').unsigned().notNullable();
    table.primary(['ordine_swap_id', 'utente_id']);
    table.foreign('ordine_swap_id').references('id')
      .inTable('ordini_swap').onDelete('CASCADE')
    table.foreign('utente_id').references('id').inTable('utenti').onDelete('CASCADE')
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ordini_swap_utenti');
};