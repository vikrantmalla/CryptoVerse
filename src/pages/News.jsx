import React, { useState, useEffect } from 'react';
import { makeStyles, Container, Select, MenuItem } from '@material-ui/core';
import NewsDetails from "../components/NewsDetails";
import { coin } from "../components/data";
import { getCryptosNews } from "../services/cryptoNewsApi";
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
    currencyNewsSelect: {
      width: "70%", height: 50, backgroundColor: "#fff",
      marginBottom: "2rem",
      [theme.breakpoints.up('sm')]: {
        width: "60%",
      },
      [theme.breakpoints.up('md')]: {
        width: "40%",
      },
      [theme.breakpoints.up('lg')]: {
        width: "25%",
      },
    }
  }
})

const News = ({ simplified }) => {
  const classes = useStyles()
  const [cryptoNews, setCryptoNews] = useState([]);
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const count = simplified ? 6 : 12;


  useEffect(() => {
    getCryptosNews(newsCategory, count).then((data) => {
      setCryptoNews(data)
    })
  }, [newsCategory, count]);


  if (!cryptoNews?.value) return 'loading..';

  const breakpoints = {
    default: 3,
    1400: 2,
    992: 1
  };

  return (
    <Container>
      {!simplified && (
        <Select
          variant="outlined"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={newsCategory}
          className={classes.currencyNewsSelect}
          onChange={(e) => setNewsCategory(e.target.value)}
        >
          <MenuItem value={newsCategory}>All {newsCategory} News</MenuItem>
          {coin.map((currency, id) =>
            <MenuItem key={id} value={currency.name}>
              {currency.name}
            </MenuItem>)}
        </Select>
      )}
      <Masonry
        breakpointCols={breakpoints}
        className={classes.masonryGrid}
        columnClassName={classes.masonryGridColumn}>
        {
          cryptoNews?.value?.map((news, i) => {
            return (
              <NewsDetails key={i} news={news} />
            )
          })
        }
      </Masonry>
    </Container>
  )
}

export default News