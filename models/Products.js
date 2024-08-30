
const mongoose=require("mongoose")

const productSchema=new mongoose.Schema({
    productname:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true
    },
    category:{
        type:[
            {
                type:String,
                enum:['veg','non-veg']
            }
        ], 
    },
    bestSeller:{
        type:String,
    },
    description:{
        type:String,

    },
    image:{
        type:String,
    },
    firm:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'vendor'
        }
    ]
})

const Product = mongoose.model('Product',productSchema)

module.exports = Product