// import { Container } from '@material-ui/core';
import React, { useState, useEffect, useContext } from 'react'
import { App } from '../context/AppContext'
import { getCryptosData } from '../services/cryptoApi'
import { makeStyles, Card, Avatar, Typography, Divider } from '@material-ui/core'
import { DeleteOutlined } from '@ant-design/icons';
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import Masonry from 'react-masonry-css';
import millify from 'millify';

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
        coin: {
            padding: 10,
            color: "black",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            textAlign: "right"

        },
        message: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "80vh",
            fontWeight: "bold",
            fontSize: "1rem"
        },
        headContainer: {
            border: "1px solid pink",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem",
            marginBottom: "1rem",
            textAlign: "right"
        },
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
        cryptoBody: {
            width: "100%",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            [theme.breakpoints.up('sm')]: {
                flexDirection: "row",
                alignItems: "flex-end",
                gap: ".5rem"
            },
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
        delete: {
            border: ".1rem solid grey",
            padding: ".6rem .8rem",
            borderRadius: ".5rem",
            cursor: "pointer",
            "&:hover": {
                background: "#e6f7ee"
            },
        }
    }
})
const Watchlist = () => {
    const { currency, symbol, watchlist, setAlert, user } = useContext(App);
    const classes = useStyles()
    const [crypto, setCrypto] = useState([]);
    useEffect(() => {
        getCryptosData(currency).then((data) => {
            setCrypto(data)
        })
    }, [currency]);

    //delete watchlist coin using id
    const removeFromWatchlist = async (coin) => {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchlist.filter((wish) => wish !== coin?.id) },
                { merge: true }
            );

            setAlert({
                open: true,
                message: `${coin.name} Removed from the Watchlist !`,
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
    let profit = crypto?.price_change_percentage_24h >= 0;

    const breakpoints = {
        default: 2,
        // 1100: 2,
        992: 1
    };
    return (
        <>
            {
                watchlist.length === 0 ?
                    (<div className={classes.message}>Watchlist is Empty</div>) : (
                        <Masonry
                            breakpointCols={breakpoints}
                            className={classes.masonryGrid}
                            columnClassName={classes.masonryGridColumn}>
                            {
                                // eslint-disable-next-line array-callback-return
                                crypto.map(coin => {
                                    if (watchlist.includes(coin.id)) {
                                        return (
                                            <Card key={coin.id} className={classes.cryptoCard}>
                                                <div className={classes.cardHead}>
                                                    <div className={classes.cryptoDetails}>
                                                        <div className={classes.title}>
                                                            <Typography variant="h3" className={classes.currencyTitle}>
                                                                {coin.name}
                                                            </Typography>
                                                            <span style={{ fontWeight: 400 }}>{`(${coin.symbol.toUpperCase()})`}</span>
                                                        </div>
                                                    </div>
                                                    <div className={classes.cryptoImg}>
                                                        <Avatar src={coin.image} alt={coin.name} />
                                                    </div>
                                                </div>
                                                <Divider style={{ width: "100%", margin: "1rem 0" }} />
                                                <div className={classes.cryptoBody}>
                                                    <div className={classes.cryptoInfo}>
                                                        <Typography variant="h6"
                                                            style={{ fontSize: "1rem", fontWeight: 600 }}>
                                                            Rank : <span className={classes.value}>{coin.market_cap_rank}</span>
                                                        </Typography>
                                                        <Typography variant="h6"
                                                            style={{ fontSize: "1rem", fontWeight: 600 }}>
                                                            Price : <span className={classes.value}>{symbol} {millify(coin.current_price)}</span>
                                                        </Typography>
                                                        <Typography variant="h6"
                                                            style={{ fontSize: "1rem", fontWeight: 600 }}>
                                                            Market Cap : <span className={classes.value}>{symbol} {millify(coin.market_cap)}</span>
                                                        </Typography>
                                                        <Typography variant="h6"
                                                            style={{ fontSize: "1rem", fontWeight: 600 }}>
                                                            Daily Change :
                                                            <span className={classes.value} style={{ color: profit > 0 ? "rgb(14, 203, 129)" : "red" }}>
                                                                {profit && "+"} {coin.price_change_percentage_24h.toFixed(2)}%
                                                            </span>
                                                        </Typography>
                                                    </div>
                                                    <div className={classes.delete}>
                                                        <DeleteOutlined
                                                            style={{ fontSize: "1rem" }}
                                                            onClick={() => removeFromWatchlist(coin)}
                                                        />
                                                    </div>
                                                </div>

                                            </Card>
                                        )
                                    }
                                })
                            }
                        </Masonry>
                    )


            }





        </>

    )
}

export default Watchlist