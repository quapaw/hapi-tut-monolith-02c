'use strict';

//Go Look at https://medium.com/@dstevensio/manifests-plugins-and-schemas-organizing-your-hapi-application-68cf316730ef#.3s5j9o2yu

const Glue            = require('glue');
const manifest        = require('./config/manifest.json');
const options  = {
  relativeTo: __dirname + '/lib/modules'
};

Glue.compose(manifest, options, function(err, server) {
    server.route({method: 'GET',
                  path: '/',
                  handler: function (request, reply) {
                     reply('Hello, world');
                  }
    });

    server.route({method: 'GET',
                  path: '/{name}',
                  handler: function (request, reply) {
                     reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
                  }
    });


    server.start(function (err) {
        if(err) {
            throw err;
        }
        console.log('Server running at: ' + server.info.uri);
        //API Running on port 3000
    });
});
