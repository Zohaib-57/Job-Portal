import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
	{
		job: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Job",
			required: true,
		},
		applicant: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		status: {
			type: String,
			enum: ["applied", "interviewed", "offered", "rejected"],
			default: "applied",
		},
	},
	{ timeseries: true }
);

export const Application = mongoose.model("Application", applicationSchema);
// This model defines the structure of the application document in MongoDB.
