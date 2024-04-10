import React, { useEffect, useState } from "react"
import { getDatabase, ref, onValue, remove } from "firebase/database"
import app from "../firebaseConfig"
import { FaRegEdit } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { useNavigate } from "react-router-dom"

const EmployeeList = () => {
	const [employee, setEmployee] = useState([])
	const navigate = useNavigate()

	useEffect(() => {
		const db = getDatabase(app)
		const employeeRef = ref(db, "employee")

		onValue(employeeRef, (snapshot) => {
			const data = snapshot.val()
			if (data) {
				const employeeList = Object.keys(data).map((key) => ({
					id: key,
					...data[key],
				}))
				setEmployee(employeeList)
			} else {
				setEmployee([])
			}
		})

		return () => {
			setEmployee([])
		}
	}, [])

	const deleteData = (key) => {
		const db = getDatabase(app)
		const employeeRef = ref(db, "employee/" + key)
		remove(employeeRef)
			.then(() => {
				console.log("Employee deleted successfully")
				setEmployee(employee.filter((emp) => emp.id !== key))
			})
			.catch((error) => {
				console.error("Error deleting Employee: ", error)
			})
	}

	return (
		<div>
			<p></p>
			<div>
				<div className="mx-auto bg-white my-10 text-center">
					<h1 className="text-2xl font-bold text-gray-900">Employee List</h1>
				</div>
				<div className="bg-gray-50">
					<div className="mx-auto max-w-screen-xl px-2 py-10">
						<div className="mt-4 w-full">
							<div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
								<form className="relative flex w-full max-w-2xl items-center">
									<svg
										className="absolute left-2 block h-5 w-5 text-gray-400"
										xmlns="http://www.w3.org/2000/svg"
										width={24}
										height={24}
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth={2}
										strokeLinecap="round"
										strokeLinejoin="round"
									>
										<circle cx={11} cy={11} r={8} />
										<line x1={21} y1={21} x2="16.65" y2="16.65" />
									</svg>
									<input
										type="name"
										name="search"
										className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2"
										placeholder="Search by Order ID, Date, Customer"
									/>
								</form>
							</div>
						</div>
						<div className="mt-6 overflow-auto rounded-xl bg-white px-6 shadow lg:px-4">
							{employee && (
								<table className="w-full border-collapse border-spacing-y-2 border-spacing-x-2">
									<thead className="border-b lg:table-header-group">
										<tr>
											<th className="whitespace-normal py-4 text-sm font-semibold text-gray-800 sm:px-3">
												Employee ID
												<svg xmlns="http://www.w3.org/2000/svg" className="float-right mt-1 h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
													<path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
												</svg>
											</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">fname</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">lname</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">department</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">email</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">phone</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">address</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">dob</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">joiningdate</th>
											<th className="whitespace-normal py-4 text-sm font-medium text-gray-500 sm:px-3">Actions</th>
										</tr>
									</thead>
									<tbody className="bg-white lg:border-gray-300">
										{employee.map((employee, idx) => (
											<tr key={employee.id}>
												<td className="whitespace-no-wrap text-center py-4 text-sm text-gray-600 sm:px-3">{idx+1}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{employee.fname}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{employee.lname}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{employee.department}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{employee.email}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{employee.phone}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{employee.address}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{employee.dob}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">{employee.joiningdate}</td>
												<td className="whitespace-no-wrap text-center py-4 text-sm font-normal text-gray-600 sm:px-3 lg:table-cell">
													<div className="flex justify-center">
														<button
															onClick={() => {
																navigate(`/updateemployee/${employee.id}`)
															}}
															className="border border-blue-500 text-xl p-2.5 transition-all bg-blue-600 text-white hover:bg-white hover:text-blue-400"
														>
															<FaRegEdit />
														</button>
														<button
															onClick={() => {
																deleteData(employee.id)
															}}
															className="border border-red-500 text-xl p-2.5 transition-all bg-red-600 text-white hover:bg-white hover:text-red-400"
														>
															<MdDeleteOutline />
														</button>
													</div>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default EmployeeList
