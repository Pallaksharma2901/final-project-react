import React, { useState, useEffect } from "react"
import { Formik, Form, Field } from "formik"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { getDatabase, ref, get, push } from "firebase/database"
import app from "../firebaseConfig"

const AddAttendance = () => {
	const [employeeNames, setEmployeeNames] = useState([])
	const [selectedDate, setSelectedDate] = useState(new Date())
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchEmployeeNames = async () => {
			try {
				const db = getDatabase(app)
				const employeeRef = ref(db, "employee")

				const snapshot = await get(employeeRef)
				if (snapshot.exists()) {
					const data = snapshot.val()
					const names = Object.values(data).map((employee) => employee.fname + " " + employee.lname)
					console.log(names)
					setEmployeeNames(names)
				}
				setLoading(false)
			} catch (error) {
				console.error("Error fetching employee names:", error)
			}
		}

		fetchEmployeeNames()
	}, [])

	const handleSubmit = async (values, { resetForm }) => {
		try {
			const db = getDatabase(app)
			const attendanceRef = ref(db, "attendance")

			const attendanceData = {
				date: selectedDate.toISOString().split("T")[0],
				employeeAttendance: {},
			}

			employeeNames.forEach((employeeName) => {
				attendanceData.employeeAttendance[employeeName] = values[employeeName] ? "present" : "absent"
			})

			await push(attendanceRef, attendanceData)

			console.log("Attendance data submitted successfully!")

			// Reset the form upon successful submission
			resetForm()
		} catch (error) {
			console.error("Error submitting attendance data:", error)
		}
	}

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<div>
			<div className="text-center my-10">
				<h1 className="text-2xl font-bold text-gray-900">Add Attendance</h1>
			</div>
			<div className="container m-auto flex justify-center">
				<div className="w-[500px] p-6 bg-slate-100 shadow-lg rounded-md flex justify-center">
					<Formik initialValues={employeeNames.reduce((acc, name) => ({ ...acc, [name]: "" }), {})} onSubmit={handleSubmit}>
						{({ isSubmitting }) => (
							<Form className="w-full">
								<div className="mb-4 w-full">
									<label className="block text-gray-700 text-xl font-bold mb-2">Select Date</label>
									<DatePicker
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										selected={selectedDate}
										onChange={(date) => setSelectedDate(date)}
									/>
								</div>
								{employeeNames.map((name) => (
									<div key={name} className="mb-4">
										<Field type="checkbox" name={name} id={name} className="mr-2 leading-tight size-4" />
										<label htmlFor={name} className="text-gray-700">
											{name}
										</label>
									</div>
								))}
								<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
									{isSubmitting ? "Submitting..." : "Submit"}
								</button>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</div>
	)
}

export default AddAttendance
