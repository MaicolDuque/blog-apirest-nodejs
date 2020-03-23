API REST de un blog con Node JS y mongoose


## Instalar y ejecutar

```bash
# Install
$ npm install

# Run
npm run dev
```
## Uso

El proyecto expone tres endpoint basicos:

- `/api/helloworld` Para testear que nuestro proyecto está funcionando
- `/api/articles` GET, POST
- `/api/articles/:id` PUT, DELETE
- `/api/articles/last/:limit?` GET
- `/api/upload-image/:id` POST
- `/api/get-image/:image` GET
- `/api/search/:search` GET


## Estructura del proyecto MVC
```
blog-apirest-nodejs
├── controllers
|──────|──article.js
|───models
|──────|──article.js
|───routes
|──────|──article.js
|───uploads
|──────|articles
|──────────|──article.js
|──app.js
|──index.js

```

