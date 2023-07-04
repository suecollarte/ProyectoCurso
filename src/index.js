import mongoose from "mongoose"
import userModel from "../index01/models/user.model.js"

const uri = 'mongodb://localhost:27017/'
//top-level await
//cuando es modulo no necesito async
//console.log('hola',uri)
try{
    
    //const main = async() => {
        await mongoose.connect(uri, {
            dbName: 'analiza'
        })
    console.log('DB connected!')
    //const response = await userModel.find().explain('executionStats')
//}
}catch(err){
    console.log(err.message)
} 
/* const main = async() => {
    await mongoose.connect(uri, {
        dbName: 'analiza'
    })
    console.log('DB connected!')
} 

main()*/

   
    


//main()