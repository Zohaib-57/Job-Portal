import Job from "../models/jobModel.js";

export const postJob = async (req, res) => {
	try {
		const {
			title,
			description,
			requirments,
			salary,
			location,
			jobType,
			experience,
			position,
			companyid,
		} = req.body;
		const userId = req.id;
		if (
			!title ||
			!description ||
			!requirments ||
			!salary ||
			!location ||
			!jobType ||
			!experience ||
			!position ||
			!companyid
		) {
			return res
				.status(400)
				.json({ message: "All fields are required", success: false });
		}
		const job = await Job.create({
			title,
			description,
			requirments: requirments.split(","),
			salary,
			location,
			jonType: jobType,
			expericenLevel: experience,
			position,
			company: companyid,
			created_by: userId,
		});

		return res.status(201).json({
			message: "Job posted successfully",
			job,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getAllJobs = async (req, res) => {
	try {
		const keyword = req.query.keyword || "";
		const query = {
			$or: [
				{
					title: {
						$regex: keyword,
						$options: "i",
					},
				},
			],
		};
		const jobs = await Job.find(query)
			.populate({ path: "company" }) // lowercase "company" to match the schema

			.sort({ createdAt: -1 });
		if (!jobs) {
			return res.status(404).json({ message: "No jobs found", success: false });
		}
		return res.status(200).json({
			message: "Jobs fetched successfully",
			jobs,
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal server error", success: false });
	}
};

export const getJobById = async (req, res) => {
	try {
		const jobId = req.params.id;
		const job = await Job.findById(jobId);
		if (!job) {
			return res.status(404).json({ message: "Job not found", success: false });
		}
		return res.status(200).json({
			message: "Job fetched successfully",
			job,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};

// admin panel

export const getAdminJobs = async (req, res) => {
	try {
		const adminId = req.id;
		const jobs = await Job.find({ created_by: adminId })
			.populate("company", "name")
			.populate("created_by", "name");

		if (!jobs || jobs.length === 0) {
			return res.status(404).json({ message: "No jobs found", success: false });
		}
		return res.status(200).json({
			message: "Jobs fetched successfully",
			jobs,
			success: true,
		});
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ message: "Internal server error", success: false });
	}
};
export const deleteJob = async (req, res) => {};
