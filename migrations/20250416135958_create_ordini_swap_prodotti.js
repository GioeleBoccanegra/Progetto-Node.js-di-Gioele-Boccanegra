/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('ordini_swap_prodotti', function (table) {
    table.integer('ordine_swap_id').unsigned().notNullable();
    table.integer('prodotto_id').unsigned().notNullable();
    table.primary(['ordine_swap_id', 'prodotto_id']);
    table.foreign('ordine_swap_id').references('id')
      .inTable('ordini_swap').onDelete('CASCADE')
    table.foreign('prodotto_id').references('id').inTable('prodotti_venduti').onDelete('CASCADE')
    table.timestamps(true, true);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('ordini_swap_prodotti');
};