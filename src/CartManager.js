//import  fs from 'fs';
import fs from 'fs'


export class CartManager{
  constructor(path,cart){
  //this.cuenta=0
  this.path=path
 
  
  }
  static cart=[]
  

generaIDCarro = () => (this.cart.length === 0) ? 1: this.cart[this.cart.length -1].IdCarro +1

traeTodoCart = async () => {
  try{  
     
      this.cart= await fs.promises.readFile(this.path,'utf-8');
      console.log(this.cart);
       
      const datos = JSON.parse(this.cart);
      return datos; 
  }
  catch (error){
    console.log(error)
  }

}


encuentraCodigo = async(Codigo,id) =>{
  //const todo= this.cart;
  try{
      if (id >1)
      {
          const p1= await this.cart.find(element => element.codigo === Codigo );
          if(p1 != undefined)
          {
            console.log("no es posible ya existe codigo",p1.codigo);
            return false
          }
          
      }
      return true
}
catch(error){
     console.log(error)
}
}

addCart = async(idcliente,product)=>{
        
  try{
          let id=product['id'];
          this.cart= await this.traeTodoCart(); 
          
          let idClient = await this.generaIDCarro(); 
         
          if (this.encuentraCodigo(idClient,id))
          {
          product['id']=id;
          this.cart.push({idCliente:idClient, productos:product});
          fs.promises.writeFile(this.path, JSON.stringify(this.cart), (error) => {
              if (error)
                return console.log("error");
            }); 
          }
  }
  catch(error){
    console.log(error);
  }

 }


traeCartBy = async(id) =>
 {

      try{
          const paso= await this.traeTodo();
          const cart =  paso.find((item) => item.IdCarro == id);
         
          if(cart === undefined)
          { 
            return false
          }

          else
          { 
            //console.log (cart);
          return cart;
          }
          
          

    }
    catch(error){
      console.log(error);
    }
 }

 borrarCart = async(id) =>{
  try{
    let archivo1 =   await this.traeTodo();
    
    archivo1 = archivo1.filter(item => item.IdCarro !=id);
    await fs.promises.writeFil<e(this.path,JSON.stringify(archivo1,null,2));
              
      
  }
  catch(error){
    console.log(error);
    
  }

 }


modificarCart = async(id,data) =>{
  try{

    let archivo= await this.traeTodo(); 
    const prodIndex = archivo.findIndex(item => item.IdCarro == id)
    archivo[prodIndex]={ ...archivo[prodIndex], ...data }
    await  fs.promises.writeFile(this.path,JSON.stringify(archivo,null,2));
      
          

  }
  catch(error){
    console.log(error);
  }

 }
}

