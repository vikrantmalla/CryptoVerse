import React, { useContext } from 'react';
import { App } from '../context/AppContext'
import { makeStyles, MenuItem, Select } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  currencySelect: {
    width: 80, height: 35, backgroundColor: "#fff",
    [theme.breakpoints.up('sm')]: {
      width: 100, height: 40,
    },
  }

}))

const CurrencySelect = () => {
  const { currency, setCurrency } = useContext(App);
  const classes = useStyles();
  return (
    <Select
      variant="outlined"
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={currency}
      className={classes.currencySelect}
      onChange={(e) => setCurrency(e.target.value)}
    >
      <MenuItem value={"INR"}>INR</MenuItem>
      <MenuItem value={"USD"}>USD</MenuItem>
    </Select>
  )
}

export default CurrencySelect
