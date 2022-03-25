import React, { Suspense } from 'react';
import { Routes, Route } from "react-router-dom";
import "./app.css";
import Layout from "./components/Layout";
import Alert from "./components/Alert";
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core';
const HomePage = React.lazy(() => import("./pages/HomePage"));
const CryptoCurrencies = React.lazy(() => import("./pages/CryptoCurrencies"));
const CoinDetails = React.lazy(() => import("./components/coinDetails/CoinDetails"));
const News = React.lazy(() => import("./pages/News"));
const Watchlist = React.lazy(() => import("./pages/Watchlist"));
const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  }
})
const useStyles = makeStyles((theme) => {
  return {
    loading: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "80vh",
      fontSize: "1.2rem",
      fontWeight: "bold"
    }
  }
})
function App() {
  const classes = useStyles()
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Layout>
          <Suspense fallback={<div className={classes.loading}>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
              <Route path="/news" element={<News />} />
              <Route path="/coin/:id" element={<CoinDetails />} />
              <Route path="/watchlist" element={<Watchlist />} />
            </Routes>
          </Suspense>
          <Alert />
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
