import { LoginForm } from "@/page/auth/components/forms/LoginForm";
import AuthLayout from "../layout/AuthLayout";

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
        element: createAuthRoute(<div>ds</div>),
    }
]

export default authRouter;