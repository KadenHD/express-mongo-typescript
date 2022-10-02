# express-mongo-typescript

A default Express, MongoDB and TypeScript project.

## Start the project

Install the node modules

```txt
npm i
```

Create a .env file at the root of the project :

```txt
MONGO_USERNAME=''
MONGO_PASSWORD=''
MONGO_NAME=''

SERVER_PORT=
```

Run the project in dev mode

```txt
npm run dev
```

Build the project

```txt
npm run build
```

Run the project in prod mode

```txt
npm start
```

Build and Run the project in prod mode

```txt
npm run build:start
```

## Create new Entities

### Link the Snippet on VSCode

Go to :

-   Copy the content of snippets.json at the root of the project
-   Ctrl+Shift+P
-   Snippets: Configure User Snippets
-   typescript.json (TypeScript)
-   Paste everything inside typescript.json

### Add entity

-   Create ts file in src/controllers, type crudmongocontroller and enter, rename each vars
-   Create ts file in src/models, type crudmongomodels and enter, rename each vars
-   Manually add validations, regex etc... in src/middleware/ValidateSchema.ts file
-   Create ts file in src/routes, type crudmongoroutes and enter, rename each vars
-   Add route in src/server.ts file : router.use('/entity', entityRoutes);

> To switch vars, press tab

## To-Do

-   Run on different env, for prod and dev, using different .env files etc... (permit to use one prod db and one test db, independants)
-   Add encrypt and decrypt entity during res and req, using the same methods and keys
