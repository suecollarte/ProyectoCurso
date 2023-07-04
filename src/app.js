import express from 'express'
import handlebars from 'express-handlebars'

import productoRoute from './routers/producto.router.js'
import cartRoute from './routers/cart.router.js'
import mongoose from 'mongoose'
//import viewproduct from "./routers/views.router.js"
const MONGOURI = 'mongodb+srv://admin:admin@cluster0.hjgxmmk.mongodb.net/';
const MONGODB = 'ecommerce';
const app= express();
app.use(express.json());
//para poder recibir lo del cliente los json
app.use(express.urlencoded({extended:true}))
//para recibir formularios por donde llegan los datos

// esto es por http
app.get('/', (request,response) =>{
console.log('despliegues')
response.json('<h1>Despliegue </h1>');

})
//para la interfaz
app.use(express.static('./src/public'))

app.engine('handlebars', handlebars.engine({
    defaultLayout:'main',
    layoutDir:'./src/views/layouts',
    partialsDir:'./src/views/partials'
})
)
app.set('views', './src/views')
app.set('view engine', 'handlebars')



app.use('/api/products',productoRoute);
app.use('/api/carts',cartRoute);

//app.use('productos',viewproduct)

//esta es una promesa
// por eso se trabaja asi...
mongoose.set('strictQuery',false);

try{
    await mongoose.connect(MONGOURI+MONGODB,{
        useUnifiedTopology:true})
    app.listen(8080, () => console.log('Arriba el servidor'))
    }
catch(err){
    console.log(err.message)
}


