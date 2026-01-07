import { createBrowserRouter } from "react-router";
import Root from "../Root/Root";
import Home from "../Pages/Home/Home";
import Institutions from "../Pages/Institutions/Institutions";
import Peoples from "../Pages/Peoples/Peoples";

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
            }
        ]
    },

    
])
export default router;