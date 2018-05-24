const hapi = require('hapi');
const server = hapi.server({
    port: 8964,
    host: 'localhost'
})

const init = async () => {
    // setup routing: path-method-handler
    server.route({
        method: 'GET',
        paht: '/',
        handler: function (request, reply) {
            return `<h1>Hi, Hapi</h1>`;
        }
    });
    await server.start();
    console.log(`Server is running at: ${server.info.uri}`);
};

init();