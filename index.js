let Hapi = require('hapi')
let mongoose = require('mongoose')
let RestHapi = require('rest-hapi')

async function APIServer () {
  try {

    let server = Hapi.Server({
      port: 8999,
      routes: {
        validate: {
          failAction: async (request, h, err) => {
            RestHapi.logger.error(err);
            throw err;
          }
        }
      }
    })

    let config = {
      appTitle: 'MyAPI',
      enableTextSearch: true,
      logRoutes: true,
      docExpansion: 'none',
      swaggerHost: 'localhost:8080',
      enableSwaggerUI: true,
      mongo: {
        URI: 'mongodb://localhost:27017/testAPI',
      },
    }

    await server.register({
      plugin: RestHapi,
      options: {
        mongoose: mongoose,
        config: config,
      },
    })

    await server.start()

    RestHapi.logUtil.logActionComplete(RestHapi.logger, 'Server Initialized', server.info)

    return server
  } catch (err) {
    console.log('Error starting server:', err)
  }

}

module.exports = APIServer()
