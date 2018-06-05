## Setup graphql at server side
```
    npm i graphql apollo-server-hapi -S
```
- graphql is the main package for graphql 
- apollo-server-hapi is the glue between our hapi server and graphql


## Register
```
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

```

