import React, { useState, useEffect } from 'react';
import { withStyles, makeStyles, Typography, Divider, Tooltip, Container } from "@material-ui/core";
import { getCryptosStats } from "../services/cryptoApi";
import CryptoCurrencies from "./CryptoCurrencies"
import News from './News';
import millify from "millify";
import { InfoCircleOutlined } from '@ant-design/icons';
import Masonry from "react-masonry-css";

const useStyles = makeStyles((theme) => {
  return {
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
      [theme.breakpoints.up('md')]: {
        fontSize: "1.2rem",
      },
    },
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

const HomePage = () => {
  const classes = useStyles()
  const [cryptoStats, setCryptoStats] = useState([]);
  useEffect(() => {
    getCryptosStats().then((data) => {
      setCryptoStats(data)
    })
  }, []);

  const totalCoins = new Intl.NumberFormat("en-GB").format(cryptoStats.stats?.totalCoins);
  const totalMarkets = new Intl.NumberFormat("en-GB").format(cryptoStats.stats?.totalMarkets);

  const stats1 = [
    {
      title: 'Cryptocurrencies',
      value: `${totalCoins}`,
    },
    {
      title: 'Crypto Market Cap',
      value: `${cryptoStats.stats?.totalMarketCap && millify(cryptoStats.stats?.totalMarketCap)}`,
      tip:
        <HtmlTooltip
          placement="right"
          arrow
          enterTouchDelay={100}
          title=
          {
            <Typography variant="body2" color="inherit">
              Total value of all cryptocurrencies combined in USD.
            </Typography>
          }>
          <InfoCircleOutlined />
        </HtmlTooltip>
    },
    {
      title: '24hr Volume',
      value: `${cryptoStats.stats?.total24hVolume && millify(cryptoStats.stats?.total24hVolume)}`,
      tip:
        <HtmlTooltip
          placement="right"
          arrow
          enterTouchDelay={100}
          title=
          {
            <Typography variant="body2" color="inherit">
              Total value of all trades on any exchange made in the past 24 hours in USD.
            </Typography>
          }>
          <InfoCircleOutlined />
        </HtmlTooltip>

    },
  ]
  const stats2 = [
    {
      title: 'Markets',
      value: `${totalMarkets}`,
    },
    {
      title: 'Exchanges',
      value: `${cryptoStats.stats?.totalExchanges}`,
    },
  ]

  const breakpoints = {
    default: 2,
    992: 1
  };

  return (
    <>
      <section>
        <Typography variant="h5" component="h1" style={{ fontWeight: 700, margin: "1.5rem 0" }}>
          Crypto Market Statistics
        </Typography>
        <Container>
          <Masonry
            breakpointCols={breakpoints}
            className={classes.masonryGrid}
            columnClassName={classes.masonryGridColumn}>

            <div>
              {
                stats1.map(({ title, value, tip }) => {
                  return (
                    <div key={title}>
                      <div className={classes.coinStats}>
                        <div className={classes.coinStatsHead}>
                          <Typography variant="h6" className={classes.coinStatsTitle}>
                            {title}
                          </Typography>
                          {tip}
                        </div>
                        <Typography variant="body1">
                          {value}
                        </Typography>
                      </div>
                      <Divider />
                    </div>
                  )
                })
              }
            </div>

            <div>
              {
                stats2.map(({ title, value, tip }) => {
                  return (
                    <div key={title}>
                      <div className={classes.coinStats}>
                        <div className={classes.coinStatsHead}>
                          <Typography variant="h6" className={classes.coinStatsTitle}>
                            {title}
                          </Typography>
                          {tip}
                        </div>
                        <Typography variant="body1">
                          {value}
                        </Typography>
                      </div>
                      <Divider />
                    </div>
                  )
                })
              }
            </div>

          </Masonry>
        </Container>
      </section>

      <section>
        <Typography variant="h5" component="h1" style={{ fontWeight: 700, margin: "1.5rem 0" }}>
          Top 10 Crypto
        </Typography>
        <CryptoCurrencies simplified />
      </section>

      <section>
        <Typography variant="h5" component="h1" style={{ fontWeight: 700, margin: "1.5rem 0" }}>
          Latest Crypto News
        </Typography>
        <News simplified />
      </section>
    </>
  )
}

export default HomePage