import React, { useContext } from 'react';
import { makeStyles, Typography, Divider } from "@material-ui/core";
import { App } from "../../context/AppContext";
import Masonry from 'react-masonry-css';

const useStyles = makeStyles((theme) => {
    return {
        masonryGrid: {
            display: "flex",
            marginLeft: "-30px",
            /* gutter size offset */
            width: "auto",
        },
        masonryGridColumn: {
            paddingLeft: "30px",
            /* gutter size */
        },
        coinPriceStats: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: ".5rem",
            "&:hover": {
                background: "#e6f7ee"
            },
        },
        coinStatsTitle: {
            fontSize: "1rem",
            [theme.breakpoints.up('md')]: {
                fontSize: "1.2rem",
            },
        },
        coinns: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "1rem",
        }
    }
})


const CoinPriceStats = ({ cryptoDetails }) => {
    const classes = useStyles()
    const { currency, symbol } = useContext(App);

    let profit1hr = cryptoDetails?.market_data?.price_change_percentage_1h_in_currency[currency.toLowerCase()].toFixed(2) >= 0;
    let profit24hr = cryptoDetails?.market_data?.price_change_percentage_24h_in_currency[currency.toLowerCase()].toFixed(2) >= 0;
    let profit7day = cryptoDetails?.market_data?.price_change_percentage_7d_in_currency[currency.toLowerCase()].toFixed(2) >= 0;
    let profit30day = cryptoDetails?.market_data?.price_change_percentage_30d_in_currency[currency.toLowerCase()].toFixed(2) >= 0;
    let profit60day = cryptoDetails?.market_data?.price_change_percentage_60d_in_currency[currency.toLowerCase()].toFixed(2) >= 0;
    let profit1yr = cryptoDetails?.market_data?.price_change_percentage_1y_in_currency[currency.toLowerCase()].toFixed(2) >= 0;


    const priceChangeStats1 = [
        {
            title: '1 Hour',
            status: profit1hr,
            value: `${cryptoDetails?.market_data?.price_change_percentage_1h_in_currency[currency.toLowerCase()].toFixed(2)}`
        },
        {
            title: '24 Hour',
            status: profit24hr,
            value: `${cryptoDetails?.market_data?.price_change_percentage_24h_in_currency[currency.toLowerCase()].toFixed(2)}`
        },
        {
            title: '7 Day',
            status: profit7day,
            value: `${cryptoDetails?.market_data?.price_change_percentage_7d_in_currency[currency.toLowerCase()].toFixed(2)}`
        },
    ];

    const priceChangeStats2 = [
        {
            title: '30 Day',
            status: profit30day,
            value: `${cryptoDetails?.market_data?.price_change_percentage_30d_in_currency[currency.toLowerCase()].toFixed(2)}`
        },
        {
            title: '60 Day',
            status: profit60day,
            value: `${cryptoDetails?.market_data?.price_change_percentage_60d_in_currency[currency.toLowerCase()].toFixed(2)}`
        },
        {
            title: '1 Year',
            status: profit1yr,
            value: `${cryptoDetails?.market_data?.price_change_percentage_1y_in_currency[currency.toLowerCase()].toFixed(2)}`
        },
    ]

    const breakpoints = {
        default: 2,
        992: 1
    };

    return (
        <div>
            <Typography variant="h6" style={{ textAlign: "center", fontWeight: 600, margin: "1rem 0" }}>
                Price Changes
            </Typography>
            <Masonry
                breakpointCols={breakpoints}
                className={classes.masonryGrid}
                columnClassName={classes.masonryGridColumn}>

                <div>
                    {priceChangeStats1.map(({ title, value, status }) => (
                        <div key={title}>
                            <div className={classes.coinPriceStats}>
                                <Typography variant="h6" className={classes.coinStatsTitle}>
                                    {title}
                                </Typography>
                                <Typography variant="body1" style={{ color: status > 0 ? "rgb(14, 203, 129)" : "red" }}>
                                    {symbol} {status && "+"}{value}%
                                </Typography>
                            </div>
                            <Divider />
                        </div>
                    ))}
                </div>

                <div>
                    {priceChangeStats2.map(({ title, value, status }) => (
                        <div key={title}>
                            <div className={classes.coinPriceStats}>
                                <Typography variant="h6" className={classes.coinStatsTitle}>
                                    {title}
                                </Typography>
                                <Typography variant="body1" style={{ color: status > 0 ? "rgb(14, 203, 129)" : "red" }}>
                                    {symbol} {status && "+"}{value}%
                                </Typography>
                            </div>
                            <Divider />
                        </div>
                    ))}
                </div>

            </Masonry>
        </div>
    )
}

export default CoinPriceStats