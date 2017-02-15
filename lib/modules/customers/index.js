exports.register = function (server, options, next) {

    server.route({method:  'GET',
                  path:    '/customers',
                  handler: require('./customers')
                 });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};