import { getCookie } from "@/lib/utils/cookies";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";

function useAuth() {
    const token = getCookie("accessToken");
    const isAutheticated = useSelector((state: RootState) => state.auth.isAuthenticated) && token;
    const { user } = useSelector((state: RootState) => state.auth);
    return { isAutheticated, user };
}

export default useAuth;