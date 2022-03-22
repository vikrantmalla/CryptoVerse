import { useState, useContext } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { App } from '../../context/AppContext'


const ResetPassword = ({ handleClose, toggleTab }) => {
  const { setAlert } = useContext(App);
  const [email, setEmail] = useState("");

  const handleReset = async () => {
    if (!email) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }
    try {
      await sendPasswordResetEmail(
        auth,
        email
      );
      setAlert({
        open: true,
        message: `Please check your Email`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log("success");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("An error has occured: ", errorCode, errorMessage);
      });
  };
  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        style={{ backgroundColor: "#EEBC1D", color: "#fff" }}
        onClick={handleReset}
      >
        Reset password
      </Button>
      <Typography variant="h6"
        style={{
          fontSize: "1rem", fontWeight: 600,
          display: "flex", justifyContent: "center", cursor: "pointer"
        }}
        onClick={toggleTab}>
        Back to Login
      </Typography>
    </Box>
  );
};

export default ResetPassword;