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
import AddMembers from "../Pages/Dashboard/AddMembers";
import RequestedMembers from "../Pages/Dashboard/RequestedMembers";
import Overview from "../Pages/Dashboard/Overview";

const router = createBrowserRouter([
    {
        path: '/',
        Component: Root,
        children: [
            {
                index: true,
                Component:Home
            },
            {
                path: '/institutions',
                Component:Institutions
            },
            {
                path: '/peoples',
                Component:Peoples
            },
            {
                path: '/join',
                Component:JoinForm
            }
        ]
    },
    {
        path: 'admin',
        Component: Dashboard,
        children: [
            {
                index: true, // এটিই ওভারভিউ দেখাবে যখন ইউজার সরাসরি /admin এ থাকবে
                Component: Overview
            },
            {
                
                path: 'add-events',
                Component:AddEvents
            },
            {
                path: 'add-peoples',
                Component:AddPeople
            },
            {
                path: 'add-institutions',
                Component:AddInstitutions
            },
            {
                path: 'add-members',
                Component:AddMembers
            },
            {
                path: 'requested-members',
                Component:RequestedMembers
            }
        ]
    }

    
])
export default router;