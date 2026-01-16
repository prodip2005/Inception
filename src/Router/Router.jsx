import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Institutions from "../Pages/Institutions/Institutions";
import Peoples from "../Pages/Peoples/Peoples";
import JoinForm from "../Pages/JoinForm/JoinForm";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddEvents from "../Pages/Dashboard/AddEvents";
import AddPeople from "../Pages/Dashboard/AddPeople";
import AddInstitutions from "../Pages/Dashboard/AddInstitutions";
import AllMembers from "../Pages/Dashboard/AllMembers";
import RequestedMembers from "../Pages/Dashboard/RequestedMembers";
import Overview from "../Pages/Dashboard/Overview";
import Edit from "../Pages/Dashboard/Edit";
import MembersList from "../Pages/Members/MembersList";
import AddAdmin from "../Pages/Authentication/AddAdmin";
import ManageAdmins from "../Pages/Authentication/ManageAdmins";
import Login from "../Pages/Authentication/Login";
import AdminRoute from "../Pages/Authentication/AdminRoute";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/institutions',
                Component: Institutions
            },
            {
                path: '/peoples',
                Component: Peoples
            },
            {
                path: '/join',
                Component: JoinForm
            },
            {
                path: '/all-members',
                Component:MembersList
            },
            {
                path: '/login',
                Component:Login
            }
        ]
    },
    {
        path: 'admin',
        element:
            <AdminRoute>
                <Dashboard/>
            </AdminRoute>,
        children: [
            {
                index: true, 
                Component: Overview
            },
            {

                path: 'add-events',
                Component: AddEvents
            },
            {
                path: 'add-peoples',
                Component: AddPeople
            },
            {
                path: 'add-institutions',
                Component: AddInstitutions
            },
            {
                path: 'all-members',
                Component: AllMembers
            },
            {
                path: 'requested-members',
                Component: RequestedMembers
            },
            {
                path: 'edit',
                Component: Edit
            },
            {
                path: "add-admin",
                element: <AddAdmin />
            },
            {
                path: "manage-admins",
                element: <ManageAdmins />
            },
        ]
    }


])
export default router;