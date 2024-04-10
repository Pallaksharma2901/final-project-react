import "./App.css"
import { RouterProvider, createBrowserRouter } from "react-router-dom"

import Dashboard from "./pages/Dashboard"

import AddDepartment from "./components/AddDepartment"
import AddEmployee from "./components/AddEmployee"
import AddAttendence from "./components/AddAttendence"
import DepartmentList from "./components/DepartmentList"
import EmployeeList from "./components/EmployeeList"
import AttendenceList from "./components/AttendenceList"

import UpdateDepartment from "./components/UpdateDepartment"
import UpdateEmployee from "./components/UpdateEmployee"

const myRouter = createBrowserRouter([
	{
		path: "",
		Component: Dashboard,
		children: [
			{ path: "", Component: EmployeeList },
			{ path: "adddepartment", Component: AddDepartment },
			{ path: "departmentlist", Component: DepartmentList },
			{ path: "updatedepartment/:id", Component: UpdateDepartment },
			{ path: "addemployee", Component: AddEmployee },
			{ path: "employeelist", Component: EmployeeList },
			{ path: "updateemployee/:id", Component: UpdateEmployee },
			{ path: "addattendence", Component: AddAttendence },
			{ path: "attendencelist", Component: AttendenceList },
		],
	},
])

function App() {
	return (
		<>
			<RouterProvider router={myRouter} />
		</>
	)
}

export default App
