import { LoginForm } from "@/page/auth/components/forms/LoginForm";
import AuthLayout from "../layout/AuthLayout";
import User from "@/page/user/page/Users"

const createAuthRoute = (element: React.ReactNode) => (
    <AuthLayout>{element}</AuthLayout>
)

const authRouter = [
    {
        path: "/login",
        element: createAuthRoute(<LoginForm/>),
    },
    {
        path: "/register",
        element: createAuthRoute(<User/>),
    }
]

export default authRouter;