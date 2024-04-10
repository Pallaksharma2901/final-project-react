import React from "react"
import { getDatabase, ref, set } from "firebase/database"
import app from "../firebaseConfig"
import { useNavigate, useParams } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

const UpdateDepartment = () => {
	const navigate = useNavigate()
	const { id } = useParams();

	return (
		<>
			<div className="mx-auto mt-10 bg-white text-center">
				<h1 className="text-2xl font-bold text-gray-900">Update Department</h1>
			</div>
			<div className="container m-auto flex justify-center">
				<div className="w-[500px] p-6 bg-slate-100 shadow-lg rounded-md mt-10 flex justify-center">
					<Formik
						initialValues={{
							department: "",
						}}
						validationSchema={Yup.object({
							department: Yup.string().required("Department name is required"),
						})}
						onSubmit={async (values, { setSubmitting }) => {
							try {
								setSubmitting(true)
								const db = getDatabase(app)
								await set(ref(db, `department/${id}`), {
									name: values.department,
								})
								navigate("/departmentlist")
							} catch (error) {
								console.error("Error:", error)
							} finally {
								setSubmitting(false)
							}
						}}
					>
						{({ isSubmitting }) => (
							<Form className="w-full">
								<div>
									<div className="mb-4">
										<label htmlFor="department" className="block text-gray-700 text-sm font-bold mb-2">
											Department Name
										</label>
										<Field
											type="text"
											name="department"
											id="department"
											className="shadow appearance-none border rounded w-full mr-5 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
										/>
										<ErrorMessage name="department" component="div" className="text-red-500" />
									</div>
									<div>
										<button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold h-10 px-4 rounded focus:outline-none focus:shadow-outline">
											{isSubmitting ? "Submitting..." : "Submit"}
										</button>
									</div>
								</div>
							</Form>
						)}
					</Formik>
				</div>
			</div>
		</>
	)
}

export default UpdateDepartment
