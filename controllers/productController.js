


const Firm = require("../models/Firm");
const Products =require("../models/Products");
const multer = require("multer");
const path =require('path')


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + path.extname(file.originalname) );
    }
})

const uploads = multer({storage:storage})


const addProduct = async(req,res)=>{
   
    try{
        const {productname, price, category, bestSeller, description}= req.body

    const image= req.file? req.file.filename :undefined;

   const firmId = req.params.firmId;

    const firmData = await Firm.findById(firmId)
    
    if(!firmData){
        return res.status(404).json({message:"firm not found"})

    }

    const newProduct = new Products ({
        productname,price,category,bestSeller,image,description,firm:firmData._id
    })

     const savedProduct= await newProduct.save();

    firmData.products.push(savedProduct)

    await firmData.save();


    return res.status(200).json({message:"product added successfully"})
    }

    catch(error){
        console.log(error)
       
        return res.status(500).json({error:"Internal server error"})
    }

}

const getProductByFirm = async(req,res)=>{
    
    try{
        const firmId=req.params.firmId
        const firm=await Firm.findById(firmId)
        if(!firm){
            return res.status(400).json({error:'no firm found'})
        }

        const restaurantName=firm.firstname;
        const products = await Products.find({firm:firmId});
        
        res.status(200).json({restaurantName,products})
        
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})

    }
}

const deleteProductById =async(req,res)=>{
    try{
        const productId = req.params.productId;
        
        const deletedProduct = await Products.findByIdAndDelete(productId)
        console.log(deletedProduct)

        if(!deletedProduct){
            return res.status(404).json({error:"No product found"})
        }

        return  res.status(200).json({message:"product deleted successfully"})

    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
}

module.exports = {addProduct: [uploads.single('image'), addProduct], getProductByFirm, deleteProductById}