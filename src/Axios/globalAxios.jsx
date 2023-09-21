import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { startLoading, stopLoading } from '../redux/actions/LoadingActions';

export const GlobalAxios = () => {

    const dispatch = useDispatch();
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        setShowError(false);
    }, []);

    const requestInterceptor = axios.interceptors.request.use(
        (config) => {
            dispatch(startLoading(2));
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    const responseInterceptor = axios.interceptors.response.use(
        (response) => {
            dispatch(stopLoading());
            return response;
        },
        (error) => {
            dispatch(stopLoading());
            if (error.response?.status == 500)
                setShowError(true);
            return Promise.reject(error);
        }
    );

    return (
        <>
            {/* {showError ? (
                <GlobalErrModal
                    onClose={() => setShowError(false)}
                />
            ) : null} */}
        </>
    );
};
