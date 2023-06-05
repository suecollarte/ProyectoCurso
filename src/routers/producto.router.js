import {Router} from 'express';
import { ProductManager } from '../ProductManager.js';

const router =Router();

//endpoint crear producto
//endpoint leer producto id
//endpoint actualizar productos :id
// agregar producto
// borrar producto

const productoClass = new ProductManager;
productoClass.path='./ejemplo1.txt';
const archivo = productoClass.abreArchivo(); 


router.get('/', (req,res) =>{
  res.json(archivo)
  //console.log("Archivo productos:",archivo);
})
router.get('/:id', async (request, response) =>{
  const id= request.params.id;
 // const producto = archivo.find(item => item.id == id)
 
const producto =  await productoClass.traeProductsBy(id);
console.log(producto);
if (!producto) return response.status(404).json({message: `${id} NO EXISTE `})
  response.json(producto)

})
router.post('/', (request,response) =>{
     const {id, codigo, title} = request.body;
    if(!id ||!codigo || !title){
      return request.status(400).json({error:'Campos no correspo0nden'})
    }
    const productNuevo= {id, codigo, title};
    archivo.push (productNuevo);
    response.status(201).json({message: 'Producto Creado',data: Archivo})
    
    })  
//actualizacion
router.put('/:id', (request,response) =>{
     // const id=2;
          //const id = request.params.id;
          const {id, codigo, title} = request.query;
          const data= request.body
          const prodIndex = archivo.findIndex(item => item.id == id)
          if(!id ||!codigo || !title){
            return request.status(400).json({error:'Campos no correspo0nden'})
          }
          const productNuevo= {id, codigo, title};
          archivo.push (productNuevo);
          response.status(201).json({message: 'Producto Creado',data: archivo})
          
    //res.json({message :`lista de productos con id=${id}`})
})



export default router