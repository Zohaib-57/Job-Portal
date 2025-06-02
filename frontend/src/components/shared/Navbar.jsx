import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
	const user = false;
	return (
		<div className="bg-[#1E201E] px-6">
			<div className="flex items-center justify-between mx-auto max-w-7xl h-16">
				<div>
					<h1 className="text-3xl font-bold text-[#ECDFCC]">
						Job <span className="text-[#f39d2d]">Portal</span>
					</h1>
				</div>
				<div className="flex items-center gap-12">
					<ul className="flex font-medium items-center gap-5 text-[#DFD0B8]">
						<li className="hover:text-[#f39d2d] cursor-pointer">Home</li>
						<li className="hover:text-[#f39d2d] cursor-pointer">Career</li>
						<li className="hover:text-[#f39d2d] cursor-pointer">Browser</li>
					</ul>
					{!user ? (
						<div className="flex items-center gap-3">
							<Button
								variant="outline"
								className="hover:text-[#f39d2d cursor-pointer"
							>
								Login
							</Button>
							<Button className="text-[#ECDFCC] hover:text-[#f39d2d cursor-pointer">
								Signup
							</Button>
						</div>
					) : (
						<Popover>
							<PopoverTrigger asChild>
								<Avatar className="cursor-pointer">
									<AvatarImage src="https://github.com/shadcn.png" />
								</Avatar>
							</PopoverTrigger>
							<PopoverContent className="w-88 p-4 space-y-4">
								<div className="flex gap-4 items-center">
									<Avatar className="cursor-pointer">
										<AvatarImage src="https://github.com/shadcn.png" />
									</Avatar>
									<div>
										<h4 className="font-medium">Zohaib Abbas MERN Stack</h4>
										<p className="text-sm text-muted-foreground">
											Lorem ipsum dolor sit amet consectetur.
										</p>
									</div>
								</div>
								<div className="flex flex-col my-2 text-gray-600">
									<div className="flex w-fit items-center gap-2 cursor-pointer">
										<Button variant="link" className="px-3 py-3 text-sm">
											<User2 />
											View Profile
										</Button>
									</div>
									<div className="flex w-fit items-center gap-2 cursor-pointer">
										<Button variant="link" className="px-3 py-3 text-sm">
											<LogOut />
											Logout
										</Button>
									</div>
								</div>
							</PopoverContent>
						</Popover>
					)}
				</div>
			</div>
		</div>
	);
};

export default Navbar;
