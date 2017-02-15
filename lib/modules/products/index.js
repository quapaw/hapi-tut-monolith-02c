exports.register = function (server, options, next) {

    server.route({method:  'GET',
        path:    '/products',
        handler: require('./products')
    });

    next();

};

exports.register.attributes = {
    pkg: require('./package.json')
};