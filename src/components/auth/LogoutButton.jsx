import React, { useContext } from 'react'
import { Button } from "@material-ui/core";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { App } from "../../context/AppContext";
const LogoutButton = () => {
    const { setAlert } = useContext(App)

    const logOut = () => {
        signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successfull !",
        });
    };
    return (
        <Button
            variant="contained"
            style={{
                width: "200px",
                height: 40,
                backgroundColor: "#EEBC1D",
                color: "#fff"
            }}
            onClick={logOut}
        >
            Logout
        </Button>
    )
}

export default LogoutButton