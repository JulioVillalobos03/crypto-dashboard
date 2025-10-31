import axios from "axios";

const API_URL = "https://api.coingecko.com/api/v3/coins/markets";
const API_KEY = "CG-MHWYLRydPeKMeH7Vj8Dqf3X8";

export const getCoins = async ({
    currency = "usd",
    perPage = 50,
    page = 1,
    order = "market_cap_desc",

}) => {
    const response = await axios.get(API_URL, {
        params: {
            vs_currency: currency,
            order,
            per_page: perPage,
            page,
            sparkline: false,
            x_cg_demo_api_key: API_KEY,
        },
    });

    return response.data;
};