import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "../../utils/constant";

const Signup = () => {
	const [input, setInput] = useState({
		fullname: "",
		email: "",
		phoneNumber: "",
		password: "",
		role: "",
		file: null,
	});
	const navigate = useNavigate();

	const changeEventHandler = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const changeFileHandler = (e) => {
		setInput({ ...input, file: e.target.files?.[0] });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append("fullname", input.fullname);
		formData.append("email", input.email);
		formData.append("phoneNumber", input.phoneNumber);
		formData.append("password", input.password);
		formData.append("role", input.role);
		if (input.file) {
			formData.append("file", input.file);
		}
		try {
			const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
				headers: {
					"Content-Type": "multipart/form-data",
				},
				withCredentials: true,
			});
			if (res.data.success) navigate("/login");
			{
				toast.success(res.data.message);
			}
		} catch (error) {
			console.log(error);
			toast.error(error.response.data.message);
		}
	};

	return (
		<div>
			<Navbar />
			<div className="flex items-center justify-center max-w-4xl mx-auto px-4">
				<form
					onSubmit={submitHandler}
					className="w-full md:w-2/3 lg:w-1/2 border border-gray-300 rounded-lg shadow-md p-6 my-10 bg-white"
				>
					<h1 className="font-bold text-2xl mb-6 text-center text-gray-700">
						Sign Up
					</h1>
					<div className="space-y-4">
						<div>
							<Label>Full Name</Label>
							<Input
								type="text"
								name="fullname"
								value={input.fullname}
								onChange={changeEventHandler}
								placeholder="Enter full name"
							/>
						</div>
						<div>
							<Label>Email</Label>
							<Input
								type="email"
								name="email"
								value={input.email}
								onChange={changeEventHandler}
								placeholder="email@example.com"
							/>
						</div>
						<div>
							<Label>Phone Number</Label>
							<Input
								type="text"
								name="phoneNumber"
								value={input.phoneNumber}
								onChange={changeEventHandler}
								placeholder="92 123456789"
							/>
						</div>
						<div>
							<Label>Password</Label>
							<Input
								type="password"
								name="password"
								value={input.password}
								onChange={changeEventHandler}
								placeholder="password"
							/>
						</div>

						<div className="flex gap-6 mt-4">
							<label className="flex items-center gap-2">
								<Input
									type="radio"
									name="role"
									value="student"
									checked={input.role === "student"}
									onChange={changeEventHandler}
								/>
								<span>Student</span>
							</label>
							<label className="flex items-center gap-2">
								<Input
									type="radio"
									name="role"
									value="recruiter"
									checked={input.role === "recruiter"}
									onChange={changeEventHandler}
								/>
								<span>Recruiter</span>
							</label>
						</div>

						<div className="mt-4">
							<Label>Profile Picture</Label>
							<Input
								type="file"
								accept="image/*"
								onChange={changeFileHandler}
								className="cursor-pointer mt-1"
							/>
						</div>

						<Button type="submit" className="w-full mt-6">
							Signup
						</Button>
						<p className="text-center text-sm mt-4">
							Already have an account?{" "}
							<Link to="/login" className="text-blue-600 hover:underline">
								Login
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
