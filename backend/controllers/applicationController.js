import { application } from "express";
import { Application } from "../models/applicationModel.js";
import Job from "../models/jobModel.js";

export const applyJob = async (req, res) => {
	try {
		const userId = req.id;
		const jobId = req.params.id;
		if (!jobId) {
			return res.status(400).json({
				message: "Job ID is required",
				success: false,
			});
		}
		const existingApplication = await Application.findOne({
			job: jobId,
			applicant: userId,
		});
		if (existingApplication) {
			return res.status(400).json({
				message: "You have already applied for this job",
				success: false,
			});
		}
		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(404).json({
				message: "Job not  Found",
				success: false,
			});
		}
		const application = await Application.create({
			job: jobId,
			applicant: userId,
		});
		job.applications.push(application._id);
		await job.save();

		return res.status(201).json({
			messgae: "Application submitted successfully",
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getApplications = async (req, res) => {
	try {
		const userId = req.id;
		const application = await Application.find({
			applicant: userId,
		})
			.sort({ createdAt: -1 })
			.populate({
				path: "job",
				options: { sort: { createdAt: -1 } },
				populate: { path: "company", options: { sort: { cretaedAt: -1 } } },
			});
		if (!application) {
			return res.status(404).json({
				message: "No applications found",
				success: false,
			});
		}
		return res.status(200).json({
			message: "Applications fetched successfully",
			success: true,
			applications: application,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getApplicants = async (req, res) => {
	try {
		const jobId = req.params.id;

		const job = await Job.findById(jobId).populate({
			path: "applications",
			options: { sort: { createdAt: -1 } },
			populate: {
				path: "applicant", // NOT "applicants"
				options: { sort: { createdAt: -1 } },
			},
		});

		if (!job) {
			return res.status(404).json({
				message: "Job not found",
				success: false,
			});
		}

		return res.status(200).json({
			job,
			applications: job.applications,
			success: true,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: "Server error" });
	}
};

export const updateApplicationStatus = async (req, res) => {
	try {
		const jobStatus = req.body;
		const applicationId = req.params.id;
		if (!jobStatus) {
			return res.status(400).json({
				message: "Job status is required",
				success: false,
			});
		}

		const application = await Application.findByIdAndUpdate({
			_id: applicationId,
		});
		if (!application) {
			return res.status(404).json({
				message: "Application not found",
				success: false,
			});
		}
		application.status = jobStatus.status;
		await application.save();

		return res.status(200).json({
			message: "Application status updated successfully",
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};
