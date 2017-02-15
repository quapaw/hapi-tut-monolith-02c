const SampleCustomers = require('./samples/customers');
module.exports = function (request, reply) {

    reply(SampleCustomers);

};