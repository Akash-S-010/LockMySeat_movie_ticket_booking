import { useEffect, useState, useCallback } from "react";
import  axiosInstance  from "../config/axiosInstance.js";

export const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        const controller = new AbortController();
        const signal = controller.signal;

        try {
            const response = await axiosInstance.get(url, { signal });
            setData(response?.data?.data);
        } catch (err) {
            if (err.name !== "AbortError") {
                setError(err);
            }
        } finally {
            setIsLoading(false);
        }

        return () => controller.abort(); // Cleanup
    }, [url]);


    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, isLoading, error, refetch: fetchData };
};
