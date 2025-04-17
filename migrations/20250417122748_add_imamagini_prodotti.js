/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('immagini_prodotti', function (table) {
    table.increments('id').primary();
    table.integer('prodotto_id').unsigned().references('id').inTable('prodotti_venduti').onDelete('CASCADE');
    table.string('url').notNullable();
    table.string('descrizione');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('immagini_prodotti');
};
