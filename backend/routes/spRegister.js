const router = require("express").Router();

let serviceProvider = require("../models/spRegister");



router.route("/add").post((req, res)=>{

    
    const name = req.body.name;
    const mobile = Number(req.body.mobile);
    const address = req.body.address;
    const serviceType = req.body.serviceType;

    const newSPrivder = new serviceProvider({
        name,
        mobile,
        address,
        serviceType
    })

    //JS Promise
    newSPrivder.save().then(()=>{
        res.json("Service Added")
    }).catch((err)=>{
        console.log(err);//catch the error and display
    })

})


router.route("/display").get((req, res)=>{

    serviceProvider.find().then((spReg)=>{
        res.json(spReg)
    }).catch((err)=>{
        console.log(err)
    }
)
})


//creating route for upadate one SP's data
router.route("/update/:id").put(async (req, res) => {

    
    //creating a varibale to store the id/fetch the id
    let spId = req.params.id;

    const {name,  mobile, address, serviceType}= req.body;
   
    
    const updateSProvider = {
        
        name,
        mobile,
        address,
        serviceType
        
        
    }
    
    const update = await serviceProvider.findByIdAndUpdate(spId, updateSProvider)
    .then(()=>{
    res.status(200).send({status: "Service Provider updated"})
    
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"error with updating data", error: err.message});
})
 })


  //delete Item delete
router.route("/delete/:id").delete(async (req, res) => {
    let spId = req.params.id;

    await serviceProvider.findByIdAndDelete(spId)
    .then(()=>{
        console.log();
        res.status(200).send({status: "Service Provider deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete service provider", error: err.message});
    })
})

//get details of one Item
router.route("/get/:id").get(async (req, res)=>{
    let spId = req.params.id;
    const sProviders = await serviceProvider.findById(spId)
    .then((serviceProvider)=> {
        console.log();
        res.status(200).send({status: "User fetched", serviceProvider})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with get Item", error:err.message})
    })
})


module.exports = router;