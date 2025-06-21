import { useCallback, useEffect, useState } from "react";


const useFetch = <T>(fetchFunction: () => Promise<T>,autofetch: boolean = false) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = useCallback(async () => {
        try{
            setLoading(true);   
            setError(null);
            const data = await fetchFunction();
            setData(data);
        }
        catch(error){
            console.error('useFetch error:', error);
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError(String(error));
            }
        }
        finally{
            setLoading(false);
        }
    }, []);

    const reset = useCallback(() => {
        setData(null);
        setError(null);
        setLoading(false);
    }, []);

    useEffect(() => {
        if(autofetch) fetchData();
    }, [autofetch, fetchData]);

    return {data, error, loading, fetchData, reset};
}

export default useFetch;