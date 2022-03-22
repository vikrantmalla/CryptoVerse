import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles((theme) => {
    return {
      selectbutton: {
        border: "1px solid #126bff",
        borderRadius: 5,
        padding: 10,
        fontFamily: "Montserrat",
        cursor: "pointer",
        backgroundColor: selected ? "#e6f7ee" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
        fontSize: ".8rem",
        "&:hover": {
          backgroundColor: "#126bff",
          color: "white",
        },
        width: "23%",
        textAlign: "center",
        [theme.breakpoints.up("md")]: {
          fontSize: "1rem",
        },
      },
    }
  });

  const classes = useStyles();

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;