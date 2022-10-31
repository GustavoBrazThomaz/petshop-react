import { Outlet } from "react-router-dom";
import Login from "./Login";

const useAuth = () => {
    const token = window.localStorage.getItem('token')

    if(token){
        const user = { loggedIn: true };
        return user && user.loggedIn;
    }
    
    const user = { loggedIn: false };
    return user && user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = useAuth();
  return isAuth ? <Outlet /> : <Login />;
};

export default ProtectedRoutes;
