/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('ordini_swap', function (table) {
    table.increments('id').primary();
    table.timestamp('data_inserimento').defaultTo(knex.fn.now());
    table.timestamp('data_aggiornamento').defaultTo(knex.fn.now());
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ordini_swap');
};
