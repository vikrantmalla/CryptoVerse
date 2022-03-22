import axios from 'axios';

export const getCryptosStats = async() => {
    try {
        const { data: { data } } = await axios.get(`https://coinranking1.p.rapidapi.com/coins`, {
            params: {
                referenceCurrencyUuid: 'yhjMzLPhuIDl',
                limit: '10',
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': 'coinranking1.p.rapidapi.com',
            },
        });

        return data;
    } catch (error) {
        console.log(error);
    }
};



export const getCryptosData = async(currency, count) => {
    try {
        const { data } = await axios.get(`https://coingecko.p.rapidapi.com/coins/markets`, {
            params: {
                vs_currency: `${currency}`,
                page: '1',
                per_page: `${count}`,
                order: 'market_cap_desc'
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': 'coingecko.p.rapidapi.com',
            },
        });

        return data;
    } catch (error) {
        console.log(error);
    }
};


export const getSingleCoinData = async(id) => {

    try {
        const { data } = await axios.get(`https://coingecko.p.rapidapi.com/coins/${id}`, {
            params: {
                localization: 'true',
                market_data: 'true',
            },
            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': 'coingecko.p.rapidapi.com'
            },
        });

        return data;
    } catch (error) {
        console.log(error);
    }
};

export const getSingleCoinHistoricalChart = async(id, currency, days = 365) => {
    try {
        const { data } = await axios.get(`https://coingecko.p.rapidapi.com/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`, {

            headers: {
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': 'coingecko.p.rapidapi.com',
            },
        });
        console.log(days)
        return data;
    } catch (error) {
        console.log(error);
    }
};