import { useEffect, useState } from "react";
import { getCoins } from "../api/coingecko";

export const useCoins = (initialFilters = {}) => {
    const [coins, setCoins] = useState([]);
    const [filters, setFilters] = useState({
        currency: "usd",
        perPage: 50,
        order: "market_cap_desc",
        ...initialFilters,
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCoins = async () => {
        try {
            setLoading(true);
            const data = await getCoins(filters);
            console.log(data);
            setCoins(data);
        } catch (error) {
            console.error(error);
            setError("Something went wrong");
            
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoins();
    }, [filters]);

    return {
        coins,
        loading,
        error,
        filters,
        setFilters
    };
}