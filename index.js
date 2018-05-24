const hapi = require('hapi');
const server = hapi.server({
    port: 8964,
    host: 'localhost'
})

const init = async () => {
    // setup routing: path-method-handler
    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            return `<h1>My Modern api</h1>`;
        }
    });
    await server.start();
    console.log(`Server is running at: ${server.info.uri}`);
};

init();