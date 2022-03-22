import React from 'react'
import moment from 'moment';
import {
  makeStyles,
  Card,
  CardMedia,
  Typography,
} from '@material-ui/core';


const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const useStyles = makeStyles((theme) => {
  return {
    newsCard: {
      marginBottom: "1rem",
      display: "flex",
      padding: "1rem "
    },
    newsImage: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1.5rem",
    },
    providerContainer: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      margin: "2rem 0",
    },
    img: {
      width: "100px"
    }
  }
})


const NewsDetails = ({ news }) => {
  const classes = useStyles()
  return (
    <Card className={classes.newsCard} key={news.i}>
      <a href={news.url} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
        <div className={classes.newsImage}>
          <Typography variant="h4" component="h1" style={{ fontSize: "1.2rem", fontWeight: 600, color: "black" }}>
            {news.name}
          </Typography>
          <CardMedia
            className={classes.img}
            component="img"
            image={news?.image?.thumbnail?.contentUrl || demoImage}
            alt={news.provider[0]?.name}
          />
        </div>
        <Typography variant="body1" style={{ fontSize: "1rem", fontWeight: 500, color: "black" }}>
          {news.description.length > 120 ? `${news.description.substring(0, 120)}...` : news.description}
        </Typography>

        <div className={classes.providerContainer}>
          <Typography variant="body1" style={{ fontSize: ".8rem", color: "black" }}>
            {news.provider[0]?.name}
          </Typography>
          <Typography variant="body1" style={{ fontSize: ".8rem", color: "black" }}>
            {moment(news.datePublished).startOf('ss').fromNow()}
          </Typography>
        </div>
      </a>

    </Card>
  )
}

export default NewsDetails