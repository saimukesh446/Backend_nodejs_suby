
const firmController = require("../controllers/firmController")
const express = require("express")
const verifyToken=require("../middleware/verifyToken")


const router = express.Router()

router.post("/addFirm", verifyToken, firmController.addFirm)
router.delete("/:firmId",firmController.deleteFirmById)

router.get("/uploads/:imageName", (req,res)=>{
    const imageName = req.params.imageName;
    res.headerSent("Content-Type","image/jpg");
    res.sendFile(path.join(__dirname,'--','uploads',imageName));
    
})

module.exports = router;