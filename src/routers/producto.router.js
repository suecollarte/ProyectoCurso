import {Router} from 'express';
import { ProductManager } from '../ProductManager.js';

const router =Router();

//endpoint crear producto
//endpoint leer producto id
//endpoint actualizar productos :id
// agregar producto
// borrar producto

const productoClass = new ProductManager;
productoClass.path='./src/ejemplo1.txt';

router.get('/', async (req,res) =>{
  const todo = await productoClass.traeTodo(); 
  res.json(todo)
  
})
router.get('/:id', async (request, response) =>{
  const id= request.params.id;
  const producto =  await productoClass.traeProductsBy(id);
 
if (!producto) return response.status(404).json({message: `${id} NO EXISTE `})
  response.json(producto)

})
router.post('/', async (request,response) =>{
    const {id, codigo, title} = request.body;
    const archivo= await productoClass.traeTodo(); 
    const productNuevo= {id, codigo, title};
    archivo.push (productNuevo);
    response.status(201).json({message: 'Producto Creado',data: productNuevo}) 
    
    })  
//actualizacion
router.put('/:id', async (request,response) =>{
     // const id=2;
          //const id = request.params.id;
          const id = request.params.id;
          const data= request.body;
          const archivo= await productoClass.traeTodo(); 
          const prodIndex = archivo.findIndex(item => item.id == id)
          archivo[prodIndex]={ ...archivo[prodIndex], ...data }
          
          response.status(201).json({message: 'Producto Actualizado',data: archivo})
          
    //res.json({message :`lista de productos con id=${id}`})
})

//eliminacion
router.delete('/:id', async (request,response) =>{
  const id = request.params.id;
  const borrado= await productoClass.BorrarProducto(id);
  response.status(201).json({message: 'Producto Borrado',id})
})



export default router