import React from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
	return (
		<>
			<div className="p-5 bg-indigo-200 flex items-center">
				<div className="container m-auto flex justify-between">
					<div>
						<h1 className="text-3xl font-bold">Employee Management system</h1>
					</div>
					<div className="flex flex-row flex-wrap items-center space-x-5">
						<Link to="/adddepartment" className="text-base sm:text-xl font-semibold text-gray-600 hover:text-gray-900">
							Add Department
						</Link>
						<Link to="/departmentlist" className="text-base sm:text-xl font-semibold text-gray-600 hover:text-gray-900">
							Department List
						</Link>
						<Link to="/addemployee" className="text-base sm:text-xl font-semibold text-gray-600 hover:text-gray-900">
							Add Employee
						</Link>
						<Link to="/employeelist" className="text-base sm:text-xl font-semibold text-gray-600 hover:text-gray-900">
							Employee List
						</Link>
						<Link to="/addattendence" className="text-base sm:text-xl font-semibold text-gray-600 hover:text-gray-900">
							Add Attndence
						</Link>
					</div>
					{/* <Link to="/attendencelist" className="text-base sm:text-xl font-semibold text-gray-600 hover:text-gray-900">
									Attendence List
								</Link> */}
				</div>
			</div>
		</>
	)
}

export default Navbar
