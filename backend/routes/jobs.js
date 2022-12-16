const router = require("express").Router();
const axios = require("axios");
let Job = require("../models/Job");




//create new Job ID----------------------------------------------------------------------------------------------
router.route("/newID").get(async (req,res) =>{
	await Job.find({}, {jobId: 1, _id: 0}).limit(1).sort({$natural:-1}).then((job)=>{
		let newID = "J0001";
		if(job[0]!=null){
			newID = job[0].jobId;
			newID = newID.substring(1);
			newID = parseInt(newID);
			newID++;
			newID = newID.toString();
			while(newID.length < 4) newID = "0" + newID;
            newID = "J" + newID;
		}		

		res.status(200).send({status: "New Job ID created!", newID});
	}).catch((err)=>{
		console.log(err.message);
		res.status(500).send({status: "Error in creating new Job ID", error: err.message});
	})
})




//add new Job Route----------------------------------------------------------------------------------------------
router.route("/add").post(async (req, res)=>{
    var newId;

    await axios.get('http://localhost:8070/job/newID').then((res)=>{
        newId = res.data.newID;
    })

	const jobId = newId;
	const customerId = req.body.customerId;
    const title = req.body.title;
	const description = req.body.description;
    const location = req.body.location;
    const price = req.body.price;
    const contactNumber = req.body.contactNumber;
    const moreInfo = req.body.moreInfo;
    const postedDate = req.body.postedDate;
    const jobState = req.body.jobState;
    const completedDate = req.body.completedDate;
    const lastModifiedDate = req.body.lastModifiedDate;
    const serviceProviderID = req.body.serviceProviderID;
	
	const newJob = new Job({
		jobId,
		customerId,
        title,
        description,
        location,
        price,
        contactNumber,
        moreInfo,
        postedDate,
        jobState,
        completedDate,
        lastModifiedDate,
        serviceProviderID
	})
	
	await newJob.save().then(()=>{
		res.json("Job Added!");
	}).catch((err)=>{
		console.log(err);
	})
})




//view all Route----------------------------------------------------------------------------------------------
router.route("/").get(async (req,res)=>{
	await Job.find().then((jobs)=>{
		res.json(jobs)
	}).catch((err)=>{
		console.log(err)
	})
})




//update a single job----------------------------------------------------------------------------------------------
router.route("/update/:id").put(async (req,res)=>{
	let jobId = req.params.id;

	const{
		customerId,
        title,
        description,
        location,
        price,
        contactNumber,
        moreInfo,
        postedDate,
        jobState,
        completedDate,
        lastModifiedDate,
        serviceProviderID
	} = req.body;
	
	const updateJob = {
		customerId,
        title,
        description,
        location,
        price,
        contactNumber,
        moreInfo,
        postedDate,
        jobState,
        completedDate,
        lastModifiedDate,
        serviceProviderID
	}
	
	const update = await Job.findByIdAndUpdate(jobId, updateJob).then(()=>{
		res.status(200).send({status: "Job updated!"})
	}).catch((err)=>{
		console.log(err);
		res.status(500).send({status: "Error with updating data", error: err.message});
	});
})





//delete route----------------------------------------------------------------------------------------------
router.route("/delete/:id").delete(async (req,res)=>{
	let jobId = req.params.id;
	
	await Job.findByIdAndDelete(jobId).then(()=>{
		res.status(200).send({status: "Job deleted"});
	}).catch((err)=>{
		console.log(err.message);
		res.status(500).send({status: "Error with deleting Job", error: err.message});
	})
})





//get single job----------------------------------------------------------------------------------------------
router.route("/get/:id").get(async (req,res)=>{
	let jobID = req.params.id;
	
	await Job.findById(jobID).then((job)=>{
		res.status(200).send({status: "Job fetched", job})
	}).catch((err)=>{
		console.log(err.message);
		res.status(500).send({status: "Error with get job", error: err.message});
	})
})


/*
//router to get only ID of orders used for Billing------------------------------------------------------------------------------------
router.route("/getOrderIds").get((req, res)=>{
    Order.find().then((orders)=>{
        let ids = orders.map(val=>val.orderId);
        res.json(ids)
    }).catch((err)=>{
        console.log(err)
    })
})
*/
module.exports = router;