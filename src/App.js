import React, {useEffect} from 'react';
import './App.css';
import {
    AppBar,
    Container,
    IconButton,
    Toolbar,
    Typography,

} from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

import { Link, LinkOff, GroupWork } from "@material-ui/icons";
// import LinkOn from "@material-ui/icons/Link";

import AuthMenu from "./components/AuthMenu";

import AppMenu from "./components/AppMenu";




import Freezer from "./components/Freezer";



import globalConfig from './config';

import Dispatcher from './dispatcher2'

import AppMenuStore from './stores/AppMenuStore'


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        margingRight: theme.spacing(1)
    },
    title: {
        flexGrow: 1
    },
    mainContent: {
        marginTop: theme.spacing(10)
    },
    mainFeaturesPost: {
        position: "relative",
        color: theme.palette.common.white,
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(4),
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center"
    },
    mainFeaturesPostContent: {
        position: "relative",
        padding: theme.spacing(6),
        marginTop: theme.spacing(8)
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundOverlay: "rgba(0,0,0,.5)"
    },
    mainButtons: {},
    cardGrid: {
        marginTop: theme.spacing(4)
    },
    card: {},
    cardMedia: {
        paddingTop: "56.25%"
    },
    cardContent: {
        flexGrow: 1
    },
    bottomBar: {
        top: 'auto',
        bottom: 0,
    },
}));




const mqtt = new Dispatcher('mqtt', {
    host: globalConfig.mqtt.host,
    options: globalConfig.mqtt.options
});

const appMenuStore = new AppMenuStore()


function App() {
    const classes = useStyles();
    const [auth, setAuth] = React.useState(true);
    const [client, setClient] = React.useState({});

    useEffect(() => {
        mqtt.connect((mqttClient) => {
            console.log("Mqtt connected", mqttClient)
            setClient(mqttClient);
        })
    }, []);


    return (
        <div>
            <AppBar position="fixed">
                <Container fixed>
                    <Toolbar>
                        <AppMenu menu={ appMenuStore } />

                        <Typography variant="h5" align="center" className={classes.title}>Wi-Frost</Typography>

                        <IconButton aria-label="MQTT link" color="inherit">
                            { client.connected && <Link /> }
                            { !client.connected && <LinkOff /> }
                        </IconButton>


                        <AuthMenu auth={auth} onAuthorized={() => setAuth(true)} onLogout={() => setAuth(false)}/>
                    </Toolbar>
                </Container>
            </AppBar>

            <main>
                <div className={classes.mainContent}>
                    <Container maxWidth="md">

                        <Freezer classes={ classes } auth={ auth } mqtt={ mqtt } menu={ appMenuStore } />

                    </Container>
                </div>
            </main>
            <AppBar position="fixed" color="primary" className={classes.bottomBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="open drawer" onClick={console.log('show units')}>
                        <GroupWork /> Units
                    </IconButton>
                    {/*<Fab color="secondary" aria-label="add" className={classes.fabButton}>*/}
                    {/*    <AddIcon />*/}
                    {/*</Fab>*/}
                    {/*<div className={classes.grow} />*/}
                    {/*<IconButton color="inherit">*/}
                    {/*    <SearchIcon />*/}
                    {/*</IconButton>*/}

                </Toolbar>
            </AppBar>
        </div>
    );
}

export default App;
