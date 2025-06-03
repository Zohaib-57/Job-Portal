import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { USER_API_END_POINT } from "../../utils/constant";

const Login = () => {
	const [input, setInput] = useState({
		email: "",
		password: "",
		role: "",
	});

	const changeEventHandler = (e) => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
				headers: {
					"Content-Type": "application/json",
				},
				withCredentials: true,
			});
			if (res.data.success) navigate("/");
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
						Login
					</h1>
					<div className="space-y-4">
						<div>
							<Label>Email</Label>
							<Input
								type="email"
								value={input.email}
								name="email"
								onChange={changeEventHandler}
								placeholder="email123@gmail.com"
							/>
						</div>
						<div>
							<Label>Password</Label>
							<Input
								type="password"
								value={input.password}
								name="password"
								onChange={changeEventHandler}
								placeholder="password"
							/>
						</div>
						<div className="flex gap-6 mt-4">
							<label className="flex items-center gap-2">
								<Input
									type="radio"
									name="role"
									checked={input.role === "student"}
									onChange={changeEventHandler}
									value="student"
								/>
								<span>Student</span>
							</label>
							<label className="flex items-center gap-2">
								<Input
									type="radio"
									name="role"
									checked={input.role === "recruiter"}
									onChange={changeEventHandler}
									value="recruiter"
								/>
								<span>Recruiter</span>
							</label>
						</div>
						<Button type="submit" className="w-full mt-6">
							Login
						</Button>
						<p className="text-center text-sm mt-4">
							Don't have an account?{" "}
							<Link to="/signup" className="text-blue-600 hover:underline">
								Signup
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
