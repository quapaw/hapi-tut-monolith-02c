# Breaking the Monolith by using hapi 
## Background
Let me get the disclaimer out of the way: I am not an expert on Hapi
I started looking into Hapi's ability to break components out.
This is my attempt to follow other tutorials from a hello world to a true component system.
I have broken this down into the following steps

| Project  | Description | Link |
|---|---|---|
|hapi-tut-monolith-01|A simple hello world hapi project| [01](https://github.com/quapaw/hapi-tut-monolith-01)|
|hapi-tut-monolith-02a|Add services - customers and products| [02A](https://github.com/quapaw/hapi-tut-monolith-02a)|
|hapi-tut-monolith-02b|Adding Glue and externalizing config| [02B](https://github.com/quapaw/hapi-tut-monolith-02b)|
|**hapi-tut-monolith-02c**|**Moving services into their own folders**|**[02C](https://github.com/quapaw/hapi-tut-monolith-02c)**|
|hapi-tut-monolith-03-main|Moved service into own project. Instructions here|[03-main](https://github.com/quapaw/hapi-tut-monolith-03-main)|
|hapi-tut-monolith-03-customer|Just the customer service| [03-customers](https://github.com/quapaw/hapi-tut-monolith-03-customers)|
|hapi-tut-monolith-03-products|Just the produce service|[03-products](https://github.com/quapaw/hapi-tut-monolith-03-products)|
|hapi-tut-monolith-04a-customer|Movement of some files| [04a-customers](https://github.com/quapaw/hapi-tut-monolith-04a-customers)|
|hapi-tut-monolith-04b-customer|New methods| [04b-customers](https://github.com/quapaw/hapi-tut-monolith-04b-customers)|
|hapi-tut-monolith-04c-customer|Validation and Error Handling|[04c-customers](https://github.com/quapaw/hapi-tut-monolith-04c-customers)|
|hapi-tut-monolith-04d-customer|Unit Testing|[04d-customers](https://github.com/quapaw/hapi-tut-monolith-04d-customers)|
|hapi-tut-monolith-04e-customer|Add Mongo and API Doc|[04e-customers](https://github.com/quapaw/hapi-tut-monolith-04e-customers)|
|hapi-tut-monolith-05-customer|Combine work with products for full deployment|[05-customers](https://github.com/quapaw/hapi-tut-monolith-05-customers)|
|hapi-tut-monolith-05-product|Combine work with products for full deployment|[05-products](https://github.com/quapaw/hapi-tut-monolith-05-product)|
|hapi-tut-monolith-05-main|Combine work with products for full deployment|[05-main](https://github.com/quapaw/hapi-tut-monolith-05-main)|

#HAPI Tutorial - Monolith - 2C
This step moves the customer service and the product service to their own folders
I used this [Tutorial](https://medium.com/@dstevensio/manifests-plugins-and-schemas-organizing-your-hapi-application-68cf316730ef#.2nve7u2r0) for the pattern of breaking the monolith.


## Folder Structure
You will need to create a folder for each service under ``lib/modules``
* Create a ``customers`` folder under ``lib/modules``

Standard files: This structure is not mandated by hapi or glue.  I am following the pattern that I found in this [Tutorial](https://medium.com/@dstevensio/manifests-plugins-and-schemas-organizing-your-hapi-application-68cf316730ef#.2nve7u2r0)

```
lib
 | - modules
 |------|
        | - customers
        | -----|
               | - index.js
               | - package.json
               | - customers.js 
```


### index.js
The index file is where you should move the route commands for this service.
You should also export the attributes from the package.json 
```javascript
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
```

### package.json
This file will contain the attributes for this server.
When we move the service into its own project this will be the actual package.json that is used by npm.
```javascript
{
  "name": "customers",
  "version": "1.0.0"
}
```
### XXXXXX.js
This is the file that holds the handler for the service.
The route, defined in index.js, points to this file.

customers.js
```javascript
const SampleCustomers = require('./samples/customers');
module.exports = function (request, reply) {

    reply(SampleCustomers);

};
```
Note that the sample file was moved into a directory under customer directory.

## Do the same thing for the products service
## changes to manifest.json
You will need to add a new set of data to register the plugins
```javascript
"registrations": [
    {
      "plugin": {
        "register": "./customers"
      }
    },
    {
      "plugin": {
        "register": "./products"
      }
    }
  ]
```

## Changes main index.js
* Remove all references in customers and products service
* Add a new option object.  This tells glue the relative directory for the plugins
```javascript
const options  = {
  relativeTo: __dirname + '/lib/modules'
};
```
* Add the options object to the glue creation
```javascript
Glue.compose(manifest, options, function(err, server) {
```




## Run Server and Test
###Start the server
```
node index.js
```
You should see a message stating your code is running
```
Server running at: http://localhost:3000
```
###Test the services
* Go to the following link [http://localhost:3000/customers](http://localhost:3000/customers)
* Go to the following link [http://localhost:3000/products](http://localhost:3000/products)

