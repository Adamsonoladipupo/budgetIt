import { createBrowserRouter } from "react-router-dom"
import SignUp from "../pages/signup"
import Dashboard from "../pages/dashboard"
import SignIn from "../pages/signin"
import AddInflowModal from "../components/AddInflowModal"
import AddOutflowModal from "../components/AddOutflowModal"

const router = createBrowserRouter ([
    {
        path: "/",
        element:<SignUp/>
    },
    {
        path:"signin",
        element:<SignIn/>
    },
    {
        path:"dashboard",
        element:<Dashboard/>
    },
    {
        path:"addInflow",
        element:<AddInflowModal/>
    }, 
    {
        path:"addOutflow",
        element:<AddOutflowModal/>
    }
])
export default router