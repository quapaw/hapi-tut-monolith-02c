const SampleProducts = require('./samples/products');
module.exports = function (request, reply) {

    reply(SampleProducts);

};