import express from "express";

import isAuthenticated from "../middleware/isAuthenticated.js";
import {
	applyJob,
	getApplicants,
	getApplications,
	updateApplicationStatus,
} from "../controllers/applicationController.js";

const router = express.Router();
router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/getappliedjobs").get(isAuthenticated, getApplications);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router
	.route("/status/:id/update")
	.post(isAuthenticated, updateApplicationStatus);

export default router;
