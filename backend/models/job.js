const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const JobSchema = new Schema({
	jobId: {
		type: String,
		required: true,
		unique: true
	},
	customerId: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
        maxLength: 50
	},
    description: {
        type: String,
        required: true,
        maxLength: 300
    },
    location: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true  //set a defined price or select negotiable (-100)
    },
    contactNumber: {
        type: String,
        required: true,
        maxLength: 10
    },
    moreInfo: String,
    postedDate: {
        type: Date,
        required: true
    },
    jobState: {
        type: String,   //new, accepted, completed
        required: true
    },
    completedDate: Date,
    lastModifiedDate: {
        type: Date,
        required: true
    },
    serviceProviderID: String
},{
	versionKey: false
})

const Job = mongoose.model("Job", JobSchema);

module.exports = Job;