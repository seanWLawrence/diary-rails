const { environment } = require('@rails/webpacker');
const typescript = require('./loaders/typescript');

environment.loaders.prepend('typescript', typescript);
environment.splitChunks();
module.exports = environment;
