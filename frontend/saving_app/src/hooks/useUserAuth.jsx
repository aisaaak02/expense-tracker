// @refresh reset
import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

export const useUserAuth = () => {
  const { user, updateUser, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) return;

    let isMounted = true;
    (async () => {
      try {
        const { data } = await axiosInstance.get(API_PATHS.AUTH.GET_USER_INFO);
        if (isMounted && data) updateUser(data);
      } catch (err) {
        console.error("failed to fetch user data", err);
        if (isMounted) {
          clearUser();
          navigate("/login");
        }
      }
    })();
    return () => {
      isMounted = false;
    };
  }, [user, updateUser, clearUser, navigate]);
}
