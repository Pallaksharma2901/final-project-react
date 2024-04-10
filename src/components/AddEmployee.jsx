import React, { useEffect, useState } from "react"
import { getDatabase, push, ref, onValue } from "firebase/database"
import app from "../firebaseConfig"
import { useNavigate } from "react-router-dom"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const AddEmployee = () => {
	const [departments, setDepartments] = useState([])

	useEffect(() => {
		const db = getDatabase(app)
		const departmentsRef = ref(db, "department") // Reference to the 'department' node in the database

		onValue(departmentsRef, (snapshot) => {
			const data = snapshot.val()
			if (data) {
				const departmentList = Object.values(data).map((department) => department.name)
				setDepartments(departmentList)
			} else {
				setDepartments([])
			}
		})
	}, [])

	const navigate = useNavigate()

	return (
		<div className="pb-10">
			<div className="mx-auto bg-white my-10 text-center">
				<h1 className="text-2xl font-bold text-gray-900">Add Employee</h1>
			</div>
			<div className="container m-auto flex justify-center">
				<div className="w-9/12 p-6 bg-slate-100 shadow-lg rounded-md">
					<Formik
						initialValues={{
							fname: "",
							lname: "",
							department: "",
							email: "",
							phone: "",
							address: "",
							dob: "",
							joiningdate: "",
						}}
						validationSchema={Yup.object({
							fname: Yup.string().required("First name is required"),
							lname: Yup.string().required("Last name is required"),
							department: Yup.string().required("Department name is required"),
							email: Yup.string().required("Email is required"),
							phone: Yup.string().required("Phone number is required"),
							address: Yup.string().required("Address is required"),
							dob: Yup.string().required("DOB is required"),
							joiningdate: Yup.string().required("Joining date is required"),
						})}
						onSubmit={async (values, { setSubmitting }) => {
							try {
								setSubmitting(true)
								const db = getDatabase(app)
								await push(ref(db, "employee/"), {
									fname: values.fname,
									lname: values.lname,
									department: values.department,
									email: values.email,
									phone: values.phone,
									address: values.address,
									dob: values.dob,
									joiningdate: values.joiningdate,
								})
								navigate("/employeelist")
							} catch (error) {
								console.error("Error:", error)
							} finally {
								setSubmitting(false)
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form>
								<div>
									<div className="flex flex-col gap-3 md:flex-row mb-4">
										<div className="w-full md:w-1/2">
											<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
												First Name
											</label>
											<Field
												type="text"
												name="fname"
												id="fname"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											/>
											<ErrorMessage name="fname" component="div" className="text-red-500" />
										</div>
										<div className="w-full md:w-1/2">
											<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
												Last Name
											</label>
											<Field
												type="text"
												name="lname"
												id="lname"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											/>
											<ErrorMessage name="lname" component="div" className="text-red-500" />
										</div>
									</div>
									<div className="flex flex-col gap-3 md:flex-row mb-4">
										<div className="w-full md:w-1/2">
											<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
												Department
											</label>
											<Field
												as="select"
												name="department"
												id="department"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											>
												<option disabled>Select Department</option>
												{departments.map((department, index) => (
													<option key={index} value={department}>
														{department}
													</option>
												))}
											</Field>

											<ErrorMessage name="department" component="div" className="text-red-500" />
										</div>
										<div className="w-full md:w-1/2">
											<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
												Email
											</label>
											<Field
												type="email"
												name="email"
												id="email"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											/>
											<ErrorMessage name="email" component="div" className="text-red-500" />
										</div>
									</div>
									<div className="flex flex-col gap-3 md:flex-row mb-4">
										<div className="w-full md:w-1/2">
											<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
												Phone number
											</label>
											<Field
												type="text"
												name="phone"
												id="phone"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											/>
											<ErrorMessage name="phone" component="div" className="text-red-500" />
										</div>
										<div className="w-full md:w-1/2">
											<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
												Address
											</label>
											<Field
												type="text"
												name="address"
												id="address"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											/>
											<ErrorMessage name="address" component="div" className="text-red-500" />
										</div>
									</div>
									<div className="flex flex-col gap-3 md:flex-row mb-4">
										<div className="w-full md:w-1/2">
											<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
												DOB
											</label>
											<Field
												type="date"
												name="dob"
												id="dob"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											/>
											<ErrorMessage name="dob" component="div" className="text-red-500" />
										</div>
										<div className="w-full md:w-1/2">
											<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
												Joining Date
											</label>
											<Field
												type="date"
												name="joiningdate"
												id="joiningdate"
												className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
											/>
											<ErrorMessage name="joiningdate" component="div" className="text-red-500" />
										</div>
									</div>
									<div>
										<button type="submit" className="bg-blue-500 hover:bg-blue-700 mt-5 text-white font-bold h-10 px-4 w-full rounded focus:outline-none focus:shadow-outline">
											{isSubmitting ? "Submitting..." : "Submit"}
										</button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default AddEmployee
