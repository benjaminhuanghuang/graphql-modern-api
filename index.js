const hapi = require('hapi');
const mongoose = require('mongoose');
const Painting = require('./models/Painting');
const mongoURI = "mongodb://admin:admin123@ds233970.mlab.com:33970/graphql-api";

mongoose.connect(mongoURI);
mongoose.connection.once('open', () => {
    console.log('connected to database');
});
// graphQL seciton
const { graphqlHapi, graphiqlHapi } = require('apollo-server-hapi');
const schema = require('./graphql/schema');

/* swagger section */
const Inert = require('inert');
const Vision = require('vision');
const HapiSwagger = require('hapi-swagger');
const Pack = require('./package');

const server = hapi.server({
    port: 8964,
    host: 'localhost'
})

const init = async () => {
    await server.register([
		Inert,
		Vision,
		{
			plugin: HapiSwagger,
			options: {
				info: {
					title: 'Paintings API Documentation',
					version: Pack.version
				}
			}
		}
	]);

    await server.register({
        plugin: graphiqlHapi,
        options: {
            path: '/graphiql',
            graphiqlOptions: {
                endpointURL: '/graphql'
            },
            route: {
                cors: true
            }
        }
    });

    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graphql',
            graphqlOptions: {
                schema
            },
            route: {
                cors: true
            }
        }
    });

    // setup routing: path-method-handler
    server.route([
        {
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                return `<h1>My modern api</h1>`;
            }
        },
        {
            method: 'GET',
            path: '/api/v1/paintings',
            config: {
                description: 'Get all the paintings',
                tags: ['api', 'v1', 'painting']
            },
            handler: (req, reply) => {
                return Painting.find();
            }
        },
        {
            method: 'POST',
            path: '/api/v1/paintings',
            config: {
				description: 'Get a specific painting by ID.',
				tags: ['api', 'v1', 'painting']
			},
            handler: (req, reply) => {
                const { name, url, techniques } = req.payload;
                const painting = new Painting({
                    name,
                    url,
                    techniques
                });

                return painting.save();
            }
        }
    ]);
    await server.start();
    console.log(`Server is running at: ${server.info.uri}`);
};

process.on('unHandledRejection', (err) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
});

init();