import mongoose, { Model } from "mongoose";

const jobSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		requirments: [
			{
				type: String,
				required: true,
			},
		],
		salary: {
			type: String,
			required: true,
		},
		location: {
			type: String,
			required: true,
		},
		jonType: {
			type: String,
			required: true,
		},
		position: {
			type: Number,
			required: true,
		},
		company: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Company",
			required: true,
		},
		created_by: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		applications: {
			type: [mongoose.Schema.Types.ObjectId],
			ref: "User",
			default: [],
		},
	},
	{ timestamps: true }
);
export const Job = mongoose.model("Job", jobSchema);
// This model defines the structure of the job document in MongoDB.
