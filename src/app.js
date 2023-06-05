import express from 'express'
import {ProductManager } from './ProductManager.js'
import productoRoute from './routers/producto.router.js'


const app= express();
app.use(express.json())


// esto es por http
app.get('/', (request,response) =>{
console.log('despliegues')
response.json('<h1>Despliegue </h1>');

})
 
app.use('/producto',productoRoute);

app.listen(8080, () => console.log('Arriba el servidor'))