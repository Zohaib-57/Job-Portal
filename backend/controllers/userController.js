import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
	try {
		const { fullname, email, password, phoneNumber, role } = req.body;
		if (!fullname || !email || !password || !phoneNumber || !role) {
			return res.status(400).json({ message: "All fields are required" });
		}
		const user = await User.findOne({
			email,
		});
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);

		await User.create({
			fullname,
			email,
			password: hashedPassword,
			phoneNumber,
			role,
		});
		return res.status(201).json({
			message: "Account created Successfully.",
			success: true,
		});
	} catch (error) {
		console.log("Error in register controller:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};

export const Login = async (req, res) => {
	try {
		const { email, password, role } = req.body;
		if (!email || !password || !role) {
			return res.status(400).json({
				message: "Something is missing",
				success: false,
			});
		}
		const user = await User.findOne({
			email,
		});
		if (!user) {
			return res.status(400).json({
				message: "incorrect email or password",
				success: false,
			});
		}
		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return res.status(400).json({
				message: "Incorrect email or password",
				success: false,
			});
		}
		if (role != user.role) {
			return res.status(400).json({
				message: "Account doesn't exit in current role",
				success: false,
			});
		}

		const tokenData = { userId: user._id };
		const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
			expiresIn: "1d",
		});

		const safeUser = {
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			phoneNumber: user.phoneNumber,
			role: user.role,
			profile: user.profile,
		};

		return res
			.status(200)
			.cookie("token", token, {
				maxAge: 1 * 24 * 60 * 60 * 1000,
				httpOnly: true,
				sameSite: "strict",
			})
			.json({
				message: `Welcome Back ${safeUser.fullname}`,
				safeUser,
				success: true,
			});
	} catch (error) {
		console.log(error.message);
	}
};
export const Logout = async (req, res) => {
	try {
		return res.status(200).cookie("token", "", { maxAge: 0 }).json({
			message: "Logged Out Successfully.",
			success: true,
		});
	} catch (error) {}
};

export const updateProfile = async (req, res) => {
	try {
		const { fullname, email, phoneNumber, bio, skills } = req.body;
		const file = req.file; // Assuming you are using multer for file uploads
		//cloudinary upload
		let skillsArray;
		if (skills) {
			skillsArray = skills.split(",");
		}
		const userId = req.id; //middleware authentication

		let user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				message: "User not found",
				success: false,
			});
		}
		if (fullname) user.fullname = fullname;
		if (email) user.email = email;
		if (phoneNumber) user.phoneNumber = phoneNumber;
		if (bio) user.profile.bio = bio;
		if (skills) user.profile.skills = skillsArray;
		//resume
		await user.save();

		user = {
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			phoneNumber: user.phoneNumber,
			role: user.role,
			profile: user.profile,
		};
		return res.status(200).json({
			message: "Profile updated successfully",
			user,
			success: true,
		});
	} catch (error) {
		console.log(error);
	}
};
