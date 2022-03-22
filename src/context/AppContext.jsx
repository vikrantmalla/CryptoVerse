import React, { useState, useEffect } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";
export const App = React.createContext();

const AppContext = (props) => {

  // state for Currency type according to that symbol state change
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");

  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");

  }, [currency]);
  // state for Alert warning
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success",
  });


  // state for check user is login or logout
  const [user, setUser] = useState(null);
  // console.log(user)
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  // state for add coin in watchlist
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    if (user) {
      const coinRef = doc(db, "watchlist", user?.uid);
      // listen to a document 
      var unsubscribe = onSnapshot(coinRef, (coin) => {
        if (coin.exists()) {
          setWatchlist(coin.data().coins);
        } else {
          console.log("No Items in Watchlist");
        }
      });
      // Disable/Detach a listener 
      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  const AppContext = {
    currency, setCurrency, symbol, alert, setAlert, user, watchlist, setWatchlist
  }

  return (
    <>
      <App.Provider value={AppContext}>
        {props.children}
      </App.Provider>
    </>
  )
}

export default AppContext