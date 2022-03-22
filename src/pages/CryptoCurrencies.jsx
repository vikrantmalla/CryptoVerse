import React, { useContext, useState, useEffect } from 'react'
import { makeStyles, Container, TextField } from "@material-ui/core";
import { App } from '../context/AppContext'
import { getCryptosData } from '../services/cryptoApi'
import CryptoCard from '../components/CryptoCard';
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
        }
    }
})

const CryptoCurrencies = ({ simplified }) => {
    const classes = useStyles()
    const { currency } = useContext(App);
    const [crypto, setCrypto] = useState([]);
    const [search, setSearch] = useState("")
    const count = simplified ? 10 : 100;
    useEffect(() => {
        getCryptosData(currency, count).then((data) => {
            setCrypto(data)
        })
    }, [currency, count]);

    const handleSearch = () => {
        return crypto.filter(
            (crypto) =>
                crypto.name.toLowerCase().includes(search) ||
                crypto.symbol.toLowerCase().includes(search)
        );
    };

    const breakpoints = {
        default: 3,
        1400: 2,
        992: 1
    };
    return (
        <Container>
            {!simplified && (
                <TextField
                    label="Search For a Crypto Currency.."
                    variant="outlined"
                    style={{ margin: "2rem 0", width: "100%" }}
                    onChange={(e) => setSearch(e.target.value)}
                />
            )}
            <Masonry
                breakpointCols={breakpoints}
                className={classes.masonryGrid}
                columnClassName={classes.masonryGridColumn}>
                {
                    handleSearch().map((currency, id) => {
                        return <CryptoCard key={id} currency={currency} />
                    })
                }
            </Masonry>
        </Container >
    )
}

export default CryptoCurrencies