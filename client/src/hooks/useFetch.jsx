import { useEffect, useState } from "react";
import axiosInstance from "../config/axiosInstance.js";

const useFetch = (url) => {
    const [data, setData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();

        const fetchData = async () => {
            setIsLoading(true);
            setError(null);

            try {
                const response = await axiosInstance.get(url, {
                    signal: controller.signal,
                });
                setData(response?.data?.data);
            } catch (err) {
                if (err.name !== "CanceledError" && err.name !== "AbortError") {
                    console.error(err);
                    setError(err);
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();

        return () => {
            controller.abort(); // Cancel the request if the component unmounts
        };
    }, [url]);

    return { data, isLoading, error };
};

export default useFetch;
