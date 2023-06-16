import {Router} from 'express';
import { ProductManager } from '../ProductManager.js';

const router =Router();

//endpoint crear producto
//endpoint leer producto id
//endpoint actualizar productos :id
// agregar producto
// borrar producto

const productClass = new ProductManager;
productClass.path='./src/productos.json';

router.get('/', async (req,res) =>{
    const products = await productClass.traeTodo(); 
    console.log("productos",products)
    res.status(201).json({status:"success", productos:products});
  
  
})
router.get('/:pid', async (request, response) =>{
  const id= request.params.pid;
  try{
     const producto =  await productClass.traeProductsBy(id);
 
      if (!producto) return response.status(404).json({message: `${id} NO EXISTE `})
  //response.json(producto)
      response.send({producto})
  }catch (e) {
    console.error(e)
  }
})
router.post('/', async (request,response) =>{
try{
   const {title,description,code,price,status,stock,category,thumbnails} = request.body;

console.log(request.body);
       const productNuevo= {title,description,code,price,stock,category,thumbnails};
    const regreso= await productClass.addProducto(productNuevo);
    if (regreso){
      response.status(201).json({message: 'Producto Creado',data: productNuevo}) 
    }
    else{
      response.status(201).json({message: 'Producto NO CREADO YA EXISTE',data: productNuevo}) 
        }

    
  }catch (e) {
    console.error(e)
  }  
  })  

    //actualizacion
router.put('/:id', async (request,response) =>{
      try{
          const id = request.params.id;
          const data= request.body;
          await productClass.ModificarProducto(id, data)
          //response.status(201).json({message: 'Producto Actualizado',id})
          response.status(201).send({message: 'Producto Actualizado',id})
      }catch (e) {
    console.error(e)
  }
})

//eliminacion
router.delete('/:id', async (request,response) =>{
  const id = request.params.id;
  productClass.BorrarProducto(id);
  //response.status(201).json({message: 'Producto Borrado',id})
  response.status(201).send({message: 'Producto Borrado',id})
})



export default router