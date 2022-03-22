import React, { useContext } from 'react';
import Masonry from 'react-masonry-css';
import millify from 'millify';
import { withStyles, makeStyles, Typography, Divider, Tooltip } from "@material-ui/core";
import { App } from "../../context/AppContext";
import { InfoCircleOutlined } from '@ant-design/icons';

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
        coinStatistics: {
            marginBottom: "1rem",
            [theme.breakpoints.up('md')]: {
                marginBottom: 0,
            },
        },
        coinStats: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: ".5rem",
            "&:hover": {
                background: "#e6f7ee"
            },
        },
        coinStatsHead: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: ".5rem"
        },
        coinStatsTitle: {
            fontWeight: 600,
            fontSize: "1rem",
            [theme.breakpoints.up('sm')]: {
                fontSize: "1.2rem",
            },
        },
    }
})

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
    },
}))(Tooltip);

const CoinStats = ({ cryptoDetails }) => {
    const classes = useStyles()
    const { currency, symbol } = useContext(App);

    const stats = [
        {
            title: 'Price',
            value: `${symbol} ${cryptoDetails?.market_data?.current_price[currency.toLowerCase()] &&
                millify(cryptoDetails?.market_data?.current_price[currency.toLowerCase()])}`
        },
        {
            title: 'Rank',
            value: `${cryptoDetails?.market_data?.market_cap_rank}`
        },
        {
            title: 'Market Cap',
            value: `${symbol} ${cryptoDetails?.market_data?.market_cap[currency.toLowerCase()]
                && millify(cryptoDetails?.market_data?.market_cap[currency.toLowerCase()])}`,
            tip:
                <HtmlTooltip
                    placement="right"
                    arrow
                    enterTouchDelay={100}
                    title=
                    {
                        <Typography variant="body2" color="inherit">
                            Market Cap is the circulation supply of a coin multiplied by its currency price.
                        </Typography>
                    }>
                    <InfoCircleOutlined />
                </HtmlTooltip>
        },
        {
            title: 'Total Volume',
            value: `${symbol} ${cryptoDetails?.market_data?.total_volume[currency.toLowerCase()] &&
                millify(cryptoDetails?.market_data?.total_volume[currency.toLowerCase()])}`,
            tip:
                <HtmlTooltip
                    placement="right"
                    arrow
                    enterTouchDelay={100}
                    title=
                    {
                        <Typography variant="body2" color="inherit">
                            The total value of all trades with this coin on exchanges.
                        </Typography>
                    }>
                    <InfoCircleOutlined />
                </HtmlTooltip>

        },
    ];

    const genericStats = [
        {
            title: '24h High',
            value: `${symbol} ${cryptoDetails?.market_data?.high_24h[currency.toLowerCase()] &&
                millify(cryptoDetails?.market_data?.high_24h[currency.toLowerCase()])}`,
            tip:
                <HtmlTooltip
                    placement="right"
                    arrow
                    enterTouchDelay={100}
                    title=
                    {
                        <Typography variant="body2" color="inherit">
                            All-time high is the highest daily average price of a coin.
                        </Typography>
                    }>
                    <InfoCircleOutlined />
                </HtmlTooltip>
        },
        {
            title: 'Fully diluted val',
            value: `${symbol} ${cryptoDetails?.market_data?.fully_diluted_valuation[currency.toLowerCase()]
                && millify(cryptoDetails?.market_data?.fully_diluted_valuation[currency.toLowerCase()])}`,
            tip:
                <HtmlTooltip
                    placement="right"
                    arrow
                    enterTouchDelay={100}
                    title=
                    {
                        <Typography variant="body2" color="inherit">
                            Fully diluted valuation is a coin's price multiplied by its total supply.
                        </Typography>
                    }>
                    <InfoCircleOutlined />
                </HtmlTooltip>
        },
        {
            title: 'Total supply',
            value: `${symbol} ${cryptoDetails?.market_data?.total_supply &&
                millify(cryptoDetails?.market_data?.total_supply)}`,
            tip:
                <HtmlTooltip
                    placement="right"
                    arrow
                    enterTouchDelay={100}
                    title=
                    {
                        <Typography variant="body2" color="inherit">
                            Total supply is the total numbers of coins that exist today.
                        </Typography>
                    }>
                    <InfoCircleOutlined />
                </HtmlTooltip>

        },
        {
            title: 'Circulating supply',
            value: `${symbol} ${cryptoDetails?.market_data?.circulating_supply &&
                millify(cryptoDetails?.market_data?.circulating_supply)}`,
            tip:
                <HtmlTooltip
                    placement="right"
                    arrow
                    enterTouchDelay={100}
                    title=
                    {
                        <Typography variant="body2" color="inherit">
                            Circulating supply is the total numbers of coins that's currently in public hands and circulating in the market.
                        </Typography>
                    }>
                    <InfoCircleOutlined />
                </HtmlTooltip>
        },
    ];

    const breakpoints = {
        default: 2,
        992: 1
    };

    return (
        <div>
            <Masonry
                breakpointCols={breakpoints}
                className={classes.masonryGrid}
                columnClassName={classes.masonryGridColumn}>

                <div className={classes.coinStatistics}>
                    <Typography gutterBottom variant="h6" style={{ textAlign: "center", fontWeight: 600, margin: "1rem 0" }}>{cryptoDetails?.name} Value Statistics</Typography>
                    {stats.map(({ title, value, tip }) => (
                        <div key={title}>
                            <div className={classes.coinStats}>
                                <div className={classes.coinStatsHead}>
                                    <Typography variant="h6" className={classes.coinStatsTitle}>{title}</Typography>
                                    {tip}
                                </div>
                                <Typography variant="body1">{value}</Typography>
                            </div>
                            <Divider />
                        </div>
                    ))}
                </div>

                <div className={classes.coinOtherStatistics}>
                    <Typography gutterBottom variant="h6" style={{ textAlign: "center", fontWeight: 600, margin: "1rem 0" }}>Other Stats Info</Typography>
                    {genericStats.map(({ title, value, tip }) => (
                        <div key={title}>
                            <div className={classes.coinStats} >
                                <div className={classes.coinStatsHead}>
                                    <Typography variant="h6" className={classes.coinStatsTitle}>{title}</Typography>
                                    {tip}
                                </div>

                                <Typography variant="body1">{value}</Typography>
                            </div>
                            <Divider />
                        </div>
                    ))}
                </div>

            </Masonry>
        </div>
    )
}

export default CoinStats