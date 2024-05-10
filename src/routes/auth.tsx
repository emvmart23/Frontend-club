import AuthLayout from "../layout/AuthLayout";
import User from "@/page/user/page/Users"
import LoginCard from "@/page/auth/components/Logincard";

const createAuthRoute = (element: React.ReactNode) => (
    <AuthLayout>{element}</AuthLayout>
)

const authRouter = [
    {
        path: "/login",
        element: createAuthRoute(<LoginCard/>),
    },
    {
        path: "/register",
        element: createAuthRoute(<User/>),
    }
]

export default authRouter;