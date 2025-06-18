import { useEffect, useState } from "react";


const useFetch = <T>(fetchFunction: () => Promise<T>,autofetch: boolean = true) => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchData = async () => {
        try{
            setLoading(true);   
            setError(null);
            const data = await fetchFunction();
            setData(data);
        }
        catch(error){
            //@ts-ignore
            setError(error as string);
        }
        finally{
            setLoading(false);
        }
    }

    const reset = () => {
        setData(null);
        setError(null);
        setLoading(false);
    }

    useEffect(() => {
        if(autofetch) fetchData();
    }, []);

    return {data, error, loading, fetchData, reset};
}

export default useFetch;