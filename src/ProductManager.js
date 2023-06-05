//import  fs from 'fs';
import fs from 'fs'


export class ProductManager{
  constructor(path,producto){
  //this.cuenta=0
  this.path=path
 
  
  }
  static producto=[]

generaID = () => (this.producto.length === 0) ? 1: this.producto[this.producto.length -1].id +1

traeTodo = async () => {
  try{  
     
      this.producto= await fs.promises.readFile(this.path,'utf-8');
      const datos = JSON.parse(this.producto);
      return datos; 
  }
  catch (error){
    console.log("error trae todo")
  }

}


encuentraCodigo = async(Codigo,id) =>{
  //const todo= this.producto;
  try{
      if (id >1)
      {
          const p1= await this.producto.find(element => element.codigo === Codigo );
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

addproducto=async(product)=>{
        
  try{
          let Codigo=product['codigo'];

          
          this.traeTodo(); 
          let id = this.generaID(); 
         
          if (this.encuentraCodigo(Codigo,id))
          {
          
          product['id']=id;
          console.log("grabando",this.producto); 
           
          this.producto.push(product);
        
          fs.writeFileSync(this.path, JSON.stringify(this.producto), (error) => {
              if (error)
                return console.log("error");
            }); 
          }
  }
  catch(error){
    console.log(error);
  }

 }


traeProductsBy = async(id) =>
 {

      try{
          const paso= await this.traeTodo();
          const producto =  paso.find((item) => item.id == id);
         
          if(producto === undefined)
          { 
            return false
          }

          else
          { 
            //console.log (producto);
          return producto;
          }
          
          

    }
    catch(error){
      console.log(error);
    }
 }

 BorrarProducto = async(id) =>{
  try{
    let archivo1 =   await this.traeTodo();
    
    archivo1 = archivo1.filter(item => item.id !=id);
    await fs.promises.writeFile(this.path,JSON.stringify(archivo1,null,2));
              
      
  }
  catch(error){
    console.log(error);
    
  }

 }


ModificarProducto = async(id,description) =>{
  try{

    if (this.traeTodo()){
         
      const arr=ProductManager.producto.map(function(obj){
          return obj;
      });
      
      let arr2=[];
      
      for(let i=0;i< arr.length;i++)
      {
        
          if(arr[i]['id']==id){
             console.log("revisando item", arr[i]['id']);
             arr[i]['description']=description;
              console.log('modificando',id, "descripcion", description); 
          }
          let productoArray=arr[i];
          arr2.push(productoArray);
         
      }
      ProductManager.producto=arr2;
      
      try {
      
          fs.writeFileSync(this.path,JSON.stringify(ProductManager.producto,null,2));
      
          } 
          catch (err){
      
          console.log('error',err);
      
          }
  
      
        }

  }
  catch(error){
    console.log(error);
  }

 }
}

