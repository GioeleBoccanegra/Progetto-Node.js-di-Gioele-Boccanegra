/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('foto_prodotti', function (table) {
    table.increments('id').primary();
    table.integer('prodotto_id').unsigned().references('id').inTable('prodotti_venduti').onDelete('CASCADE');
    table.string('file').notNullable(); // oppure il nome del file
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('foto_prodotti');
};