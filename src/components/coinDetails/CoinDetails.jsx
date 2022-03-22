import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom';
import { App } from "../../context/AppContext";
import { getSingleCoinData } from "../../services/cryptoApi";
import { makeStyles, Typography, Divider, Avatar } from "@material-ui/core";
import ReactHtmlParser from "react-html-parser";
import LineChart from "./LineChart";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import CoinStats from './CoinStats';
import CoinPriceStats from './CoinPriceStats';
import { StarFilled, StarOutlined } from '@ant-design/icons';


const useStyles = makeStyles((theme) => {
  return {
    details: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem"
    },
    coinHead: {
      margin: "1rem 0",
      textAlign: "center"
    },
    coinInfo: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      gap: "1rem",
      marginBottom: ".5rem"
    },
    coinInfo1: {
      display: "flex",
      alignItems: "center",
      gap: ".5rem"
    },
    coinInfo2: {
      display: "flex",
      alignItems: "center",
      gap: ".5rem",

    },
    para: {
      textAlign: "start",
    },
    markButton: {
      border: ".1rem solid grey",
      padding: ".4rem .8rem",
      borderRadius: ".5rem",
      cursor: "pointer",
      "&:hover": {
        background: "#e6f7ee"
      },
    },
    coinDesc: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },
  }
})

const CoinDetails = () => {
  const classes = useStyles()
  const { currency, setAlert, watchlist, user } = useContext(App);
  const { id } = useParams();
  const [cryptoDetails, setCryptoDetails] = useState([]);
  useEffect(() => {
    getSingleCoinData(id).then((data) => {
      setCryptoDetails(data)
    })
  }, [id]);

  const [country, setCountry] = useState("India");

  useEffect(() => {
    if (currency === "INR") setCountry("India Rupee");
    else if (currency === "USD") setCountry("US Dollar");

  }, [currency]);


  const inWatchlist = watchlist.includes(cryptoDetails?.id);

  const addToWatchlist = async () => {
    //uniquely identified by its location within the database
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      //create or overwrite a single document
      await setDoc(
        coinRef,
        { coins: watchlist ? [...watchlist, cryptoDetails?.id] : [cryptoDetails?.id] },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${cryptoDetails.name} Added to the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };
  const removeFromWatchlist = async () => {
    const coinRef = doc(db, "watchlist", user.uid);
    try {
      await setDoc(
        coinRef,
        { coins: watchlist.filter((wish) => wish !== cryptoDetails?.id) },
        { merge: true }
      );

      setAlert({
        open: true,
        message: `${cryptoDetails.name} Removed from the Watchlist !`,
        type: "success",
      });
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
    }
  };

  return (
    <div className={classes.details}>
      <div className={classes.coinHeading}>
        <div className={classes.coinInfo}>
          <div className={classes.coinInfo1}>
            <Avatar src={cryptoDetails?.image?.small} alt={cryptoDetails?.name} />
            <Typography variant="h6">
              {cryptoDetails?.name} <span>({cryptoDetails?.symbol?.toUpperCase()})</span>
            </Typography>
          </div>
          <div className={classes.coinInfo2}>
            {user ? <div className={classes.markButton} onClick={inWatchlist ? removeFromWatchlist : addToWatchlist}>
              {inWatchlist ? <StarFilled /> : <StarOutlined />}
            </div> : ""}
          </div>
        </div>
        <Typography gutterBottom variant="body1" className={classes.para}>
          {cryptoDetails?.name} live price in {country} {currency}. View value statistics, market cap and supply.
        </Typography>
        <Divider />
      </div>
      <CoinStats cryptoDetails={cryptoDetails} />
      <LineChart cryptoDetails={cryptoDetails} />
      <CoinPriceStats cryptoDetails={cryptoDetails} />
      <div className={classes.info}>
        <Typography gutterBottom variant="h6" style={{ fontSize: "1.4rem", fontWeight: 600, margin: "1rem 0" }}>
          What is {cryptoDetails?.name}?
        </Typography>
        <div className={classes.coinDesc}>
          <Typography gutterBottom variant="h6" style={{ fontSize: "1rem", fontWeight: 400 }}>
            {ReactHtmlParser(cryptoDetails?.description?.en)}
          </Typography>
        </div>
      </div>

    </div>
  )
}

export default CoinDetails