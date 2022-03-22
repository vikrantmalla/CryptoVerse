import { useContext } from 'react'
import { Avatar } from "@material-ui/core";
import { App } from "../../context/AppContext";


const LogInAvatar = () => {

    const { user } = useContext(App)
    return (
        <>
            <Avatar
                style={{
                    height: 38,
                    width: 38,
                    cursor: "pointer",
                    backgroundColor: "#EEBC1D",
                }}
                // for checking profile pic
                src={user.photoURL}
                alt={user.displayName || user.email}
            />
        </>
    )
}

export default LogInAvatar