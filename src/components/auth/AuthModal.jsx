import { useState, useContext } from "react";
import { makeStyles, Modal, Backdrop, Fade, Button, Tab, Tabs, AppBar, Box } from "@material-ui/core";
import Signup from "./Signup";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Alert from "../Alert";
import { App } from "../../context/AppContext";
import GoogleButton from "react-google-button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 2rem",
    [theme.breakpoints.up('md')]: {
      margin: "0",
    },
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    color: "blue",
    borderRadius: 10,
  },
  google: {
    padding: 24,
    paddingTop: 0,
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    gap: 20,
    fontSize: 20,
  },
  loginButton: {
    width: 75,
    height: 35,
    backgroundColor: "#EEBC1D",
    color: "#fff",
    [theme.breakpoints.up('sm')]: {
      width: 85, height: 40,
    },
  }
}));

export default function AuthModal() {
  const classes = useStyles();

  const { alert, setAlert } = useContext(App);

  // modal open
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // forgetpassword model
  const [isForget, setIsForget] = useState(true);

  const toggleTab = () => {
    setIsForget((prevState) => !prevState);
  };


  // checking tab state value 0 or 1
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Google Verrification with popup
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((res) => {
        setAlert({
          open: true,
          message: `Sign Up Successful. Welcome ${res.user.email}`,
          type: "success",
        });

        handleClose();
      })
      .catch((error) => {
        setAlert({
          open: true,
          message: error.message,
          type: "error",
        });
        return;
      });
  };

  return (
    <>
      <Button
        variant="contained"
        className={classes.loginButton}
        onClick={handleOpen}
      >
        Login
      </Button>
      {isForget && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >

          <Fade in={open}>
            <div className={classes.paper}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{ borderRadius: 10, color: "red", }}
                >
                  <Tab label="Login" />
                  <Tab label="Sign Up" />
                </Tabs>
              </AppBar>
              {value === 0 && <Login handleClose={handleClose} toggleTab={toggleTab} />}
              {value === 1 && <Signup handleClose={handleClose} />}
              <Box className={classes.google}>
                <span style={{ color: "black", fontSize: "1rem" }}>OR</span>
                <GoogleButton
                  style={{ width: "100%", outline: "none" }}
                  onClick={signInWithGoogle}
                />
              </Box>
            </div>
          </Fade>
        </Modal>
      )}
      {!isForget && (
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <AppBar
                position="static"
                style={{
                  backgroundColor: "transparent",
                  color: "white",
                }}
              >
                <Tabs
                  value={value}
                  onChange={handleChange}
                  variant="fullWidth"
                  style={{ borderRadius: 10, color: "red", }}
                >
                  <Tab label="Login" />
                </Tabs>
              </AppBar>
              {value === 0 && <ResetPassword handleClose={handleClose} setAlert={setAlert} toggleTab={toggleTab} />}
            </div>
          </Fade>
        </Modal>
      )}
      <Alert alert={alert} setAlert={setAlert} />
    </>
  );

}