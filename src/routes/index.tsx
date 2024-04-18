import { useRoutes } from "react-router-dom"
import appRouter from "./app"
import authRouter from "./auth"

export default function AppRouter() {
    return useRoutes([...appRouter, ...authRouter])    
}