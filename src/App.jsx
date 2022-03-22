import { Routes, Route } from "react-router-dom";
import "./app.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CryptoCurrencies from "./pages/CryptoCurrencies";
import CoinDetails from "./components/coinDetails/CoinDetails";
import News from "./pages/News";
import Watchlist from "./pages/Watchlist";
import Alert from "./components/Alert";
import { ThemeProvider, createTheme } from '@material-ui/core'
const theme = createTheme({
  typography: {
    fontFamily: 'Montserrat',
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/cryptocurrencies" element={<CryptoCurrencies />} />
            <Route path="/news" element={<News />} />
            <Route path="/coin/:id" element={<CoinDetails />} />
            <Route path="/watchlist" element={<Watchlist />} />
          </Routes>
          <Alert />
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
