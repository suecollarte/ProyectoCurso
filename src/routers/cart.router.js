import {Router} from 'express';
import { CartManager } from '../CartManager.js';
import { ProductManager } from '../ProductManager.js';

const router =Router();


const cartClass = new CartManager;
cartClass.path='./src/cart.json';

const productClass = new ProductManager;
productClass.path='./src/productos.txt';

router.get('/', async (req,res) =>{
  const todo = await cartClass.traeTodoCart(); 
  res.json(todo)
  
})
router.get('/:id', async (request, response) =>{
  const id= request.params.id;
  const cart =  await cartClass.traeCartBy(id);
 
if (!cart) return response.status(404).json({message: `${id} NO EXISTE `})
  response.json(cart)

})

//agrega 
router.post('/', async (request,response) =>{
    const idClient= request.params.id;
    const producto = request.body;
    const cartNuevo= {id, producto};
    await cartClass.addCart(cartNuevo);
    response.status(201).json({message: 'Carro Creado',data: productNuevo}) 
    
    })  
//actualizacion
router.put('/:id', async (request,response) =>{
          const id = request.params.id;
          const data= request.body;
          await cartClass.modificarCart(id, data)
          response.status(201).json({message: 'Carro Actualizado',id})
          
    
})

//eliminacion
router.delete('/:id', async (request,response) =>{
  const id = request.params.id;
  cartClass.borrarCarro(id);
  response.status(201).json({message: 'Cart Borrado',id})
})



export default router