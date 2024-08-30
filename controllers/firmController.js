
const Firm = require("../models/Firm");
const Vendor =require("../models/vendor");
const multer = require("multer");


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null, 'uploads/')
    },
    filename:function(req,file,cb){
        cb(null,Date.now() + Path2D.extname(file.originalname) );
    }
})

const uploads = multer({storage:storage})


const addFirm = async(req,res)=>{
    console.log(req.vendorId)
   
    try{
        const {firstname, area, category, region, offer}= req.body

    const image= req.file? req.file.filename :undefined;

   

    const vendor = await Vendor.findById(req.vendorId)
    
    if(!vendor){
        res.status(404).json({message:"Vendor nott found"})

    }

    const newFirm = new Firm ({
        firstname,area,category,region,offer,image,vendor:vendor._id
    })

   
    

     const savedFirm= await newFirm.save();

    vendor.firm.push(savedFirm)

    await vendor.save();


    return res.status(200).json({message:"Firm added successfully"})
    }

    catch(error){
        console.log(error)
       
        return res.status(500).json({error:"Internal server error"})

    }

}

const deleteFirmById =async(req,res)=>{
    try{
        const firmId = req.params.firmId;
        const deletedFirm = await Firm.findByIdAndDelete(firmId)

        if(!deletedFirm){
            return res.status(404).json({error:"No firm found"})
        }

    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})

    }
}

module.exports = {addFirm: [uploads.single('image'), addFirm], deleteFirmById}