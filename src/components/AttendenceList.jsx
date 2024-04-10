import React, { useState, useEffect } from "react"
import { getDatabase, ref, get } from "firebase/database"
import app from "../firebaseConfig"

const AttendenceList = () => {
	const [attendanceData, setAttendanceData] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchAttendanceData = async () => {
			try {
				const db = getDatabase(app)
				const attendanceRef = ref(db, "attendance")

				const snapshot = await get(attendanceRef)
				if (snapshot.exists()) {
					const data = snapshot.val()
					const transformedData = Object.entries(data).map(([date, attendance]) => ({
						date,
						attendance,
					}))
					setAttendanceData(transformedData)
				}
				setLoading(false)
			} catch (error) {
				console.error("Error fetching attendance data:", error)
			}
		}

		fetchAttendanceData()
	}, [])

	if (loading) {
		return <div>Loading...</div>
	}

	return (
		<>
			<div className="mx-auto bg-white">
				<h1 className="my-10 ml-5 text-2xl font-bold text-gray-900">Attendance List</h1>
			</div>

			<table className="border-collapse border border-gray-400 mx-auto">
				<thead>
					<tr className="bg-gray-200">
						<th className="border border-gray-400 px-4 py-2">Date</th>
						<th className="border border-gray-400 px-4 py-2">Employee Name</th>
						<th className="border border-gray-400 px-4 py-2">Status</th>
					</tr>
				</thead>
				<tbody>
					{attendanceData.map(({ date, attendance }) =>
						Object.entries(attendance).map(([employeeName, status]) => {
							console.log(status) // Log the status object here
							return (
								<tr key={`${date}-${employeeName}`}>
									<td className="border border-gray-400 px-4 py-2">{date}</td>
									<td className="border border-gray-400 px-4 py-2">{employeeName}</td>
									<td className="border border-gray-400 px-4 py-2">{status}</td>
								</tr>
							)
						})
					)}
				</tbody>
			</table>
		</>
	)
}

export default AttendenceList
