import { useState, useContext } from "react";
import { Box, Button, TextField, Typography } from "@material-ui/core";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { App } from '../../context/AppContext'
const Login = ({ handleClose, toggleTab }) => {
  const { setAlert } = useContext(App);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${result.user.email}`,
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
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D", color: "#fff" }}
      >
        Login
      </Button>
      <Typography variant="h6"
        style={{
          fontSize: "1rem", fontWeight: 600,
          display: "flex", justifyContent: "center", cursor: "pointer"
        }}
        onClick={toggleTab}>
        Forget Password
      </Typography>
    </Box>
  );
};

export default Login;