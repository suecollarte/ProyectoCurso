import { cartModel } from '../models/cart.model.js';


export class CartManager{
  constructor(path,cart){
  //this.cuenta=0
  this.path=path
 
  
  }
  static cart=[];
  

traeTodoCart = async () => {
  try{  
     
      this.cart= await cartModel.find()
      return this.cart; 
  }
  catch (error){
    console.error(error);
  }

}

addCart = async(Carrito)=>{
        
  try{       
        const cars = new cartModel(Carrito)
        const result = await cars.save();
          
  }
  catch(error){
    console.error(error);
  }

 }


traeCartBy = async(id) =>
 {

 
  try{
    const carts=  await cartModel.findById(id).lean().exec();
   
    if(cart === null)
    { 
      return false
    }
    else
    { 
    return cart;
    }
}
catch(e){
console.error(e);;
}

   
 }

 borrarCart = async(id) =>{
      try{
        const result = await cartModel.findByIdAndDelete(id)
     if(result== null){
      return false
     }
     const cart = await cartModel.find().lean().exec()
     return cart
                  
          
      }
      catch(error){
        console.error(error);;
        
      }

 }


modificarCart = async(cid, products) =>{
        try{
          const result= await cartModel.findByIdAndUpdate({_id:cid},{
            $set:products})
                

        }
        catch(error){
          console.error(error);;
        }

 }
}

