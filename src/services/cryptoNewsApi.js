import axios from 'axios';

export const getCryptosNews = async(newsCategory, count) => {

    try {
        const { data } = await axios.get(`https://bing-news-search1.p.rapidapi.com/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`, {
            headers: {
                'x-bingapis-sdk': 'true',
                'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
                'x-rapidapi-host': 'bing-news-search1.p.rapidapi.com',
            },
        });

        return data;
    } catch (error) {
        console.log(error);
    }
};