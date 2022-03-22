import React, { useContext } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import {
    makeStyles,
    useTheme,
    AppBar,
    Toolbar,
    CssBaseline,
    Drawer,
    Hidden,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography
} from '@material-ui/core';
import CurrencySelect from "../components/CurrencySelect";
import AuthModal from "../components/auth/AuthModal";
import LogInAvatar from "./auth/LogInAvatar";
import LogoutButton from "./auth/LogoutButton";
import { App } from "../context/AppContext";
import { NavbarData } from "../components/data";
import { PushpinOutlined, MenuOutlined } from '@ant-design/icons';

const drawerWidth = 240
const useStyles = makeStyles((theme) => {
    return {
        page: {
            background: '#f9f9f9',
            width: '100%',
            padding: theme.spacing(3),
        },
        root: {
            display: 'flex',
        },
        drawer: {

            [theme.breakpoints.up('sm')]: {
                width: drawerWidth,
                flexShrink: 0,
            },
        },
        drawerTitle: {
            padding: "1rem",
            textAlign: "left",
        },
        appBar: {
            [theme.breakpoints.up('sm')]: {
                zIndex: theme.zIndex.drawer + 1,
                marginLeft: drawerWidth,
            },

        },
        menuButton: {
            marginRight: theme.spacing(2),
            [theme.breakpoints.up('sm')]: {
                display: 'none',
            },
        },
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        drawerPaper: {
            backgroundColor: "#fff",
            width: drawerWidth,
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        appbarItem: {
            width: "1400px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",

        },
        appbarItem1: {
            display: "flex",
            alignItems: "center",
        },
        appbarItem2: {
            display: "flex",
            alignItems: "center",
            gap: "1rem"
        },
        appTitle: {
            fontSize: "1.2rem",
            cursor: "pointer",
            [theme.breakpoints.up('sm')]: {
                fontSize: "1.5rem",
            },
        },
        profile: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: ".5rem",
            marginBottom: "1rem"
        },
        listMenu: {
            height: "85vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
        },
        itemText: {
            fontWeight: 600,
            fontSize: "1rem",
        },
        itemIcon: {
            fontSize: "1rem",
        },
        active: {
            borderRight: "0.25rem solid #126bff",
        }

    }
})

export default function Layout({ children }, props) {
    const { window } = props;
    const classes = useStyles();
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();

    const { user } = useContext(App);


    const [mobileOpen, setMobileOpen] = React.useState(false);
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <div>
            <div className={classes.toolbar} />

            <List>
                <div className={classes.listMenu}>
                    <div>
                        {NavbarData.map((item) => (
                            <ListItem
                                button
                                key={item.title}
                                onClick={() => navigate(item.path)}
                                className={location.pathname === item.path ? classes.active : null}
                            >
                                <ListItemIcon className={classes.itemIcon}>{item.icon}</ListItemIcon>
                                <ListItemText className={classes.itemText}>{item.title}</ListItemText>
                            </ListItem>
                        ))}

                        {user ? <ListItem
                            button
                            onClick={() => navigate("/watchlist")}
                            className={location.pathname === "/watchlist" ? classes.active : null}
                        >
                            <ListItemIcon className={classes.itemIcon}><PushpinOutlined /></ListItemIcon>
                            <ListItemText className={classes.itemText}>Watchlist</ListItemText>
                        </ListItem> : ""}
                    </div>
                    <div>
                        <ListItem>{user ? <LogoutButton /> : ""}</ListItem>
                    </div>
                </div>
            </List>

        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <div className={classes.root}>
            <CssBaseline />
            {/* app bar */}
            <AppBar
                position="fixed"
                className={classes.appBar}
                elevation={0}
            >
                <Toolbar>
                    <div className={classes.appbarItem}>
                        <div className={classes.appbarItem1}>
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                className={classes.menuButton}
                                style={{ marginRight: 0 }}
                            >
                                <MenuOutlined />
                            </IconButton>
                            <Typography variant='h5' component='h1' className={classes.appTitle}
                                onClick={() => navigate("/")}>
                                CryptoVerse
                            </Typography>
                        </div>
                        <div className={classes.appbarItem2}>
                            <CurrencySelect />
                            {user ? <LogInAvatar /> : <AuthModal />}
                        </div>
                    </div>
                </Toolbar>
            </AppBar>

            {/* side drawer */}
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp implementation="css">
                    <Drawer
                        container={container}
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>

            {/* main content */}
            <div className={classes.page}>
                <div className={classes.toolbar}></div>
                {children}
            </div>
        </div>
    )
}
Layout.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};