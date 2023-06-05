import express from 'express'
import {ProductManager } from './ProductManager.js'
import productoRoute from './routers/producto.router.js'


const app= express();
//app.use(express.json())


// esto es por http
app.get('/', (request,response) =>{
console.log('despliegues')
response.json('<h1>Despliegue </h1>');

})
 
app.use('/producto',productoRoute);




const product = new ProductManager;
product.path='./ejemplo1.txt';
const archivo = product.abreArchivo();
app.get('/:ilimitd', (request,response) =>{

    const ilimitd= request.params.ilimitd;
            
        
    if (ilimitd >0)
    {
       
      response.status(200).json({archivo: archivo.slice(0,ilimitd)})
       
    } 
    else
    {
      response.status(200).json(archivo);
    }
   
})
app.listen(8080, () => console.log('Arriba el servidor'))