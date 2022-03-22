import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core'
import {
  Card,
  Avatar,
  Typography,
  Divider
} from '@material-ui/core';
import { App } from '../context/AppContext'
import millify from 'millify';


const useStyles = makeStyles((theme) => {
  return {
    cryptoCard: {
      marginBottom: "1rem",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      alignItems: "flex-start",
      padding: "1rem",
    },
    cardHead: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    cryptoDetails: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    value: {
      fontWeight: 400,
      marginLeft: ".5rem"
    },
    currencyTitle: {
      fontWeight: 600,
      fontSize: "1.2rem",
      [theme.breakpoints.up('sm')]: {
        fontSize: "1.4rem",
      },
    },
    currencyRank: {
      fontWeight: 600,
      fontSize: "1.4rem",
    }
  }
})

const CryptoCard = ({ currency }) => {
  const classes = useStyles()
  const { symbol } = useContext(App);
  let profit = currency?.price_change_percentage_24h >= 0;
  return (
    <Link to={`/coin/${currency.id}`} style={{ textDecoration: "none" }}>
      <Card className={classes.cryptoCard}>
        <div className={classes.cardHead}>
          <div className={classes.cryptoDetails}>
            <Typography variant="h3" className={classes.currencyRank}>
              {`${currency.market_cap_rank}.`}
            </Typography>
            <Typography variant="h3" className={classes.currencyTitle}>
              {currency.symbol.toUpperCase()}
            </Typography>
          </div>
          <div className={classes.cryptoImg}>
            <Avatar src={currency.image} alt={currency.name} />
          </div>
        </div>
        <Divider style={{ width: "100%", margin: "1rem 0" }} />
        <div className={classes.cryptoInfo}>
          <Typography variant="h6"
            style={{ fontSize: "1rem", fontWeight: 600 }}>
            Name : <span className={classes.value}>{currency.name}</span>
          </Typography>
          <Typography variant="h6"
            style={{ fontSize: "1rem", fontWeight: 600 }}>
            Price : <span className={classes.value}>{symbol} {millify(currency.current_price)}</span>
          </Typography>
          <Typography variant="h6"
            style={{ fontSize: "1rem", fontWeight: 600 }}>
            Market Cap : <span className={classes.value}>{symbol} {millify(currency.market_cap)}</span>
          </Typography>
          <Typography variant="h6"
            style={{ fontSize: "1rem", fontWeight: 600 }}>
            Daily Change :
            <span className={classes.value} style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red" }}>
              {profit && "+"} {currency.price_change_percentage_24h.toFixed(2)}%
            </span>
          </Typography>
        </div>
      </Card>
    </Link>
  )
}

export default CryptoCard