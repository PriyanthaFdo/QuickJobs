const router = require("express").Router();

let customer = require("../models/customer");



router.route("/add").post((req, res)=>{

    
    const name = req.body.name;
    const mobile = Number(req.body.mobile);
    const address = req.body.address;
   
    const newCustomer = new customer({
        name,
        mobile,
        address
    })

    //JS Promise
    newCustomer.save().then(()=>{
        res.json("customer Added")
    }).catch((err)=>{
        console.log(err);//catch the error and display
    })

})


router.route("/display").get((req, res)=>{

    customer.find().then((cusReg)=>{
        res.json(cusReg)
    }).catch((err)=>{
        console.log(err)
    }
)
})


//creating route for upadate one SP's data
router.route("/update/:id").put(async (req, res) => {

    
    //creating a varibale to store the id/fetch the id
    let cusId = req.params.id;

    const {name,  mobile, address}= req.body;
   
    
    const updateCustomer = {
        
        name,
        mobile,
        address
        
        
    }
    
    const update = await customer.findByIdAndUpdate(cusId, updateCustomer)
    .then(()=>{
        
    res.status(200).send({status: "Customer updated"})
    
}).catch((err)=>{
    console.log(err);
    res.status(500).send({status:"error with updating data", error: err.message});
})
 })


  //delete Item delete
router.route("/delete/:id").delete(async (req, res) => {
    let cusId = req.params.id;

    await customer.findByIdAndDelete(cusId)
    .then(()=>{
        console.log();
        res.status(200).send({status: "Customer deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with delete Customer", error: err.message});
    })
})

//get details of one Item
router.route("/get/:id").get(async (req, res)=>{
    let cusId = req.params.id;
    const customerOne = await customer.findById(cusId)
    .then((customer)=> {
        console.log();
        res.status(200).send({status: "User fetched", customer})
    }).catch((err)=> {
        console.log(err);
        res.status(500).send({status: "Error with get Item", error:err.message})
    })
})


module.exports = router;